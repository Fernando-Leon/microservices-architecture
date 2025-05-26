import { MigrationInterface, QueryRunner } from "typeorm";

export class Primermigracionpersion1748189468318 implements MigrationInterface {
    name = 'Primermigracionpersion1748189468318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`person\` (\`id\` varchar(36) NOT NULL, \`nombre\` varchar(255) NOT NULL, \`apellidoPaterno\` varchar(255) NOT NULL, \`apellidoMaterno\` varchar(255) NOT NULL, \`CURP\` varchar(255) NOT NULL, \`sexo\` varchar(255) NOT NULL, \`fechaNacimiento\` datetime NOT NULL, UNIQUE INDEX \`IDX_dc75a954a5f07ccd1a4c28f109\` (\`CURP\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_dc75a954a5f07ccd1a4c28f109\` ON \`person\``);
        await queryRunner.query(`DROP TABLE \`person\``);
    }

}
