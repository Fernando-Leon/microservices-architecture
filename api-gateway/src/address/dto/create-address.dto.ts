import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty()
  personId: string;

  @ApiProperty()
  calle: string;

  @ApiProperty()
  numeroExterior: string;
  
  @ApiProperty()
  numeroInterior: string;

  @ApiProperty()
  localidad: string;

  @ApiProperty()
  municipio: string;

  @ApiProperty()
  estado: string;

  @ApiProperty()
  cp: string;
}
