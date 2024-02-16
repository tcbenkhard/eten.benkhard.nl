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

    it('should test', async () => {
        const event = {
            resource: '/picnic/{proxy+}',
            path: '/picnic/15/search',
            httpMethod: 'GET',
            headers: {
                'Accept-Encoding': 'br,deflate,gzip,x-gzip',
                'Content-Type': 'application/json',
                Host: '4daaczxlw3.execute-api.eu-west-1.amazonaws.com',
                'User-Agent': 'okhttp/3.12.2',
                'X-Amzn-Trace-Id': 'Root=1-65cf5aa4-76ea4a983e36a1ef68fc9f80',
                'X-Forwarded-For': '83.80.195.24',
                'X-Forwarded-Port': '443',
                'X-Forwarded-Proto': 'https',
                'x-picnic-auth': 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMDktNDEwLTA2NDYiLCJwYzpjbGlkIjozMDEwMCwicGM6cHY6ZW5hYmxlZCI6ZmFsc2UsInBjOmxvZ2ludHMiOjE3MDgwODcxOTY0NTYsInBjOmRpZCI6IkVENTBCNTFEMjJFQjg2RUMiLCJpc3MiOiJwaWNuaWMtZGV2IiwicGM6cHY6dmVyaWZpZWQiOnRydWUsInBjOjJmYSI6Ik5PVF9SRVFVSVJFRCIsImV4cCI6MTcyMzYzOTE5NiwiaWF0IjoxNzA4MDg3MTk2LCJwYzpyb2xlIjoiU1RBTkRBUkRfVVNFUiIsImp0aSI6IktSR0FQRkk2In0.VTJ81hsLrm6Diy8yaDThysg2jQ5vaGv7YKEgmUbyGNjmPGPLi7dSvl4hDAiEBxcvmzIcV9cOBBS-SoRDsweuGfNgACH-3MTM-x1EI4b3H8VZXJqRpjXoJ2US50obBVFcDYwlWwL65dogIxt-P5Jq_AeNv8RIzobCYVKMz54vZHMClcVaGDnocf_un39euRtTfXijHcZeeRitL-4VnNk4ubruzIgo8YXw-2V3lKx8KZoel2zrLSYF8-zYOsTTmj_97w85HPkD73260NCA9lLQVPrz8dyQMprjS_Ns177dF42uG6qwyOapwhO-505sMmY_Q8Eh4yt9DVAQC-QAh49QAQ'
            } as APIGatewayProxyEventHeaders,
            multiValueHeaders: {
                'Accept-Encoding': [ 'br,deflate,gzip,x-gzip' ],
                'Content-Type': [ 'application/json' ],
                Host: [ '4daaczxlw3.execute-api.eu-west-1.amazonaws.com' ],
                'User-Agent': [ 'okhttp/3.12.2' ],
                'X-Amzn-Trace-Id': [ 'Root=1-65cf5aa4-76ea4a983e36a1ef68fc9f80' ],
                'X-Forwarded-For': [ '83.80.195.24' ],
                'X-Forwarded-Port': [ '443' ],
                'X-Forwarded-Proto': [ 'https' ],
                'x-picnic-auth': [
                    'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMDktNDEwLTA2NDYiLCJwYzpjbGlkIjozMDEwMCwicGM6cHY6ZW5hYmxlZCI6ZmFsc2UsInBjOmxvZ2ludHMiOjE3MDgwODcxOTY0NTYsInBjOmRpZCI6IkVENTBCNTFEMjJFQjg2RUMiLCJpc3MiOiJwaWNuaWMtZGV2IiwicGM6cHY6dmVyaWZpZWQiOnRydWUsInBjOjJmYSI6Ik5PVF9SRVFVSVJFRCIsImV4cCI6MTcyMzYzOTE5NiwiaWF0IjoxNzA4MDg3MTk2LCJwYzpyb2xlIjoiU1RBTkRBUkRfVVNFUiIsImp0aSI6IktSR0FQRkk2In0.VTJ81hsLrm6Diy8yaDThysg2jQ5vaGv7YKEgmUbyGNjmPGPLi7dSvl4hDAiEBxcvmzIcV9cOBBS-SoRDsweuGfNgACH-3MTM-x1EI4b3H8VZXJqRpjXoJ2US50obBVFcDYwlWwL65dogIxt-P5Jq_AeNv8RIzobCYVKMz54vZHMClcVaGDnocf_un39euRtTfXijHcZeeRitL-4VnNk4ubruzIgo8YXw-2V3lKx8KZoel2zrLSYF8-zYOsTTmj_97w85HPkD73260NCA9lLQVPrz8dyQMprjS_Ns177dF42uG6qwyOapwhO-505sMmY_Q8Eh4yt9DVAQC-QAh49QAQ'
                ]
            },
            queryStringParameters: { search_term: 'kipfilet' },
            multiValueQueryStringParameters: { search_term: [ 'kipfilet' ] },
            pathParameters: { proxy: '15/search' },
            stageVariables: null,
            body: '{\n' +
                '  "key": "manon_besemer@hotmail.com",\n' +
                '  "secret": "7507878f082f5b42840f23b839e709d6",\n' +
                '  "client_id": 30100\n' +
                '}',
            isBase64Encoded: false
        } as unknown as APIGatewayProxyEvent

        const allowed_headers = ['x-picnic-auth', 'content-type']
        const filtered_headers: {[key: string]: string | number | boolean | undefined} = {}
        for(const headerKey of Object.keys(event.headers)){
            if(allowed_headers.includes(headerKey.toLowerCase())) {
                filtered_headers[headerKey] = event.headers[headerKey]
            }
        }

        const response = await axios.request({
            method: event.httpMethod,
            url: event.path.substring(7),
            data: event.body,
            headers: filtered_headers,

        })
        console.log(response)
    })
})