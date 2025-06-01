import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller()
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @MessagePattern('createPerson')
  create(@Payload() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @MessagePattern('findAllPersons')
  findAll() {
    return this.personService.findAll();
  }

  @MessagePattern('findOnePerson')
  findOne(@Payload() id: string) {
    return this.personService.findOne(id);
  }

  @MessagePattern('findPersonByCURP')
  findPersonByCURP(@Payload() curp: string) {
    return this.personService.findPersonByCURP(curp);
  }

  @MessagePattern('updatePerson')
  update(@Payload() updatePersonDto: UpdatePersonDto) {
    console.log('Controller: updatePerson called');
    console.log('Updating person with ID:', updatePersonDto.id);
    console.log('Update data:', updatePersonDto); 
    return this.personService.update(updatePersonDto.id, updatePersonDto);
  }

  @MessagePattern('updatePersonByCURP')
  updatePersonByCURP(@Payload() { curp, personDto }: { curp: string; personDto: UpdatePersonDto }) {
    return this.personService.updatePersonByCURP(curp, personDto);
  }

  @MessagePattern('removePerson')
  remove(@Payload() id: string | number) {
    return this.personService.remove(id.toString());
  }
}
