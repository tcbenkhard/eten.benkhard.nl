import axios, {AxiosResponse} from "axios";
import md5Hex from 'md5-hex';
import {ApiError} from "../util/exception";

export class PicnicService {
    private PICNIC_BASE_URL = "https://storefront-prod.nl.picnicinternational.com/api/15"

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