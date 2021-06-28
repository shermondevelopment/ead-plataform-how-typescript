import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn
} from 'typeorm'
import Course from './courses'

@Entity('disciplines')
export default class Discipline {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    slug: string

    @ManyToMany(() => Course)
    @JoinTable({
        name: 'courses_disciplines',
        joinColumn: {
            name: 'discipline_id'
        }
    })
    courses: Course[]
}
