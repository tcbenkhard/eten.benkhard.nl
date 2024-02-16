import {wrap_handler} from "./util/base-handler";
import {PicnicService} from "./picnic/picnic-service";

interface LoginRequest {
    username: string
    password: string
}

const service = new PicnicService()
export const handler = wrap_handler(async (event, context) => {
    console.info(`Received request`, event)
    return service.proxy(event.httpMethod, event.path, event.headers as {[key: string]: string | number | boolean}, event.body)
})