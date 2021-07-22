import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey
} from 'typeorm'

export class addTableModule1626031112121 implements MigrationInterface {
    name = 'addTableModule1626031112121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'modules',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid'
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'slug',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'order',
                        type: 'integer',
                        isNullable: false
                    },
                    {
                        name: 'qtmaterials',
                        type: 'integer',
                        default: '0',
                        isNullable: false
                    },
                    {
                        name: 'disciplineId',
                        type: 'varchar',
                        isNullable: false
                    }
                ]
            })
        )
        await queryRunner.createForeignKey(
            'modules',
            new TableForeignKey({
                columnNames: ['disciplineId'],
                referencedTableName: 'disciplines',
                referencedColumnNames: ['id']
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('modules', 'disciplineId')
        await queryRunner.dropTable('disciplines')
    }
}
