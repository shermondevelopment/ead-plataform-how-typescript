import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeRemove,
    ManyToMany,
    JoinTable
} from 'typeorm'
import Discipline from './disciplines'
import aws from 'aws-sdk'

const s3 = new aws.S3()

@Entity('courses')
export default class Course {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    figure: string

    @Column()
    slug: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToMany(() => Discipline)
    @JoinTable({
        name: 'courses_disciplines',
        joinColumn: {
            name: 'course_id'
        }
    })
    courses: Course[]

    @BeforeRemove()
    async removeObject(): Promise<void> {
        await s3
            .deleteObject({
                Bucket: 'brainly-figure-course',
                Key: this.figure
            })
            .promise()
    }
}
