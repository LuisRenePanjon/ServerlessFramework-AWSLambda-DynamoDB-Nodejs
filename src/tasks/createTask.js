const { v4 } = require('uuid');
const { DynamoDB } = require('aws-sdk');
const middy = require('@middy/core');
const jsonBodyParser = require('@middy/http-json-body-parser');

const createTask = async (event) => {
    try {
        const dynamodb = new DynamoDB.DocumentClient();
        const { title, description } = event.body;

        const id = v4();
        const createdAt = new Date().toJSON();

        const newTask = {
            id,
            title,
            description,
            createdAt,
            isDone: false,
        };

        await dynamodb
            .put({
                TableName: 'Tasks',
                Item: newTask,
            })
            .promise();

        return {
            statusCode: 200,
            body: newTask,
        };
    } catch (error) {
        return {
            statusCode: 504,
            body: error.toString(),
        };
    }
};

module.exports = {
    createTask: middy(createTask).use(jsonBodyParser()),
};
