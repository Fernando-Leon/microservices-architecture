import { MigrationInterface, QueryRunner } from "typeorm";

export class Primermigracionaddress1748189620465 implements MigrationInterface {
    name = 'Primermigracionaddress1748189620465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`address\` (\`id\` varchar(36) NOT NULL, \`personId\` varchar(255) NOT NULL, \`calle\` varchar(255) NOT NULL, \`numeroExterior\` varchar(255) NOT NULL, \`numeroInterior\` varchar(255) NOT NULL, \`localidad\` varchar(255) NOT NULL, \`municipio\` varchar(255) NOT NULL, \`estado\` varchar(255) NOT NULL, \`cp\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`address\``);
    }

}
