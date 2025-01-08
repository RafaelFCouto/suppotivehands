class UserControllerHelper {

    getMockUserCreate = () => {
        return {
            id: 1,
            name: 'User Created',
            email: 'userCreated@example.com',
        }
    }

    getMockUsers = () => {
        return[
            {
                id: 1,
                name: 'User Created',
                email: 'userCreated@example.com',
            },
            {
                id: 2,
                name: 'User',
                email: 'user@example.com',
            },
            {
                id: 3,
                name: 'User Created',
                email: 'userCreated@example.com',
            },
        ]
    }

    getMockUser = () => {
        return {
            id: 1,
            name: 'User Created',
            email: 'userCreated@example.com',
        }
    }

    getMockUserUpdate = () => {
        return {
            id: 1,
            name: 'User Update',
            email: 'userupdate@example.com',
        }
    }

    getMockServiceError = () => {
        return 'Database Error'
    }

    getValidRequestBody = () => {
        return {
            body: {
                name: 'User Created',
                email: 'userCreated@example.com',
                password: 'securepassword123!'
            }
        }
    }

    getValidRequestBodyUpdate = () => {
        return {
            body: {
                id: 1,
                userData: {
                    name: 'User Updated',
                    email: 'userupdated@example.com',
                    password: {
                        currentPassword: 'securepassword123!',
                        newPassword: 'securepasswordupdate123!'
                    }
                }
            }
        }
    }

    getValidRequestBodWithId = () => {
        return {
            body: {
                id: 1,
            }
        }
    }

    getValidRequestQueryWithId = () => {
        return {
            query: {
                id: 1,
            }
        }
    }

    getValidRequestBodWithEmail = () => {
        return {
            body: {
                email: 'userCreated@example.com'
            }
        }
    }

    getValidRequestQueryWithEmail = () => {
        return {
            query: {
                email: 'userCreated@example.com'
            }
        }
    }

    getInvalidRequestBodWithId = () => {
        return {
            body: {
                id: 100,
            }
        }
    }

    getInvalidRequestQueryWithId = () => {
        return {
            query: {
                id: 100,
            }
        }
    }

    getInvalidRequestBodWithEmail = () => {
        return {
            body: {
                email: 'invaliduserCreated@example.com'
            }
        }
    }

    getInvalidRequestQueryWithEmail = () => {
        return {
            query: {
                email: 'invaliduserCreated@example.com'
            }
        }
    }

    getInvalidRequestBodyWithoutName = () => {
        return {
            body: {
                email: 'userCreated@example.com',
                password: 'securepassword123!'
            }
        }
    }

    getInvalidRequestBodyWithoutEmail = () => {
        return {
            body: {
                name: 'User Created',
                password: 'securepassword123!'
            }
        }
    }

    getInvalidRequestBodyWithoutPassword = () => {
        return {
            body: {
                name: 'User Created',
                email: 'userCreated@example.com',
            }
        }
    }

    getErrorMessageFieldsMissing = () => {
        return {error: 'Missing required fields'}
    }

    getErrorVoidGetAllUsers = () => {
        return {error: 'No registered users'}
    }

    getErrorNotExistUser = () => {
        return {error: 'User not exist'}
    }

    getMessageDeleteUser = () => {
        return {
            message: 'User successfully deleted',
            user: this.getMockUserCreate(),
        }
    }
}

module.exports = new UserControllerHelper();