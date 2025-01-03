const UserService = require('../../../services/user-service');
const UserController = require('../../user-controller');
const UserControllerHelper = require('../../../helpers/controllers/user-controller-helper');
const HttpStatusCode = require('http-status-codes');

const mockResponse = () => {
    const response = {};
    response.status = jest.fn().mockReturnValue(response);
    response.json = jest.fn().mockReturnValue(response);
    return response;
};

describe('Testing  HancleDeleteUser - UserController', () => {

    let request;
    let response;

    beforeEach(async () => {
        request = { body: { } };
        response = mockResponse();
    });

    afterEach(async () => {
        jest.restoreAllMocks();
    });

    describe('Success cases', () => {
        it('Should delete user successfully', async() => {
            const mockDeleteUser = UserControllerHelper.getMessageDeleteUser();
            jest.spyOn(UserService, 'deleteUser').mockResolvedValue(mockDeleteUser);

            request = UserControllerHelper.getValidRequestBodWithId();

            await UserController.handleDeleteUser(request, response)

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.OK);
            expect(response.json).toHaveBeenCalledWith(mockDeleteUser);

        });
    });

    describe('Fails cases', () => {
        let mockError;
        it('Should return BAD_REQUEST if field: id are missing', async () => {
            mockError = UserControllerHelper.getErrorMessageFieldsMissing();

            await UserController.handleDeleteUser(request, response);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
            expect(response.json).toHaveBeenCalledWith(mockError);
        });

        it('should return INTERNAL_SERVER_ERROR if service throws an error', async () => {
            mockError = UserControllerHelper.getMockServiceError();

            jest.spyOn(UserService, 'deleteUser').mockRejectedValue(
                new Error(mockError)
            );

            request = UserControllerHelper.getValidRequestBodWithId();

            await UserController.handleDeleteUser(request, response);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.INTERNAL_SERVER_ERROR);
            expect(response.json).toHaveBeenCalledWith({error: mockError});
        });

    });
});