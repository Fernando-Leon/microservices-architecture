import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {

  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  create(createAddressDto: CreateAddressDto): Promise<Address> {
    const address = this.addressRepository.create(createAddressDto);
    return this.addressRepository.save(address);
  }

  findAll(): Promise<Address[]> {
    return this.addressRepository.find();
  }

  findOne(id: string): Promise<Address | null> {
    return this.addressRepository.findOne({ where: { id } });
  }

  async findByPersonId(personId: string) {
    return this.addressRepository.findOne({ where: { personId } });
  }

  update(id: string, updateAddressDto: UpdateAddressDto) {
    return this.addressRepository.update(id, updateAddressDto);
  }

  updateAddressByPersonId(personId: string, updateAddressDto: UpdateAddressDto) {
    return this.addressRepository.update({ personId }, updateAddressDto);
  }

  async removeByPersonId(personId: string) {
    return this.addressRepository.delete({ personId });
  }
}
