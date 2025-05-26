import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller()
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @MessagePattern('createAddress')
  create(@Payload() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @MessagePattern('findAllAddress')
  findAll() {
    return this.addressService.findAll();
  }

  @MessagePattern('findAddressByPersonId')
  findByPersonId(@Payload() personId: string) {
    return this.addressService.findByPersonId(personId);
  }

  @MessagePattern('findOneAddress')
  findOne(@Payload() id: number) {
    return this.addressService.findOne(id);
  }

  @MessagePattern('updateAddress')
  update(@Payload() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(updateAddressDto.id, updateAddressDto);
  }

  @MessagePattern('removeAddress')
  remove(@Payload() id: number) {
    return this.addressService.remove(id);
  }

  @MessagePattern('removeAddressByPersonId')
  removeByPersonId(@Payload() personId: string) {
    return this.addressService.removeByPersonId(personId);
  }
}
