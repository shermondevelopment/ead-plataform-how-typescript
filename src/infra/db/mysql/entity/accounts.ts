import {
    BeforeInsert,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BeforeUpdate
} from 'typeorm'
import aws from 'aws-sdk'

const s3 = new aws.S3()

@Entity('accounts')
export default class Accounts {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    profile: string

    @Column()
    sexo: string

    @Column()
    zipcode?: string

    @Column()
    state?: string

    @Column()
    city?: string

    @Column()
    district?: string

    @Column()
    address?: string

    @Column()
    number?: number

    @Column()
    phone?: string

    @Column()
    token: string

    @Column({ select: false })
    role?: string

    @Column()
    view_free_time: Date

    @Column()
    status?: boolean

    @Column({ select: false })
    token_account: string

    @Column({ select: false })
    tokenResetPassword: string

    @Column()
    tokenResetExpired: Date

    @BeforeInsert()
    addDate(): void {
        const date = new Date()
        date.setDate(date.getHours() + 48)
        this.view_free_time = date
    }
    @BeforeUpdate()
    async removeObject(): Promise<void> {
        if (this.profile !== this.profile) {
            await s3
                .deleteObject({
                    Bucket: 'brainly-figure-course',
                    Key: this.profile
                })
                .promise()
        }
    }
}
