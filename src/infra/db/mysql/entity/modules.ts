import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm'
import Discipline from './disciplines'
import Progress from './progress'

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

    // @OneToMany(() => Progress, (progress) => progress.moduleId)
    // moduleId: Module[]
}
