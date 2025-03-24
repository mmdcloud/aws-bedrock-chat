# Lambda Function
resource "aws_lambda_function" "function" {
  function_name = var.function_name
  role          = var.role_arn
  handler       = var.handler
  runtime       = var.runtime
  s3_bucket     = var.s3_bucket
  s3_key        = var.s3_key
  environment {
    variables = var.env_variables
  }
}
