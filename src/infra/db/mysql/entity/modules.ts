import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import Discipline from './disciplines'

@Entity('modules')
export default class Module {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    slug: string

    @Column()
    order: number

    @ManyToOne(() => Discipline, (discipline) => discipline.moduleId)
    @JoinColumn({
        name: 'disciplineId'
    })
    disciplineId: string
}
