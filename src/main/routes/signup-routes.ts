import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSignUpController } from '../factories/controllers/signup/signup-controller-factory'
import { makeSigninController } from '../factories/controllers/signin/signin-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAddCourseController } from '../factories/controllers/course/course-controller-factory'

export default (router: Router): void => {
    const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
    router.post('/signup', adaptRoute(makeSignUpController()))
    router.post('/signin', adaptRoute(makeSigninController()))
    router.post('/course/add', adminAuth, adaptRoute(makeAddCourseController()))
}
