import {MealsService} from "./meals/meals-service";
import {MealsRepository} from "./meals/meals-repository";
import {wrap_handler} from "./util/base-handler";
const repository = new MealsRepository()
const service = new MealsService(repository)

const handler = wrap_handler(async () => {
    return await service.getMeals()
})