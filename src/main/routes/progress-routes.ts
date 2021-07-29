import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddHistoricController } from '../factories/controllers/historic/historic-controller-factory'
import { makeAddProgressController } from '../factories/controllers/progresss/progress-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
    const userAuth = adaptMiddleware(makeAuthMiddleware('user'))

    router.post('/progress', userAuth, adaptRoute(makeAddProgressController()))
    router.post('/historic', userAuth, adaptRoute(makeAddHistoricController()))
}
