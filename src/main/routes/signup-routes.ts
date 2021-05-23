import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeSignUpController } from '../factories/signup/signup'
import { makeSigninController } from '../factories/signin/signin-factory'

export default (router: Router): void => {
    router.post('/signup', adaptRoute(makeSignUpController()))
    router.post('/signin', adaptRoute(makeSigninController()))
}