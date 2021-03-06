import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('classes')
export default class Classes {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    slug: string

    @Column({ select: false })
    order: number

    @Column()
    url: string

    @Column({ select: false })
    moduleId: string
}
