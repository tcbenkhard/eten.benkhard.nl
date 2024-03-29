import * as cdk from 'aws-cdk-lib';
import {aws_apigateway as api, aws_dynamodb} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import {AttributeType} from "aws-cdk-lib/aws-dynamodb";
import {EndpointType, LambdaIntegration} from "aws-cdk-lib/aws-apigateway";

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

    const loginHandler = new NodejsFunction(this, 'LoginHandler', {
      handler: 'handler',
      entry: 'src/login-handler.ts',
      functionName: `${this.serviceName}-login`,
      environment,
      memorySize: 512
    })

    const proxyHandler = new NodejsFunction(this, 'ProxyHandler', {
      handler: 'handler',
      entry: 'src/picnic-proxy-handler.ts',
      functionName: `${this.serviceName}-picnic-proxy`,
      environment,
      memorySize: 512
    })

    const gateway = new api.RestApi(this, `MealsApi`, {
      restApiName: this.serviceName,
      defaultCorsPreflightOptions: {
        allowOrigins: ['*']
      },
      endpointTypes: [
          EndpointType.REGIONAL
      ]
    });

    const gatewayMeals = gateway.root.addResource('meals');
    gatewayMeals.addMethod('GET', new LambdaIntegration(getMealsHandler));

    const gatewayLogin = gateway.root.addResource('picnic')
    gatewayLogin.addProxy({
      anyMethod: true,
      defaultIntegration: new LambdaIntegration(proxyHandler)
    })
  }
}
