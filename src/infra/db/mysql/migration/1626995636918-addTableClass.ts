import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey
} from 'typeorm'

export class addTableClass1626995636918 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'classes',
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
                        name: 'url',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'order',
                        type: 'integer',
                        default: '1',
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
            'classes',
            new TableForeignKey({
                columnNames: ['moduleId'],
                referencedTableName: 'modules',
                referencedColumnNames: ['id']
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('classes', 'moduleId')
        await queryRunner.dropTable('classes')
    }
}
