import {get_variable, MissingEnvironmentVariableError} from "../../src/util/env";

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

//     it('should test', () => {
//
//         const headers: {[key: string]: string|number|boolean} = {
//             'Accept-Encoding': 'br,deflate,gzip,x-gzip',
//                 'CloudFront-Forwarded-Proto': 'https',
//                 'CloudFront-Is-Desktop-Viewer': 'true',
//                 'CloudFront-Is-Mobile-Viewer': 'false',
//                 'CloudFront-Is-SmartTV-Viewer': 'false',
//                 'CloudFront-Is-Tablet-Viewer': 'false',
//                 'CloudFront-Viewer-ASN': '33915',
//                 'CloudFront-Viewer-Country': 'NL',
//                 'Content-Type': 'application/json',
//                 Host: '4daaczxlw3.execute-api.eu-west-1.amazonaws.com',
//                 'User-Agent': 'Apache-HttpClient/4.5.13 (Java/17.0.6)',
//                 Via: '1.1 602c4232f2a46df23c54a6eec1d7e048.cloudfront.net (CloudFront)',
//                 'X-Amz-Cf-Id': '09PWl__idEF2-jabwC93WHOmE9HuphJnN6geaasmDBsNpMQFBgwGSA==',
//                 'X-Amzn-Trace-Id': 'Root=1-65cf5038-559e34f0551a30b5333927e0',
//                 'X-Forwarded-For': '83.80.195.24, 15.158.40.182',
//                 'X-Forwarded-Port': '443',
//                 'X-Forwarded-Proto': 'https'
//         }
//
//         const allowed_headers = ['x-picnic-auth', 'content-type']
//         const filtered_headers: {[key: string]: string | number | boolean} = {}
// 0
//         for(const headerKey of Object.keys(headers)){
//             if(allowed_headers.includes(headerKey.toLowerCase())) {
//                 filtered_headers[headerKey] = headers[headerKey]
//             }
//         }
//     })
})