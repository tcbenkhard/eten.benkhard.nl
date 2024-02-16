import axios, {Axios, AxiosResponse} from "axios";
import md5Hex from 'md5-hex';
import {ApiError} from "../util/exception";
import {APIGatewayProxyResult} from "aws-lambda";

export class PicnicService {
    private PICNIC_BASE_URL = "https://storefront-prod.nl.picnicinternational.com/api"
    private client: Axios;

    constructor() {
        this.client = new Axios({
            baseURL: this.PICNIC_BASE_URL,
        })
        this.client.interceptors.request.use(request => {
            console.log('Starting Request', JSON.stringify(request, null, 2))
            return request
        })

        this.client.interceptors.response.use(response => {
            console.log('Response:', JSON.stringify(response.data, null, 2))
            return response
        })
    }

    public proxy = async (method: string, path: string, headers: {[key: string]: string | number | boolean}, body: string | null): Promise<APIGatewayProxyResult> => {
        const allowed_headers = ['x-picnic-auth', 'content-type']
        const filtered_headers: {[key: string]: string | number | boolean} = {}
        console.info(`Checking headers [${Object.keys(headers).join(', ')}]`)
        for(const headerKey in Object.keys(headers)){
            if(allowed_headers.includes(headerKey.toLowerCase())) {
                filtered_headers[headerKey] = headers[headerKey]
            }
        }

        const response =  await this.client.request({
            method,
            url: path.substring(7),
            data: body,
            headers: filtered_headers
        })
        console.info(`Received response: `, response)
        return {
            statusCode: response.status,
            body: response.data,
            //@ts-ignore
            headers: response.headers
        }
    }

    private checkForErrors = (response: AxiosResponse) => {
        if (response.status >= 400) {
            console.error(`Failed to login: ${response.status}: ${response.data}`)
            throw new ApiError(response.status, response.data)
        }
    }

    login = async (username: string, password: string) => {
        const response = await axios.post(`${this.PICNIC_BASE_URL}/user/login`, {
            key: username,
            secret: md5Hex(password),
            client_id: 30100
        })

        this.checkForErrors(response)

        return {
            token: response.headers["x-picnic-auth"]
        }
    }
}