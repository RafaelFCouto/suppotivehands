class AuthServiceHelper {

    getValidDatas = () => {
        return {
            email: 'validemail@email.com',
            password: 'validPassword123!'
        }
    }

    getMockUser = () => {
        return {
            id: 1,
            name: 'validuser',
            email: 'validemail@email.com',
        }
    }

    getUserError = () => {
        return 'User not registred';
    }

    getPasswordError = () => {
        return 'Email or password incorrects';
    }

    getUserServiceError = () => {
        return 'Database Error';
    }
}

module.exports = new AuthServiceHelper();