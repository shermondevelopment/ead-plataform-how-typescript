import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('progress')
export default class Progress {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ select: false })
    user_id: string

    @Column()
    totalItems: number

    @Column()
    completedItems: number

    @Column()
    moduleId: string
}
