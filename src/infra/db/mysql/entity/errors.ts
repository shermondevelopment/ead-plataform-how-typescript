import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('errors')
export default class Errors {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    stack: string

    @Column()
    date: Date
}
