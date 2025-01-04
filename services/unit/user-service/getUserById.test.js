const { sequelize, User } = require('../../../models');
const UserService = require('../../user-service');
const UserServiceHelper = require('../../../helpers/services/user-service-helper');

describe('Testing Get user by Id - UserService', () => {

    let user;
    let userData;
    let id;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    beforeEach(async () => {
        id = 1;
        userData = await UserServiceHelper.getValidUserData();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    describe('Success cases', () => {
        it('Should return user by Id', async () => {
            await UserService.createUser(
                userData.name,
                userData.email,
                userData.password_hash,
                userData.password
            );

            user = await UserService.getUserById(id);

            expect(user).toHaveProperty('id', 1);
            expect(user).toHaveProperty('email', userData.email);
            expect(user).toHaveProperty('name', userData.name);
        });

        it('Should return null if not exist user with id', async () => {

            id = 3;

            user = await UserService.getUserById(id);

            expect(user).toBeNull();
        });
    });
    describe('Fail cases', () => {
        it('should throw an error when User.findOne fails', async () => {

            const mockError = UserServiceHelper.getDatabaseError();
            jest.spyOn(User, 'findOne').mockRejectedValue(new Error(mockError));

            await expect(
                UserService.getUserById(
                    id
                )
            ).rejects.toThrow(mockError);
        });
    })
});