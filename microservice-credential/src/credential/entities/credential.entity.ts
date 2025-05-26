import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Credential {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  personId: string;

  @Column({ unique: true })
  claveElector: string;

  @Column()
  vigenciaInicio: number;

  @Column()
  vigenciaFin: number;

  @Column()
  seccion: number;

  @Column()
  anoRegistro: number;
}
