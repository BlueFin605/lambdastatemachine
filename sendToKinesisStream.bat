aws kinesis put-record --stream-name djmstatemachine-stream --data "{ \"action\": \"dial\", \"data\": { \"number\": \"+64123456789\" }}" --partition-key shardId-000000000000 --region us-east-1
aws kinesis put-record --stream-name djmstatemachine-stream --data "{ \"action\": \"connected\", \"data\": { \"number\": \"+64123456789\" }}" --partition-key shardId-000000000000 --region us-east-1
aws kinesis put-record --stream-name djmstatemachine-stream --data "{ \"action\": \"hangup\", \"data\": { \"number\": \"+64123456789\" }}" --partition-key shardId-000000000000 --region us-east-1
