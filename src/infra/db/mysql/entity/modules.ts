import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm'
import Discipline from './disciplines'
import HistoricClass from './historicClass'
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

    @Column()
    qtmaterials: number

    @ManyToOne(() => Discipline, (discipline) => discipline.moduleId)
    @JoinColumn({
        name: 'disciplineId'
    })
    disciplineId: string

    @OneToMany(() => Progress, (progress) => progress.moduleId)
    @JoinColumn({
        name: 'moduleId'
    })
    progress: Progress[]

    @OneToMany(() => HistoricClass, (historic) => historic.moduleId)
    @JoinColumn({
        name: 'moduleId'
    })
    historicClass: HistoricClass[]
}
