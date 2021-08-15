import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddColumnStatusAndAccountActive1623604823030
    implements MigrationInterface {
    name = 'AddColumnStatusAndAccountActive1623604823030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'accounts',
            new TableColumn({
                name: 'status',
                type: 'boolean',
                default: false
            })
        )
        await queryRunner.addColumn(
            'accounts',
            new TableColumn({
                name: 'token_account',
                type: 'varchar',
                isNullable: true
            })
        )
        await queryRunner.addColumn(
            'accounts',
            new TableColumn({
                name: 'payment',
                type: 'boolean',
                default: false,
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('accounts', 'status')
        await queryRunner.dropColumn('accounts', 'token_account')
    }
}
