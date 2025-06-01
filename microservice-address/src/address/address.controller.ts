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
  findOne(@Payload() id: string) {
    return this.addressService.findOne(id);
  }

  @MessagePattern('updateAddress')
  update(@Payload() updateAddressDto: UpdateAddressDto) {
    console.log('Controller: updateAddress called');
    console.log('Updating address with ID:', updateAddressDto.id);
    console.log('Update data:', updateAddressDto);
    return this.addressService.update(updateAddressDto.id, updateAddressDto);
  }

  @MessagePattern('updateAddressByPersonId')
  updateAddressByPersonId(@Payload() updateAddressDto: UpdateAddressDto ) {
    if (!updateAddressDto.personId) {
      throw new Error('personId is required to update address by personId');
    }
    console.log('Controller: updateAddressByPersonId called');
    console.log('Updating address for personId:', updateAddressDto.personId);
    console.log('Update data:', updateAddressDto);
    return this.addressService.updateAddressByPersonId(updateAddressDto.personId, updateAddressDto);
  }

  @MessagePattern('removeAddressByPersonId')
  removeByPersonId(@Payload() personId: string) {
    return this.addressService.removeByPersonId(personId);
  }
}
