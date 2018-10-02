# State Machine Implemented in AWS Lambda

## Overview
This is an example of a state machine that is implemented on the AWS server-less Lambda functions.  
- The state and it's associated data is persisted to-from AWS S3 storage.
- The state machine is an instance of the object-state-machine asynchronous model - StateMachineAsync 
    - https://github.com/BlueFin605/object-state-machine
- Each Lambda Function represents an event that can occur on the state machine
- There is one function 'event' which takes input from SQS or Kinesis and calls the appropriate event on the state machine
-
This is my first attempt at this project and the approach I took, is to implement each state in it's own class and deploy all classes to each of the Lambda functions.  This is because the function relates to the event rather than the state, so potentially all states need to be available to any event.  So rather than having to try and manage what states relate to which event, I took a simplistic approach and deploy eveything to each Function.

## Dependencies
- Javascript
- object-state-machine
- AWS Account with
    - S3 bucket
    - Access keys to deploy Lambda functions
    - Access keys for S3 bucket

## Deployment
Uses Travis CI to deploy the Lambda functions to AWS, requiring the following evnironment variables are set within the Travis CI project
- AWS_ACCESS_KEY_ID: access key for deployment
- AWS_SECRET_ACCESS_KEY: secret for deployment
- AWS_ROLE: aws role

## To do
- automate the provisioning of the AWS resources
- investigate splitting up each state transition into it's own Lambda Function
