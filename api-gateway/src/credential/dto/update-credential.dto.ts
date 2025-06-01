import { CreateCredentialDto } from "./create-credential.dto";
import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from "@nestjs/swagger";

export class UpdateCredentialDto extends PartialType(CreateCredentialDto) {
  @ApiProperty()
  id: string;
}
