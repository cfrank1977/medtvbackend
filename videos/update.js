'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
 
    UpdateExpression: 'SET title = :title, author = :author, vid_uri = :vid_uri, vid_thumbnail_uri = :vid_thumbnail_uri, vid_duration = :vid_duration, description = :description, updatedAt = :updatedAt, patient.age = :age, patient.gender = :gender, vid_location.title = :loctitle, vid_location.country = :loccountry, tags = :tags, device = :device',

    ExpressionAttributeValues: {
      ':updatedAt': timestamp,
      ':title': data.title,
      ':author': data.author,
      ':vid_uri': data.vid_uri,
      ':vid_thumbnail_uri': data.vid_thumbnail_uri,
      ':vid_duration': data.vid_duration, //seconds
      ':description': data.description,
      ':age': data.patient.age,
      ':gender': data.patient.gender,
      ':loctitle': data.vid_location.title,
      ':loccountry': data.vid_location.country,
      ':tags': data.tags, // an array of strings ["Heart", "Student", "Training", "VR"]
      ':device': data.device  // medical device descripted as string "Medtronic MRI SureScan"
    },
    
    ReturnValues: 'ALL_NEW',
  };

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/json' },
        body: 'Couldn\'t fetch the video item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
      },
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
