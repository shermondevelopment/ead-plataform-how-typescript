import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('accounts')
export default class Accounts {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    sexo: string
}
