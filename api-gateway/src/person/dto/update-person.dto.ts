import { CreatePersonDto } from "./create-person.dto";
import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from "@nestjs/swagger";

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
  @ApiProperty()
  id: string;
}
