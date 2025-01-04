class AuthControllerHelper {

    getValidUser = () => {
        return {
            body: {
                email: 'validemail@email.com',
                password: 'validpassword123!'
            }
        }
    }

    getInvalidBodyWithoutEmail = () => {
        return {
            body: {
                password: 'validpassword123!'
            }
        }
    }
    getInvalidBodyWithoutPassword = () => {
        return {
            body: {
                email: 'validemail@email.com'
            }
        }
    }

    getMockSuccessLogin = () => {
        return {
            user: {
                id: 1,
                name: 'validuser',
                email: 'validemail@email.com',
            },
            token: 'validToken'
        }
    }

    getMockServiceError = () => {
        return 'Database Error'
    }

    getErrorMessageFieldsMissing = () => {
        return {error: 'Missing required fields'}
    }
}

module.exports = new AuthControllerHelper();