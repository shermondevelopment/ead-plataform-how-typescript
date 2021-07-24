import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddClasseController } from '../factories/controllers/classe/add/classe-controller-factory'
import { makeUpdateClasseController } from '../factories/controllers/classe/update/classe-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
    const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))

    router.post('/classe', adminAuth, adaptRoute(makeAddClasseController()))
    router.patch(
        '/classe/:classId',
        adminAuth,
        adaptRoute(makeUpdateClasseController())
    )
}
