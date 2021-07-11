import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
