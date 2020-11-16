'use strict'

const User = use('App/Models/User')

class UserController {
    async store({ auth, request }) {
        const { email, password } = request.all()

        const user = new User()
        user.email = email

        // username is a required field. Comes from the users table
        // migration that is generated when scaffolding an Adonis application
        // Can be removed.
        user.username = email

        // Will be encryped. See User model
        user.password = password

        await user.save()
        await auth.login(user)

        return user
    }

    async login({ auth, request, response }) {
        const { email, password } = request.all()

        try {
            await auth.attempt(email, password)
            return auth.user
        } catch (error) {
            response.status(401).send()
        }
    }

    async show({ auth, response }) {
        try {
            await auth.check()
            return auth.user
        } catch (error) {
            return response.status(404).send()
        }
    }

    async logout({ auth }) {
        await auth.logout()
    }
}

module.exports = UserController