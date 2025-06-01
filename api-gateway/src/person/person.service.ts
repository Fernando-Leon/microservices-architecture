import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { UpdatePersonDto } from "./dto/update-person.dto";

@Injectable()
export class PersonService {
  constructor(
    @Inject("PERSON_SERVICE") private readonly personClient: ClientProxy
  ) { }

  // Obtener todas las personas
  async getAllPersons() {
    return this.personClient
      .send("findAllPersons", {})
      .toPromise();
  }

  // Obtener una persona por Id
  async getPersonById(id: string) {
    return this.personClient
      .send("findOnePerson", id)
      .toPromise();
  }

  // Obtener persona por CURP
  async getPersonByCURP(curp: string) {
    return this.personClient
      .send("findPersonByCURP", curp)
      .toPromise();
  }

  // Actualizar persona por CURP
  async updatePersonByCURP(curp: string, personDto: UpdatePersonDto) {
    return this.personClient
      .send("updatePersonByCURP", { curp, personDto })
      .toPromise();
  }

  // Actualizar persona por Id
  async updatePersonById(id: string, personDto: UpdatePersonDto) {
    return this.personClient
      .send("updatePerson", { ...personDto, id })
      .toPromise();
  }
}