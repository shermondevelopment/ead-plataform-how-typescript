import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddColumnViewFreeTime1623447621695 implements MigrationInterface {
    name = 'AddColumnViewFreeTime1623447621695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'accounts',
            new TableColumn({
                name: 'view_free_time',
                type: 'datetime',
                isNullable: false
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('accounts', 'view_free_time')
    }
}
