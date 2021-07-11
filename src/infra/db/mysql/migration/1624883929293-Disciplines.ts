import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey
} from 'typeorm'

export class Disciplines1624883929293 implements MigrationInterface {
    name = 'Disciplines1624883929293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'disciplines',
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
                        name: 'qt_modules',
                        type: 'integer',
                        isNullable: false
                    },
                    {
                        name: 'courseId',
                        type: 'varchar',
                        isNullable: false
                    }
                ]
            })
        )
        await queryRunner.createForeignKey(
            'disciplines',
            new TableForeignKey({
                columnNames: ['courseId'],
                referencedTableName: 'courses',
                referencedColumnNames: ['id']
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('disciplines', 'courseId')
        await queryRunner.dropTable('disciplines')
    }
}
