import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import Module from './modules'

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
    disciplineId: string

    @ManyToOne(() => Module, (module) => module.progress)
    @JoinColumn({
        name: 'moduleId'
    })
    @Column()
    moduleId: string
}
