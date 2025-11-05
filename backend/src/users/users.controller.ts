import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** Crear usuario */
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  /** Listar usuarios */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /** Obtener un usuario por id */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  /** Actualizar datos del usuario (parcial) */
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  /**
   * Actualizar foto del usuario
   * Campo del formulario: "file"
   * Content-Type: multipart/form-data
   */
    @Patch(':id/photo')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  updatePhoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }), // 2MB
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log('UsersController: updatePhoto - Recibida solicitud para userId:', id);
    console.log('UsersController: updatePhoto - Archivo recibido:', file);
    return this.usersService.updatePhoto(id, file);
  }

  /** Eliminar usuario */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
