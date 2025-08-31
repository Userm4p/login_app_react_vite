import type { ApiResponse } from "./ApiResponse";

export interface UserResponse extends ApiResponse {
  data: User;
}

export interface User {
  basic_info: BasicInfo;
  cursos_impartidos: unknown[];
  educacion: Educacion[];
  esta_verificado: boolean;
  experiencia_laboral: ExperienciaLaboral[];
  habilidades: UserHabilidades[];
  portafolio: Portafolio[];
  tipo_usuario: string;
}

export interface BasicInfo {
  biografia: string;
  documento: string;
  email: string;
  first_name: string;
  foto: string;
  id_usuario: number;
  last_name: string;
  redes_sociales: RedesSociales;
  telefono: string;
  username: string;
}

export interface RedesSociales {
  github: string;
  linkedin: string;
  sitio_web: string;
  twitter: string;
}

export interface Educacion {
  campo_estudio: string;
  completado: boolean;
  fecha_fin: Date;
  fecha_inicio: Date;
  id: number;
  institucion: string;
  titulo: string;
  usuario_id: number;
}

export interface ExperienciaLaboral {
  actualmente: boolean;
  empresa: string;
  fecha_fin: Date | null;
  fecha_inicio: Date;
  funciones: string;
  habilidades: ExperienciaLaboralHabilidade[];
  id: number;
  posicion: string;
}

export interface ExperienciaLaboralHabilidade {
  id: number;
  nombre: string;
}

export interface UserHabilidades {
  empresa_adquisicion: string;
  esta_verificado: boolean;
  habilidad__nombre: string;
  habilidad_id: number;
  id: number;
  tiempo_experiencia: number;
}

export interface Portafolio {
  archivo: string;
  descripcion: string;
  fecha: Date;
  id: number;
  imagen: string;
  tipo: string;
  titulo: string;
  url: null;
  usuario_id: number;
}

export interface UpdateUserFormRequest {
  user: UserUpdateInfo;
  telefono: string;
  biografia: string;
  documento: string;
  linkedin: string;
  twitter: string;
  github: string;
  sitio_web: string;
}

export interface UserUpdateInfo {
  first_name: string;
  last_name: string;
}

export interface UserUpdateResponse extends ApiResponse {
  data: UpdateUserFormRequest;
}
