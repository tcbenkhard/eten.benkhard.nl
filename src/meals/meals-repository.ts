import {DynamoDB} from 'aws-sdk'
import {DocumentClient} from "aws-sdk/clients/dynamodb";
import {get_variable} from "../util/env";
export class MealsRepository {
    private TABLE_NAME = get_variable('MEALS_TABLE_NAME')
    private db: DocumentClient

    constructor() {
        this.db = new DynamoDB.DocumentClient()
    }

    getMeals = async (): Promise<Array<Meal>> => {
        const allMeals: Array<Meal> = []
        let lastEvaluatedKey = undefined
        do {
            // @ts-ignore
            const result = await this.db.scan(
                {
                    TableName: this.TABLE_NAME,
                    ExclusiveStartKey: lastEvaluatedKey
                }
            ).promise()
            allMeals.push(...result.Items as Meal[])
            lastEvaluatedKey = result.LastEvaluatedKey
        } while(lastEvaluatedKey)
        return allMeals
    }

    getMeal = async (id: string) : Promise<Meal|undefined> => {
        const result = await this.db.get({
            TableName: this.TABLE_NAME,
            Key: {
                id
            }
        }).promise()
        return result.Item as Meal
    }
}