const { sequelize, User } = require('../../../models');
const UserService = require('../../user-service');
const UserServiceHelper = require('../../../helpers/services/user-service-helper');
const userServiceHelper = require('../../../helpers/services/user-service-helper');

describe('Testing Update User - UserService', () => {

    let user;
    let userUpdate;
    let userData;
    let userDataUpdate;
    let id;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    beforeEach(async () => {
        id = 1;
        userData = await UserServiceHelper.getValidUserData();
        userDataUpdate = userServiceHelper.getValidUpdateUserData();
    });

    afterAll(async () => {
        await sequelize.close();
    });


    describe('Success cases', () => {
        it('Should update a user successfully', async () => {

            user = await UserService.createUser(
                userData.name,
                userData.email,
                userData.password,
                userData.password_hash,
            );


            userUpdate = await UserService.updateUser(id, userDataUpdate);

            expect(userUpdate).toHaveProperty('email', userDataUpdate.email);
            expect(userUpdate).toHaveProperty('name', userDataUpdate.name);
        });
        it('Should update password of user successfully', async () => {

            const updateUserPwd = UserServiceHelper.getupdateUserDataWithPwd();

            user = await UserService.createUser(
                userData.name,
                userData.email,
                userData.password,
                userData.password_hash,
            );

            userUpdate = await UserService.updateUser(id, updateUserPwd);

            expect(userUpdate).toHaveProperty('email', userDataUpdate.email);
            expect(userUpdate).toHaveProperty('name', userDataUpdate.name);
        });
    });
    describe('Fail cases', () => {
        it('should throw an error if password not match', async () => {

            userData.email = 'validemail@example.com';
            const updateUserPwd = UserServiceHelper.getupdateUserDataWithPwd();

            user = await UserService.createUser(
                userData.name,
                userData.email,
                userData.password,
                userData.password_hash,
            );

            updateUserPwd.password.currentPassword = 'invalidPassword';

            const expectError = `Old password does not match!`;
            await expect(
                UserService.updateUser(
                    id, updateUserPwd
                )
            ).rejects.toThrow(expectError);
        });

        it('should throw an error if id not exist', async () => {
            id = 5;

            const expectError = `User wiht id: ${id} not exist`;
            await expect(
                UserService.updateUser(
                    id, userDataUpdate
                )
            ).rejects.toThrow(expectError);
        });
        it('should throw an error when User.update fails', async () => {

            userData.email = 'validemail@email.com';

            user = await UserService.createUser(
                userData.name,
                userData.email,
                userData.password,
                userData.password_hash,
            );

            const mockError = UserServiceHelper.getDatabaseError();
            jest.spyOn(User, 'update').mockRejectedValue(new Error(mockError));

            await expect(
                UserService.updateUser(
                    id, userDataUpdate
                )
            ).rejects.toThrow(mockError);
        });
    })
});