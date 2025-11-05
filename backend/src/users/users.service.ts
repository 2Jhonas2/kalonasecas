import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /* =========================
     BÚSQUEDAS
     ========================= */

  /** Búsqueda exacta por email (unique) — usada por AuthService */
  async findByEmail(email: string): Promise<any | null> {
    const e = (email ?? '').trim();
    return this.prisma.users.findUnique({
      where: { email_user: e },
      include: {
        role_user: {
          select: { description: true },
        },
      },
    });
  }

  /** Búsqueda tolerante a mayúsculas/minúsculas (para datos antiguos) */
  async findByEmailNormalized(email: string): Promise<users | null> {
    const e = (email ?? '').trim();
    const el = e.toLowerCase();
    return this.prisma.users.findFirst({
      where: { OR: [{ email_user: el }, { email_user: e }] },
    });
  }

  /* =========================
     CRUD BÁSICO
     ========================= */

  /**
   * Crear usuario.
   * - Si el password NO está hasheado, lo hashea automáticamente.
   * - Email se guarda en minúsculas.
   * - isVerified por defecto en false (a menos que venga explícito).
   * - photo_user por defecto a un placeholder si no viene.
   */
  async create(dto: CreateUserDto): Promise<users> {
    try {
      // Validaciones mínimas
      const number_document = Number(dto.number_document);
      const id_type_document = Number(dto.id_type_document);
      const id_role_user = dto.id_role_user ? Number(dto.id_role_user) : 1;

      if (!dto.name_user?.trim()) {
        throw new BadRequestException('name_user es requerido');
      }
      if (Number.isNaN(number_document)) {
        throw new BadRequestException('number_document inválido');
      }
      if (Number.isNaN(id_type_document)) {
        throw new BadRequestException('id_type_document inválido');
      }
      if (!dto.email_user?.trim()) {
        throw new BadRequestException('email_user es requerido');
      }
      if (!dto.password?.trim()) {
        throw new BadRequestException('password es requerido');
      }

      // Hash condicional (si no parece bcrypt)
      let password = dto.password.trim();
      if (!password.startsWith('$2a$') && !password.startsWith('$2b$')) {
        password = await bcrypt.hash(password, 10);
      }

      const data: any = {
        name_user: dto.name_user.trim(),
        lastname_user: dto.lastname_user?.trim() || undefined,
        number_document,
        id_type_document,
        email_user: dto.email_user.trim().toLowerCase(),
        password,
        id_role_user,
        direction_user: dto.direction_user?.trim() || undefined,
        isVerified: dto.isVerified ?? false,
        photo_user:
          dto['photo_user'] ||
          'https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png',
      };

      if (dto.date_birth && String(dto.date_birth).trim() !== '') {
        data.date_birth = new Date(dto.date_birth as any);
      }

      return await this.prisma.users.create({ data });
    } catch (err: any) {
      console.error('❌ Error in users.create:', err);

      if (err.code === 'P2002') {
        const field = err.meta?.target?.[0] || 'field';
        throw new BadRequestException(`A user with that ${field} already exists.`);
      }
      
      if (err.code === 'P2003') {
        throw new BadRequestException(`The selected document type is invalid.`);
      }

      // For any other error, re-throw it.
      throw err;
    }
  }

  /** Listado simple (incluye nombre del rol) */
  async findAll(): Promise<users[]> {
    try {
      return await this.prisma.users.findMany({
        take: 100,
        include: {
          role_user: {
            select: { description: true },
          },
        },
      });
    } catch (err) {
      console.error('❌ users.findAll error:', err);
      throw err;
    }
  }

  /** Obtener usuario por id (incluye nombre del rol) */
  async findOne(id_user: number): Promise<users | null> {
    return this.prisma.users.findUnique({
      where: { id_user },
      include: {
        role_user: { select: { description: true } },
      },
    });
  }

  /** Actualizar datos (normaliza email, convierte numéricos y maneja fecha) */
  async update(id: number, dto: UpdateUserDto): Promise<users> {
    const data: any = { ...dto };

    if (typeof data.email_user === 'string') {
      data.email_user = data.email_user.trim().toLowerCase();
    }
    if (typeof data.number_document === 'string') {
      data.number_document = Number(data.number_document);
    }
    if (typeof data.id_type_document === 'string') {
      data.id_type_document = Number(data.id_type_document);
    }
    if (typeof data.id_role_user === 'string') {
      data.id_role_user = Number(data.id_role_user);
    }

    if ('date_birth' in dto) {
      if (!dto.date_birth || String(dto.date_birth).trim() === '') {
        delete data.date_birth; // evita enviar null si el schema no lo permite
      } else {
        data.date_birth = new Date(dto.date_birth as any);
      }
    }

    return this.prisma.users.update({
      where: { id_user: id },
      data,
    });
  }

  async remove(id: number): Promise<users> {
    return this.prisma.users.delete({ where: { id_user: id } });
  }

  /** Actualizar foto (endpoint multipart/form-data) */
  async updatePhoto(id_user: number, file: Express.Multer.File): Promise<users> {
    console.log('UsersService: updatePhoto - Intentando actualizar foto para userId:', id_user);
    console.log('UsersService: updatePhoto - Objeto de archivo recibido:', file);
    const photo_user = `/uploads/${file.filename}`;
    console.log('UsersService: updatePhoto - Ruta de la foto construida:', photo_user);
    try {
      const updatedUser = await this.prisma.users.update({
        where: { id_user },
        data: { photo_user },
      });
      console.log('UsersService: updatePhoto - Foto actualizada con éxito para userId:', id_user);
      return updatedUser;
    } catch (error: any) {
      console.error('UsersService: updatePhoto - Error al actualizar foto para userId:', id_user, 'Error:', error);
      throw error; // Re-lanzar el error para que sea manejado por el llamador
    }
  }

  /* =========================
     VERIFICACIÓN / RESET PASS
     ========================= */

    async updateVerificationStatus(userId: number, status: boolean): Promise<users> {
    console.log('UsersService: updateVerificationStatus - Intentando actualizar isVerified para userId:', userId, 'a estado:', status);
    try {
      const updatedUser = await this.prisma.users.update({
        where: { id_user: userId },
        data: { isVerified: status },
      });
      console.log('UsersService: updateVerificationStatus - Usuario actualizado:', updatedUser.id_user, 'isVerified:', updatedUser.isVerified);
      return updatedUser;
    } catch (error: any) {
      console.error('UsersService: updateVerificationStatus - Error al actualizar isVerified para userId:', userId, 'Error:', error);
      throw error; // Re-lanzar el error para que sea manejado por el llamador
    }
  }

  /** Guarda HASH (sha256) del token y expiración */
  async updatePasswordResetToken(
    userId: number,
    tokenHash: string,
    expires: Date,
  ): Promise<users> {
    return this.prisma.users.update({
      where: { id_user: userId },
      data: {
        passwordResetToken: tokenHash,
        passwordResetExpires: expires,
      },
    });
  }

  /** Busca por HASH y que no esté vencido */
  async findByPasswordResetToken(tokenHash: string): Promise<users | null> {
    return this.prisma.users.findFirst({
      where: {
        passwordResetToken: tokenHash,
        passwordResetExpires: { gt: new Date() },
      },
    });
  }

  async updatePassword(userId: number, newHashedPassword: string): Promise<users> {
    // si llega sin hash por error, lo hasheamos
    const password = newHashedPassword.startsWith('$2a$') || newHashedPassword.startsWith('$2b$')
      ? newHashedPassword
      : await bcrypt.hash(newHashedPassword, 10);

    return this.prisma.users.update({
      where: { id_user: userId },
      data: { password },
    });
  }

  async clearPasswordResetToken(userId: number): Promise<users> {
    return this.prisma.users.update({
      where: { id_user: userId },
      data: {
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });
  }

  async updateLastLogoutAt(userId: number, date: Date): Promise<users> {
    return this.prisma.users.update({
      where: { id_user: userId },
      data: { lastLogoutAt: date },
    });
  }
}
