const { DynamoDB } = require('aws-sdk');

const getTask = async (event) => {
    try {
        const dynamodb = new DynamoDB.DocumentClient();

        const { id } = event.pathParameters;

        const result = await dynamodb
            .get({
                TableName: 'Tasks',
                Key: {
                    id,
                },
            })
            .promise();

        return {
            status: 200,
            body: { task: result.Item },
        };
    } catch (error) {
        return {
            status: 500,
            error,
        };
    }
};

module.exports = {
    getTask,
};
