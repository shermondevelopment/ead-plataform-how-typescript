import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey
} from 'typeorm'

export class historicClass1627144338726 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'historic_class',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid'
                    },
                    {
                        name: 'user_id',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'id_class',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'viewed',
                        type: 'boolean',
                        default: 'true',
                        isNullable: false
                    },
                    {
                        name: 'data',
                        type: 'datetime',
                        default: 'NOW()',
                        isNullable: false
                    },
                    {
                        name: 'moduleId',
                        type: 'varchar',
                        isNullable: false
                    }
                ]
            })
        )
        await queryRunner.createForeignKey(
            'historic_class',
            new TableForeignKey({
                columnNames: ['moduleId'],
                referencedTableName: 'modules',
                referencedColumnNames: ['id']
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('historic_class', 'moduleId')
        await queryRunner.dropTable('historic_class')
    }
}
