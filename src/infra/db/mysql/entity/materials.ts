import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('materials')
export default class Materials {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    url: string

    @Column({ select: false })
    order: number

    @Column({ select: false })
    moduleId: string
}
