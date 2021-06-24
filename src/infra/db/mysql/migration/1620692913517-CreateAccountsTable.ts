import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateAccountsTable1620692913517 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'accounts',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'profile',
                        type: 'varchar',
                        isNullable: false,
                        default: "'default.svg'"
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'sexo',
                        type: 'enum',
                        enum: ['M', 'F'],
                        isNullable: false
                    },
                    {
                        name: 'zipcode',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'state',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'district',
                        type: 'varchar',
                        isNullable: true
                    },

                    {
                        name: 'address',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'number',
                        type: 'integer',
                        isNullable: true
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'token',
                        type: 'text',
                        isNullable: true
                    }
                ]
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('accounts')
    }
}
