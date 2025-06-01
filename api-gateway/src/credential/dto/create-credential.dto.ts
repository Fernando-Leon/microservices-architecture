import { ApiProperty } from "@nestjs/swagger";


export class CreateCredentialDto {
  @ApiProperty()
  claveElector: string;

  @ApiProperty()
  vigenciaInicio: number;

  @ApiProperty()
  vigenciaFin: number;

  @ApiProperty()
  seccion: number;

  @ApiProperty()
  anoRegistro: number;
}