<!--
title: MedTV REST API in NodeJS
description: A RESTful Web Service allowing you to create, list, get, update and delete Videos. DynamoDB is used to store the data. 
layout: Doc
-->
# Med TV REST API

## www.medtv.me

The idea is to make it easier for surgeons to learn and improve their skills. Surgeons can learn and practice their craft within a Virtual Reality (VR) environment.
The goal of this capstone is to create a web-based experience  for users to see a list of videos. A user can select then play a video.

## Getting Started

* Clone this repo
```
git clone git@github.com:cfrank1977/medtvbackend.git
```

### Prerequisites

Serverless, AWS CLI, Node js

## Setup

```bash
npm install
```

## Deploy

In order to deploy the endpoint simply run

```bash
sls deploy
```

The expected result should be similar to:

```bash
 "host": "n1mr20dqxh.execute-api.us-east-2.amazonaws.com",
  "basePath": "/qa",

Service Information
service: serverless-rest-api-with-dynamodb
stage: qa
region: us-east-1
api keys:
  None
endpoints:
  POST - https://n1mr20dqxh.execute-api.us-east-2.amazonaws.com/qa/Videos
  GET - https://n1mr20dqxh.execute-api.us-east-2.amazonaws.com/qa/Videos
  GET - https://n1mr20dqxh.execute-api.us-east-2.amazonaws.com/qa/Videos/{id}
  PUT - https://n1mr20dqxh.execute-api.us-east-2.amazonaws.com/qa/Videos/{id}
  DELETE - https://n1mr20dqxh.execute-api.us-east-2.amazonaws.com/qa/Videos/{id}
functions:
  serverless-rest-api-with-dynamodb-dev-update: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-update
  serverless-rest-api-with-dynamodb-dev-get: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-get
  serverless-rest-api-with-dynamodb-dev-list: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-list
  serverless-rest-api-with-dynamodb-dev-create: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-create
  serverless-rest-api-with-dynamodb-dev-delete: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-delete
```

## Usage

You can create, retrieve, update, or delete Videos with the following commands:

### Create a video

```bash
serverless invoke local --function create --path mocks/post.json
curl -X POST https://n1mr20dqxh.execute-api.us-east-2.amazonaws.com/qa/Videos --data '{
    "body": "{\"title\":\"Surgi-Sim v3\",\"author\":\"Dr. John Smith\",\"uri\":\"https://youtu.be/Zd39HhAUFl0\",\"video_duration\":\"145\",\"video_description\":\"VARISES is helping create better-trained surgeons and surgical staff to meet the rapidly growing demand for procedures such as joint replacement surgeries.\"}"
}'
```

Example Result:
```bash
{
    "statusCode": 200,
    "body": "{\"id\":\"d4610490-9b5a-11e8-8a58-ad1a07d0567b\",\"createdAt\":1533767504729,\"updatedAt\":1533767504729,\"title\":\"Surgi-Sim v3\",\"author\":\"Dr. John Smith\",\"uri\":\"https://youtu.be/Zd39HhAUFl0\",\"video_duration\":\"145\",\"video_description\":\"VARISES is helping create better-trained surgeons and surgical staff to meet the rapidly growing demand for procedures such as joint replacement surgeries.\"}"
}
```

### List all Videos

```bash
serverless invoke local --function list --path mocks/get-all.json
curl https://n1mr20dqxh.execute-api.us-east-2.amazonaws.com/qa/Videos
```

