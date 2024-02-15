import {wrap_handler} from "./util/base-handler";
import {PicnicService} from "./picnic/picnic-service";

interface LoginRequest {
    username: string
    password: string
}

const service = new PicnicService()
export const handler = wrap_handler(async (event, context) => {
    const request_body = JSON.parse(event.body!)
    return service.login(request_body.username, request_body.password)
})