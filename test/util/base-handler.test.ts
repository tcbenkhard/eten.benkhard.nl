import {ApiError} from "../../src/util/exception";
import {wrap_handler} from "../../src/util/base-handler";
import {APIGatewayProxyEvent, Context} from "aws-lambda";

describe('Base handler', () => {
    it('Should return the value of the lambda in a gateway response', async () => {
        const mock_lambda = () => 1
        const wrapped_lambda = wrap_handler(mock_lambda)

        await expect(wrapped_lambda({} as any as APIGatewayProxyEvent, {} as Context)).resolves.toStrictEqual({
            "body": "1",
            "headers": {"Access-Control-Allow-Origin": "*"},
            "statusCode": 200
        })
    })

    it('Should return the error if it is an API error', async () => {
        const mock_lambda = () => {throw new ApiError(400, 'Test')}
        const wrapped_lambda = wrap_handler(mock_lambda)

        await expect(wrapped_lambda({} as any as APIGatewayProxyEvent, {} as Context)).resolves.toStrictEqual({
            "body": "{\"statusCode\":400,\"reason\":\"Test\"}",
            "headers": {"Access-Control-Allow-Origin": "*"},
            "statusCode": 400
        })
    })

    it('Should return an unknown error response if its not an Api error', async () => {
        const mock_lambda = () => {throw new Error('Random error')}
        const wrapped_lambda = wrap_handler(mock_lambda)

        await expect(wrapped_lambda({} as any as APIGatewayProxyEvent, {} as Context)).resolves.toStrictEqual({
            "body": "{\"statusCode\":500,\"reason\":\"An unexpected error occurred\"}",
            "headers": {"Access-Control-Allow-Origin": "*"},
            "statusCode": 500
        })
    })
})