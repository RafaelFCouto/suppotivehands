const { sequelize, User } = require('../../../models');
const UserService = require('../../user-service');
const UserServiceHelper = require('../../../helpers/services/user-service-helper');

describe('Testing Get user by email - UserService', () => {

    let user;
    let userData;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    beforeEach(async () => {
        userData = await UserServiceHelper.getValidUserData();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    describe('Success cases', () => {

        it('Should return user by Email', async () => {
            await UserService.createUser(
                userData.name,
                userData.email,
                userData.password_hash,
                userData.password
            );

            user = await UserService.getUserByEmail(userData.email);

            expect(user).toHaveProperty('id', 1);
            expect(user).toHaveProperty('email', userData.email);
            expect(user).toHaveProperty('name', userData.name);
        });

        it('Should return null if not exist user with email', async () => {

            const email = 'invalid@email.com';

            user = await UserService.getUserByEmail(email);

            expect(user).toBeNull();
        });
    });
    describe('Fail cases', () => {
        it('should throw an error when User.findOne fails', async () => {

            const mockError = UserServiceHelper.getDatabaseError();
            jest.spyOn(User, 'findOne').mockRejectedValue(new Error(mockError));

            await expect(
                UserService.getUserByEmail(
                    userData.email
                )
            ).rejects.toThrow(mockError);
        });
    })
});