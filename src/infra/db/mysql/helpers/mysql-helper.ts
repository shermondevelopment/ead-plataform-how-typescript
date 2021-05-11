import { Connection, createConnection } from 'typeorm'

export const MysqlHelper = {
    client: null as Connection,

    async connect(): Promise<void> {
        const connection: Connection = await createConnection()
        this.client = connection
    },
    async disconnect(): Promise<void> {
        await this.client.close()
    },
    isConnected(): boolean {
        return this.client.isConnected
    },
    getRepository(repository: any): any {
        const accounts = this.client.getRepository(repository)
        return accounts
    }
}
