import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey
} from 'typeorm'

export class AddTableProgress1626549870594 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'progress',
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
                        name: 'totalItems',
                        type: 'integer',
                        isNullable: false
                    },
                    {
                        name: 'completedItems',
                        type: 'integer',
                        isNullable: false
                    },
                    {
                        name: 'disciplineId',
                        type: 'varchar',
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
            'progress',
            new TableForeignKey({
                columnNames: ['moduleId'],
                referencedTableName: 'modules',
                referencedColumnNames: ['id']
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('progress', 'moduleId')
        await queryRunner.dropTable('progress')
    }
}
