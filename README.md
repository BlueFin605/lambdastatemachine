# State Machine Implemented in AWS Lambda

This is an example of a state machine that is implemented on the AWS server-less Lambda functions.  
- The state and it's associated data is persisted to-from AWS S3 storage.
- The state machine is an instance of the object-state-machine asynchronous model - StateMachineAsync 
- deployment to AWS is automated using travis-ci and requires the following environment variables to be set
    - AWS_ACCESS_KEY_ID: access key for deployment
    - AWS_SECRET_ACCESS_KEY: secret for deployment
    - AWS_LAMBDA_ACCESS_KEY_ID: access key for s3 storage
    - AWS_LAMBDA_SECRET_ACCESS_KEY: secret for s3 storage
    - S3_BUCKET_NAME: s3 bucket name
    - AWS_ROLE: aws role