Example output:
```bash
{
    "statusCode": 200,
    "body": "[{\"updatedAt\":1533767084626,\"createdAt\":1533767084626,\"uri\":\"https://youtu.be/Zd39HhAUFl0\",\"id\":\"d9fa8a30-9b59-11e8-9295-a70b67ebe25c\",\"video_duration\":\"145\",\"video_description\":\"VARISES is helping create better-trained surgeons and surgical staff to meet the rapidly growing demand for procedures such as joint replacement surgeries.\",\"author\":\"Dr. John Smith\",\"title\":\"Surgi-Sim v3\"},{\"updatedAt\":1533767272781,\"createdAt\":1533767272781,\"uri\":\"https://youtu.be/Zd39HhAUFl0\",\"id\":\"4a20b6e0-9b5a-11e8-9e53-b31a3b009369\",\"video_duration\":\"145\",\"video_description\":\"VARISES is helping create better-trained surgeons and surgical staff to meet the rapidly growing demand for procedures such as joint replacement surgeries.\",\"author\":\"Dr. John Smith\",\"title\":\"Surgi-Sim v3\"}]"
}
```

### Get one video

```bash
serverless invoke local --function get --path mocks/get.json
# Replace the <id> part with a real id from your Videos table
curl https://n1mr20dqxh.execute-api.us-east-2.amazonaws.com/qa/Videos/<id>
```

Example Result:
```bash
{
    "statusCode": 200,
    "body": "{\"updatedAt\":1533767084626,\"createdAt\":1533767084626,\"uri\":\"https://youtu.be/Zd39HhAUFl0\",\"id\":\"d9fa8a30-9b59-11e8-9295-a70b67ebe25c\",\"video_duration\":\"145\",\"video_description\":\"VARISES is helping create better-trained surgeons and surgical staff to meet the rapidly growing demand for procedures such as joint replacement surgeries.\",\"author\":\"Dr. John Smith\",\"title\":\"Surgi-Sim v3\"}"
}
```

### Update a video

```bash
serverless invoke local --function update --path mocks/put.json
# Replace the <id> part with a real id from your Videos table
curl -X PUT https://n1mr20dqxh.execute-api.us-east-2.amazonaws.com/qa/Videos/<id> --data '{"pathParameters": { "id": "d9fa8a30-9b59-11e8-9295-a70b67ebe25c"}, "body": "{\"title\":\"Surgi-Sim v3\",\"author\":\"Dr. Chris Frank\",\"uri\":\"https://youtu.be/Zd39HhAUFl0\",\"video_duration\":\"145\",\"video_description\":\"VARISES is helping create better-trained surgeons and surgical staff to meet the rapidly growing demand for procedures such as joint replacement surgeries.\"}"}'
```

Example Result:
```bash
{
    "statusCode": 200,
    "body": "{\"updatedAt\":1533768577041,\"createdAt\":1533767084626,\"uri\":\"https://youtu.be/Zd39HhAUFl0\",\"id\":\"d9fa8a30-9b59-11e8-9295-a70b67ebe25c\",\"video_duration\":\"145\",\"video_description\":\"VARISES is helping create better-trained surgeons and surgical staff to meet the rapidly growing demand for procedures such as joint replacement surgeries.\",\"author\":\"Dr. Chris Frank\",\"title\":\"Surgi-Sim v3\"}"
}
```

### Delete a video

```bash
# Replace the <id> part with a real id from your Videos table
serverless invoke local --function delete --path mocks/delete.json
curl -X DELETE https://n1mr20dqxh.execute-api.us-east-2.amazonaws.com/qa/Videos/<id>
```


Example Result:
```bash
{
    "statusCode": 200,
    "body": "{}"
}
```
### Use the MedTV_Postman.json file
How to get Postman working with this file:
1. Open postman
2. Click on import
3. Choose file MedTV_Postman.json
4. Open qa-medtvapi
5. Open videos
6. Open the second GET

## Authors

* **Chris Frank** - *Initial work* - [CFRANK1977](https://github.com/cfrank1977)
* **Florance Fong** - [FLOFONG](https://github.com/flofong)
* **Julia Kantarovsky** - [JULIAKAN](https://github.com/JuliaKan)
* **Dylan Morsini** - [DJMORSINI](https://github.com/djmorosini)
* **Matt Layden** - [KOBELLO](https://github.com/kobello)

See also the list of [contributors](https://github.com/djmorosini/medtv-react-app/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Burlington Code Academy http://bootcamp.burlingtoncodeacademy.com
* VCET http://vermonttechnologies.com