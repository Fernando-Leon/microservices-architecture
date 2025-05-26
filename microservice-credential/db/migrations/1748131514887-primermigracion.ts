import { MigrationInterface, QueryRunner } from "typeorm";

export class Primermigracion1748131514887 implements MigrationInterface {
    name = 'Primermigracion1748131514887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`credential\` (\`id\` varchar(36) NOT NULL, \`personId\` varchar(255) NOT NULL, \`claveElector\` varchar(255) NOT NULL, \`vigenciaInicio\` int NOT NULL, \`vigenciaFin\` int NOT NULL, \`seccion\` int NOT NULL, \`anoRegistro\` int NOT NULL, UNIQUE INDEX \`IDX_fd27f2c1f2a50d347f23cbed13\` (\`claveElector\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_fd27f2c1f2a50d347f23cbed13\` ON \`credential\``);
        await queryRunner.query(`DROP TABLE \`credential\``);
    }

}
