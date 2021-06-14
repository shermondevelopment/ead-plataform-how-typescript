import hbs from 'nodemailer-express-handlebars'
import path from 'path'
import mailer from '../config/mail'

mailer.use(
    'compile',
    hbs({
        viewEngine: {
            partialsDir: path.resolve('.src/main/resources/mail/auth/'),
            layoutsDir: path.resolve('./src/main/resources/mail/auth/'),
            defaultLayout: ''
        },
        viewPath: path.resolve('./src/main/resources/mail/auth/'),
        extName: '.html'
    })
)

export default mailer
