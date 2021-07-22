import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
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

    @Column()
    qtmaterials: number

    @ManyToOne(() => Discipline, (discipline) => discipline.moduleId)
    @JoinColumn({
        name: 'disciplineId'
    })
    disciplineId: string
}
