import {MealsRepository} from "./meals-repository";

export class MealsService {
    private repository: MealsRepository
    constructor(repository: MealsRepository) {
        this.repository = repository
    }

    getMeals = async (): Promise<Array<Meal>> => {
        console.info('Getting all meals from database')
        return await this.repository.getMeals()
    }

    getMeal = async (id: string) => {
        console.info(`Getting meal with id [${id}] from database`)
        return await this.repository.getMeal(id)
    }
}