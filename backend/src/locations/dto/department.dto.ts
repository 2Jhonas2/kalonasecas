export class DepartmentDto {
  id_department: number;
  name: string;
  code: string | null; // Corrected to allow null
}