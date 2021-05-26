import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddColumnRoleAccounts1621993222040 implements MigrationInterface {
    name = 'AddColumnRoleAccounts1621993222040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'accounts',
            new TableColumn({
                name: 'role',
                type: 'varchar',
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('accounts', 'role')
    }
}
