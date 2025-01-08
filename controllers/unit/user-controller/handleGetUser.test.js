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

describe('Testing  HandleGetUser- UserController', () => {

    let request;
    let response;
    let mockUser;

    beforeEach(async () => {
        request = { query: { } };
        response = mockResponse();
    });

    afterEach(async () => {
        jest.restoreAllMocks();
    });

    describe('Success cases', () => {
        mockUser = UserControllerHelper.getMockUser();

        it('Should return user by Id', async () => {

            request = UserControllerHelper.getValidRequestQueryWithId();

            jest.spyOn(UserService, 'getUserById').mockResolvedValue(mockUser);

            await UserController.handleGetUser(request, response);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.OK);
            expect(response.json).toHaveBeenCalledWith(mockUser);
        });
        it('Should return user by email', async () => {

            request = UserControllerHelper.getValidRequestQueryWithEmail();

            jest.spyOn(UserService, 'getUserByEmail').mockResolvedValue(mockUser);

            await UserController.handleGetUser(request, response);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.OK);
            expect(response.json).toHaveBeenCalledWith(mockUser);
        });
    });

    describe('Fails cases', () => {

        let mockError;

        it('Should return BAD_REQUEST if not exist user with Id', async () => {

            mockError = UserControllerHelper.getErrorNotExistUser();
            jest.spyOn(UserService, 'getUserById').mockResolvedValue(null);

            request = UserControllerHelper.getInvalidRequestQueryWithId();


            await UserController.handleGetUser(request, response);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
            expect(response.json).toHaveBeenCalledWith(mockError);
        });

        it('Should return BAD_REQUEST if not exist user with Email', async () => {
            mockError = UserControllerHelper.getErrorNotExistUser();
            jest.spyOn(UserService, 'getUserByEmail').mockResolvedValue(null);

            request = UserControllerHelper.getInvalidRequestQueryWithEmail();


            await UserController.handleGetUser(request, response);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
            expect(response.json).toHaveBeenCalledWith(mockError);
        });

        it('Should return BAD_REQUEST if fields id and email are missing', async () => {
            mockError = UserControllerHelper.getErrorMessageFieldsMissing();

            await UserController.handleGetUser(request, response);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
            expect(response.json).toHaveBeenCalledWith(mockError);
        });

        it('Should return INTERNAL_SERVER_ERROR if service throws an error in method getUserById', async () => {
            mockError = UserControllerHelper.getMockServiceError();
            jest.spyOn(UserService, 'getUserById').mockRejectedValue(
                new Error(mockError)
            );

            request = UserControllerHelper.getValidRequestQueryWithId();

            await UserController.handleGetUser(request, response);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.INTERNAL_SERVER_ERROR);
            expect(response.json).toHaveBeenCalledWith({ error: mockError });
        });
        it('Should return INTERNAL_SERVER_ERROR if service throws an error in method getUserByEmail', async () => {
            mockError = UserControllerHelper.getMockServiceError();

            jest.spyOn(UserService, 'getUserByEmail').mockRejectedValue(
                new Error(mockError)
            );

            request = UserControllerHelper.getValidRequestQueryWithEmail();

            await UserController.handleGetUser(request, response);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.INTERNAL_SERVER_ERROR);
            expect(response.json).toHaveBeenCalledWith({ error: mockError });
        });
    });
});