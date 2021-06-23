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
import { makeUpdateController } from '../factories/controllers/course/update/course-controller-factory'
import { makeEnableAccountController } from '../factories/controllers/enable-account/enable-account-controller-factory'
import { makeForgotPassword } from '../factories/controllers/forgot-password/forgot-password-factory'
import { makeResetPassword } from '../factories/controllers/reset-password/reset-password-factory'
import { makeUpdateProfile } from '../factories/controllers/update-profile/reset-password-factory'

export default (router: Router): void => {
    const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
    const userAuth = adaptMiddleware(makeAuthMiddleware('user'))
    router.post('/signup', adaptRoute(makeSignUpController()))
    router.post('/signin', adaptRoute(makeSigninController()))
    router.post(
        '/course/add',
        adminAuth,
        multer(configBucket).single('figure'),
        adaptRouteMulter(makeAddCourseController())
    )
    router.get('/enable-account', adaptRoute(makeEnableAccountController()))
    router.post('/forgot-password', adaptRoute(makeForgotPassword()))
    router.post('/reset', adaptRoute(makeResetPassword()))
    router.post(
        '/profile',
        userAuth,
        multer(configBucket).single('figure'),
        adaptRouteMulter(makeUpdateProfile())
    )
    router.get('/course', userAuth, adaptRoute(makeLoadCourseController()))
    router.delete(
        '/course/delete/:id',
        adminAuth,
        adaptRoute(makeDeleteCourseController())
    )
    router.patch(
        '/course/update/:id',
        adminAuth,
        adaptRoute(makeUpdateController())
    )
}
