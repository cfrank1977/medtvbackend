'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      createdAt: timestamp,
      updatedAt: timestamp,
      title: data.title,
      author: data.author,
      vid_uri: data.vid_uri,
      vid_thumbnail_uri: data.vid_thumbnail_uri,
      vid_duration: data.vid_duration, //seconds
      description: data.description,
      patient: { age: data.patient.age, gender: data.patient.gender },
      vid_location: { title: data.vid_location.title, country: data.vid_location.country },
      tags: data.tags, // an array of strings ["Heart", "Student", "Training", "VR", "Cardiology"]
      device: data.device  // medical device descripted as string "Medtronic MRI SureScan"
    },
  };

  // write the video to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/json' },
        body: 'Couldn\'t create the video item.',
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
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
