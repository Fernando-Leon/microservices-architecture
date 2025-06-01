import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity'; 

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const person = this.personRepository.create({
      ...createPersonDto,
      fechaNacimiento: new Date(createPersonDto.fechaNacimiento),
    })
    return this.personRepository.save(person);
  }

  async findPersonByCURP(curp: string): Promise<Person | null> {
    return this.personRepository.findOne({
      where: { CURP: curp },
    })
  }

  findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  findOne(id: string): Promise<Person | null> {
    return this.personRepository.findOne({
      where: { id },
    });
  }

  update(id: string, updatePersonDto: UpdatePersonDto) {
    console.log('Service: updatePerson called');
    console.log('Updating person with ID:', id);
    console.log('Update data:', updatePersonDto);
    return this.personRepository.update(id, updatePersonDto);
  }

  async remove(id: string) {
    return this.personRepository.delete(id);
  }

  async updatePersonByCURP(curp: string, personDto: UpdatePersonDto): Promise<Person | null> {
    const person = await this.findPersonByCURP(curp);
    if (!person) {
      return null;
    }
    Object.assign(person, personDto);
    return this.personRepository.save(person);
  }
}
