import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class LogError1621123175910 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'errors',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid'
                    },
                    {
                        name: 'stack',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'date',
                        type: 'datetime'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('errors')
    }
}
