import 'reflect-metadata'
import { MysqlHelper } from '../infra/db/mysql/helpers/mysql-helper'
import dotenv from 'dotenv'

dotenv.config()

MysqlHelper.connect()
    .then(async () => {
        const app = (await import('./config/app')).default
        app.listen(process.env.PORT, () =>
            console.log(`app running in port ${process.env.PORT}`)
        )
    })
    .catch(console.error)
