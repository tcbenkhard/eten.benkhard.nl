import {get_variable, MissingEnvironmentVariableError} from "../../src/util/env";
import {PicnicService} from "../../src/picnic/picnic-service";
import {APIGatewayProxyEvent, APIGatewayProxyEventHeaders} from "aws-lambda";
import axios from "axios";

describe('Get environment function', () => {
    it('Should return a value if it is defined', () => {
        process.env['test_value'] = 'retrieved_value'
        const result = get_variable('test_value')
        expect(result).toBe('retrieved_value')
    })

    it('Should revert to default if value is not defined', () => {
        const result = get_variable('undefined_variable', "expected_default_value")
        expect(result).toBe("expected_default_value")
    })

    it('Should throw if both default and variable are not defined', () => {
        expect(() => get_variable('undefined_variable')).toThrow(MissingEnvironmentVariableError)
    })
})