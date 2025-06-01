import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { UpdateAddressDto } from "./dto/update-address.dto";

@Injectable()
export class AddressService {
  constructor(
    @Inject("ADDRESS_SERVICE") private readonly addressClient: ClientProxy
  ) {}

  // Obtiene todas las direcciones
  async getAllAdress() {
    return this.addressClient
      .send("findAllAddress", {})
      .toPromise();
  }

  // Obtener direccion por id de direccion
  async getAddressById(id: string) {
    return this.addressClient
      .send("findOneAddress", id)
      .toPromise();
  }

  // Actializar direccion por id de direccion
  async updateAddress(id: string, address: UpdateAddressDto) {
    return this.addressClient
      .send("updateAddress", { ...address, id })
      .toPromise();
  }
}