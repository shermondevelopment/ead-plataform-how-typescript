import { Router } from 'express'
import multer from 'multer'
import configBucket from '../config/bucket-aws'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeAddMaterialsController } from '../factories/controllers/materials/materials-controller-factory'
import { adaptRouteMulter } from '../adapters/express-route-adapter-how-multer'

export default (router: Router): void => {
    const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))

    router.post(
        '/materials',
        adminAuth,
        multer(configBucket).single('figure'),
        adaptRouteMulter(makeAddMaterialsController())
    )
}
