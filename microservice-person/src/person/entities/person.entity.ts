import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  apellidoPaterno: string;

  @Column()
  apellidoMaterno: string;

  @Column({ unique: true })
  CURP: string;

  @Column()
  sexo: string;

  @Column()
  fechaNacimiento: Date;
}