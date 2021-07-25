import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import Module from './modules'

@Entity('historic_class')
export default class HistoricClass {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ select: false })
    user_id: string

    @Column()
    id_class: string

    @Column()
    viewed: boolean

    @ManyToOne(() => Module, (module) => module.progress)
    @JoinColumn({
        name: 'moduleId'
    })
    @Column()
    moduleId: string
}
