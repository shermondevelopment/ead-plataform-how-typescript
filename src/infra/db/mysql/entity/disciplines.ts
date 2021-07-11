import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Module from './modules'

@Entity('disciplines')
export default class Discipline {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    slug: string

    @Column()
    qt_modules: number

    @Column()
    courseId: string

    @OneToMany(() => Module, (module) => module.disciplineId)
    moduleId: Module[]
}
