'use strict';
const { DynamoDB } = require('aws-sdk');

const getTasks = async (event) => {
    try {
        const dynamodb = new DynamoDB.DocumentClient();

        const result = await dynamodb
            .scan({
                TableName: 'Tasks',
            })
            .promise();

        return {
            status: 200,
            body: { tasks: result.Items },
        };
    } catch (error) {
        return {
            statusCode: 505,
            error,
        };
    }
};

module.exports = {
    getTasks,
};
