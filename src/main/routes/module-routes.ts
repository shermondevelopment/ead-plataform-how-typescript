import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddModuleController } from '../factories/controllers/module/add/module-controller-factory'
import { makeLoadModuleController } from '../factories/controllers/module/load/discipline-controller-factory'
import { makeUpdateModuleController } from '../factories/controllers/module/update/update-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
    const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
    const userAuth = adaptMiddleware(makeAuthMiddleware('user'))

    router.post('/module', adminAuth, adaptRoute(makeAddModuleController()))
    router.get('/module', userAuth, adaptRoute(makeLoadModuleController()))
    router.patch(
        '/module/:id',
        adminAuth,
        adaptRoute(makeUpdateModuleController())
    )
}
