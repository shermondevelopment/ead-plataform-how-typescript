import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeRemove
} from 'typeorm'
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
