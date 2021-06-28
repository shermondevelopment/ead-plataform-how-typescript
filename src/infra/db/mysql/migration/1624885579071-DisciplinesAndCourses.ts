import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey
} from 'typeorm'

export class DisciplinesAndCourses1624885579071 implements MigrationInterface {
    name = 'DisciplinesAndCourses1624885579071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'courses_disciplines',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid'
                    },
                    {
                        name: 'course_id',
                        type: 'varchar',
                        generationStrategy: 'uuid'
                    },
                    {
                        name: 'discipline_id',
                        type: 'varchar',
                        generationStrategy: 'uuid'
                    }
                ]
            })
        )
        await queryRunner.createForeignKey(
            'courses_disciplines',
            new TableForeignKey({
                columnNames: ['course_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'courses',
                name: 'course_disc'
            })
        )
        await queryRunner.createForeignKey(
            'courses_disciplines',
            new TableForeignKey({
                columnNames: ['discipline_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'disciplines',
                name: 'disc_course'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('courses_discplines', 'course_disc')
        await queryRunner.dropForeignKey('courses_discplines', 'disc_course')
        await queryRunner.dropTable('courses_disciplines')
    }
}
