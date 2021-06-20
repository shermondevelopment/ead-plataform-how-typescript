import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddColumnTokenAndTokenExpired1624195374411
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'accounts',
            new TableColumn({
                name: 'tokenResetPassword',
                type: 'varchar',
                isNullable: true
            })
        )
        await queryRunner.addColumn(
            'accounts',
            new TableColumn({
                name: 'tokenResetExpired',
                type: 'date',
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('accounts', 'tokenResetPassword')
        await queryRunner.dropColumn('accounts', 'tokenResetExpired')
    }
}
