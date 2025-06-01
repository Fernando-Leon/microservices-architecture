import { Controller, Get, Param, Patch, Body } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { PersonService } from "./person.service";
import { UpdatePersonDto } from "./dto/update-person.dto";


@ApiTags("Person")
@Controller("person")
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  async getAllPersons() {
    return await this.personService.getAllPersons();
  }

  @Get(":id")
  @ApiParam({ name: "id", type: String, description: "Obtener persona por ID" })
  async getPersonById(@Param('id') id: string) {
    return await this.personService.getPersonById(id);
  }

  @Get("curp/:curp")
  @ApiParam({ name: "curp", type: String, description: "Obtener persona por CURP" })
  async getPersonByCURP(@Param('curp') curp: string) {
    return await this.personService.getPersonByCURP(curp);
  }

  @Patch("curp/:curp")
  @ApiParam({ name: "curp", type: String, description: "Actualizar persona por CURP" })
  async updatePersonByCURP(
    @Param('curp') curp: string,
    @Body() personDto: UpdatePersonDto
  ) {
    return await this.personService.updatePersonByCURP(curp, personDto);
  }

  @Patch(":id")
  @ApiParam({ name: "id", type: String, description: "Actualizar persona por ID" })
  async updatePersonById(
    @Param('id') id: string,
    @Body() personDto: UpdatePersonDto
  ) {
    return await this.personService.updatePersonById(id, personDto);
  }
}