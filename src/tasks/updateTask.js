const { DynamoDB } = require('aws-sdk');

const updateTask = async (event) => {
    try {
        const dynamodb = new DynamoDB.DocumentClient();
        const { id } = event.pathParameters;
        const { isDone } = JSON.parse(event.body);

        await dynamodb
            .update({
                TableName: 'Tasks',
                Key: { id },
                UpdateExpression: 'set isDone = :isDone',
                ExpressionAttributeValues: {
                    ':isDone': isDone,
                },
                ReturnValues: 'ALL_NEW',
            })
            .promise();

        return {
            status: 200,
            body: {
                message: 'Tasks updated',
            },
        };
    } catch (error) {
        return { error };
    }
};

module.exports = { updateTask };
