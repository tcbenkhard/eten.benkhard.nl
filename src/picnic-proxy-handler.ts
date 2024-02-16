import {wrap_handler} from "./util/base-handler";
import {PicnicService} from "./picnic/picnic-service";
import {APIGatewayProxyEvent, Context} from "aws-lambda";

interface LoginRequest {
    username: string
    password: string
}

const service = new PicnicService()
export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
    return service.proxy(event)
}