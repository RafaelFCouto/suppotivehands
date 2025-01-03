const bcryptjs = require('bcryptjs');

class UserServiceHelper{
    getValidUserData = async() => {
        return {
            name: 'User Created',
            email: 'userCreated@example.com',
            password: 'securepassword123!',
            password_hash: await bcryptjs.hash('securepassword123', 8)
        }
    }
    getValidUsersDatas = async() => {
        return [
            {
                name: 'User Valid',
                email: 'uservalid@example.com',
                password: 'securepassword123!',
                password_hash: await bcryptjs.hash('securepassword123!', 8)
            },
            {
                name: 'User',
                email: 'user@example.com',
                password: 'securepassword123!@',
                password_hash: await bcryptjs.hash('securepassword123!@', 8)
            },
            {
                name: 'Valid User ',
                email: 'validuser@example.com',
                password: 'securepassword123!@#',
                password_hash: await bcryptjs.hash('securepassword123!@#', 8)
            },
        ]
    }

    getValidUpdateUserData = () => {
        return {
            name: 'User Updated',
            email: 'userupdated@example.com',
        }
    }

    getupdateUserDataWithPwd = () => {
        return {
            name: 'User Updated',
            email: 'userupdated@example.com',
            password: {
                currentPassword: 'securepassword123!',
                newPassword: 'securepasswordupdate123!'
            }
        }
    }

    getDatabaseError = () => {
        return 'Database Error'
    }
}

module.exports = new UserServiceHelper();