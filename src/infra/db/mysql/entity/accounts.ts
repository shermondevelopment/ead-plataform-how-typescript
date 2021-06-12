import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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

    @Column()
    token: string

    @Column({ select: false })
    role?: string

    @Column()
    view_free_time: Date

    @BeforeInsert()
    addDate(): void {
        const date = new Date()
        date.setDate(date.getHours() + 48)
        this.view_free_time = date
    }
}
