import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey
} from 'typeorm'

export class addTableMaterials1627169357525 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'materials',
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
                        name: 'url',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'order',
                        type: 'integer',
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
            'materials',
            new TableForeignKey({
                columnNames: ['moduleId'],
                referencedTableName: 'modules',
                referencedColumnNames: ['id']
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('materials', 'moduleId')
        await queryRunner.dropTable('materials')
    }
}
