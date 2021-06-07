import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSignUpController } from '../factories/controllers/signup/signup-controller-factory'
import { makeSigninController } from '../factories/controllers/signin/signin-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAddCourseController } from '../factories/controllers/course/add/course-controller-factory'
import multer from 'multer'
import configBucket from '../config/bucket-aws'
import { adaptRouteMulter } from '../adapters/express-route-adapter-how-multer'
import { makeLoadCourseController } from '../factories/controllers/course/load/course-controller-factory'
import { makeDeleteCourseController } from '../factories/controllers/course/delete/course-controller-factory'

export default (router: Router): void => {
    const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
    const userAuth = adaptMiddleware(makeAuthMiddleware('user'))
    router.post('/signup', adaptRoute(makeSignUpController()))
    router.post('/signin', adaptRoute(makeSigninController()))
    router.post(
        '/course/add',
        multer(configBucket).single('figure'),
        adminAuth,
        adaptRouteMulter(makeAddCourseController())
    )
    router.get('/course', userAuth, adaptRoute(makeLoadCourseController()))
    router.delete(
        '/course/delete/:id',
        adminAuth,
        adaptRoute(makeDeleteCourseController())
    )
}
