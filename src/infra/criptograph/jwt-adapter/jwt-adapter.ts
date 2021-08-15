import jwt from 'jsonwebtoken'
import { Decrypter } from '../../../data/protocols/criptography/decrypter'
import {
    Encrypter,
    EncrypterParams
} from '../../../data/protocols/criptography/encrypter'

export class JwtAdapter implements Encrypter, Decrypter {
    constructor(private readonly secret: string) {}

    async encrypt(value: EncrypterParams): Promise<string> {
        const accessToken = await jwt.sign(
            {
                id: value.id,
                name: value.name,
                email: value.email,
                profile: value.profile,
                status: value.status,
                payment: value.payment,
                admin: value.admin,
                sexo: value.sexo,
                zipcode: value.zipcode,
                state: value.state,
                city: value.city,
                district: value.district,
                address: value.address,
                number: value.number,
                phone: value.phone,
                view_free_time: value.view_free_time
            },
            this.secret
        )
        return accessToken
    }
    async decrypt(token: string): Promise<string> {
        const value: any = await jwt.verify(token, this.secret)
        return value
    }
}
