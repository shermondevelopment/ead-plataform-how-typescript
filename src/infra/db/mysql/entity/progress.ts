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

    @Column()
    user_id: string

    @Column()
    totalItems: number

    @Column()
    completedItems: number

    // @ManyToOne(() => Module, (modules) => modules.moduleId)
    // @JoinColumn({
    //     name: 'moduleId'
    // })
    @Column()
    moduleId: string
}
