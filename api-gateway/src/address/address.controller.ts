import { Controller, Get, Param, Patch, Body } from "@nestjs/common";
import { AddressService } from "./address.service";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { UpdateAddressDto } from "./dto/update-address.dto";

@ApiTags("Address")
@Controller("address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async getAllAddresses() {
    return await this.addressService.getAllAdress();
  }

  @Get(":id")
  @ApiParam({ name: "id", type: String, description: "Obetener por id de direccion" })
  async getAddressById(@Param('id') id: string) {
    return await this.addressService.getAddressById(id);
  }

  @Patch(":id")
  @ApiParam({ name: "id", type: String, description: "Actualizar direccion por id de direccion" })
  async updateAddress(@Param('id') id: string, @Body() address: UpdateAddressDto) {
    return await this.addressService.updateAddress(id, address);
  }
}