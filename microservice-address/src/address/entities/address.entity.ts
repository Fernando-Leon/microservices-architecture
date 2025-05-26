import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  personId: string;

  @Column()
  calle: string;

  @Column()
  numeroExterior: string;

  @Column()
  numeroInterior: string;

  @Column()
  localidad: string;

  @Column()
  municipio: string;

  @Column()
  estado: string;

  @Column()
  cp: string;
}
