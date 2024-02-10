import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import {aws_dynamodb, aws_apigateway as api} from "aws-cdk-lib";
import {AttributeType} from "aws-cdk-lib/aws-dynamodb";
import {LambdaIntegration} from "aws-cdk-lib/aws-apigateway";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class EtenBenkhardNlStack extends cdk.Stack {
  private serviceName = 'eten-benkhard-nl'
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const mealsTable = new aws_dynamodb.Table(this, `MealsTable`, {
      tableName: `${this.serviceName}-meals`,
      partitionKey: {
        type: AttributeType.STRING,
        name: 'id'
      }
    })

    const environment = {
      MEALS_TABLE_NAME: mealsTable.tableName
    }

    const getMealsHandler = new NodejsFunction(this, 'GetMealsHandler', {
      handler: 'handler',
      entry: 'src/get-meals-handler.ts',
      functionName: `${this.serviceName}-get-meals`,
      environment,
      memorySize: 512
    })
    mealsTable.grantReadData(getMealsHandler)

    const gateway = new api.RestApi(this, `MealsApi`, {
      restApiName: this.serviceName,
      defaultCorsPreflightOptions: {
        allowOrigins: ['*']
      }
    });

    const gatewayMeals = gateway.root.addResource('meals');
    gatewayMeals.addMethod('GET', new LambdaIntegration(getMealsHandler));
  }
}
