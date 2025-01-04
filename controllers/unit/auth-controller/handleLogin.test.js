const AuthController = require('../../auth-controller');
const AuthService = require('../../../services/auth-service');
const AuthControllerHelper = require('../../../helpers/controllers/auth-controller-helper');
const HttpStatusCode = require('http-status-codes');

const mockResponse = () => {
    const response = {};
    response.status = jest.fn().mockReturnValue(response);
    response.json = jest.fn().mockReturnValue(response);
    return response;
};

describe('Testing  HandleLogin - AuthController', () => {

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
        it('Should authenticate the user', async() => {
            request = AuthControllerHelper.getValidUser();
            const mockSuccessLogin = AuthControllerHelper.getMockSuccessLogin();
            jest.spyOn(AuthService, 'authenticateUser').mockResolvedValue(mockSuccessLogin);

            await AuthController.handleLogin(request, response);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.OK);
            expect(response.json).toHaveBeenCalledWith(mockSuccessLogin);
        });
    });

     describe('Fails cases', () => {
         let mockError;
         let invalidRequestBody;
         errorMessageMissingFields = AuthControllerHelper.getErrorMessageFieldsMissing();

            it('should return INTERNAL_SERVER_ERROR if service throws an error', async () => {
                mockError = AuthControllerHelper.getMockServiceError();
                request = AuthControllerHelper.getValidUser();

                jest.spyOn(AuthService, 'authenticateUser').mockRejectedValue(
                    new Error(mockError)
                );

                await AuthController.handleLogin(request, response);

                expect(response.status).toHaveBeenCalledWith(HttpStatusCode.INTERNAL_SERVER_ERROR);
                expect(response.json).toHaveBeenCalledWith({error: mockError});
            });

            it('should return BAD_REQUEST if field: Email are missing', async () => {
                invalidRequestBody = AuthControllerHelper.getInvalidBodyWithoutEmail();

                await AuthController.handleLogin(invalidRequestBody, response);

                expect(response.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
                expect(response.json).toHaveBeenCalledWith(errorMessageMissingFields);

            });

            it('should return BAD_REQUEST if field: Password are missing', async () => {
                invalidRequestBody = AuthControllerHelper.getInvalidBodyWithoutPassword();

                await AuthController.handleLogin(invalidRequestBody, response);

                expect(response.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
                expect(response.json).toHaveBeenCalledWith(errorMessageMissingFields);
            });
        });

});

