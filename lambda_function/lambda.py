import json
import boto3
from botocore.exceptions import ClientError

bedrock_runtime = boto3.client('bedrock-runtime')

def lambda_handler(event, context):
    try:
        model_id = os.environ['BEDROCK_MODEL_ID']

        # Validate the input
        input_text = event.get("queryStringParameters", {}).get("inputText")
        if not input_text:
            raise ValueError("Input text is required in the request query parameters.")

        # Prepare the payload for invoking the Bedrock model
        payload = json.dumps({
            "inputText": input_text,
            "textGenerationConfig": {
                "maxTokenCount": 8192,
                "stopSequences": [],
                "temperature": 0,
                "topP": 1
            }
        })

        # Invoke the Bedrock model
        response = bedrock_runtime.invoke_model(
            modelId=model_id,
            contentType="application/json",
            accept="application/json",
            body=payload
        )

        # Check if the 'body' exists in the response and handle it correctly
        if 'body' not in response or not response['body']:
            raise ValueError("Response body is empty.")

        response_body = json.loads(response['body'].read().decode('utf-8'))

        return {
            'statusCode': 200,
            'body': json.dumps(response_body)
        }

    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps({"error": "Error interacting with the Bedrock API"})
        }
    except ValueError as e:
        return {
            'statusCode': 400,
            'body': json.dumps({"error": str(e)})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({"error": "Internal Server Error"})
        }