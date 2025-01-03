const UserService = require('../../../services/user-service');
const UserController = require('../../user-controller');
const UserControllerHelper = require('../../../helpers/controllers/user-controller-helper');
const HttpStatusCode = require('http-status-codes');
const { User } = require('../../../models');

const mockResponse = () => {
    const response = {};
    response.status = jest.fn().mockReturnValue(response);
    response.json = jest.fn().mockReturnValue(response);
    return response;
};

describe('Testing  HandleUpdateUser - UserController', () => {
    let request;
    let response;

    beforeEach(async () => {
        request = { body: { } };
        response = mockResponse();
    });

    describe('Success cases', () => {
        it('should update user successfully', async () => {
            const mockUpdateUser = UserControllerHelper.getMockUserUpdate();
            jest.spyOn(UserService, 'updateUser').mockResolvedValue(mockUpdateUser);
            request = UserControllerHelper.getValidRequestBodyUpdate();

            await UserController.handleUpdateUser(request, response);


            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.OK);
            expect(response.json).toHaveBeenCalledWith(mockUpdateUser);
        });
    });

    describe('Fails cases', () => {
        let mockError;
        it('Should return BAD_REQUEST if field: id are missing', async () => {
            mockError = UserControllerHelper.getErrorMessageFieldsMissing();

            await UserController.handleUpdateUser(request, response);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
            expect(response.json).toHaveBeenCalledWith(mockError);
        });

        it('should return INTERNAL_SERVER_ERROR if service throws an error', async () => {
            mockError = UserControllerHelper.getMockServiceError();

            jest.spyOn(UserService, 'updateUser').mockRejectedValue(
                new Error(mockError)
            );

            request = UserControllerHelper.getValidRequestBodWithId();

            await UserController.handleUpdateUser(request, response);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.INTERNAL_SERVER_ERROR);
            expect(response.json).toHaveBeenCalledWith({error: mockError});
        });

    });
});