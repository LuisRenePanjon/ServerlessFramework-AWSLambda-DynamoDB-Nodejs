const { DynamoDB } = require('aws-sdk');

const deleteTask = async (event) => {
    try {
        const dynamodb = new DynamoDB.DocumentClient();

        const { id } = event.pathParameters;

        await dynamodb
            .delete({
                TableName: 'Tasks',
                Key: { id },
            })
            .promise();

        return {
            status: 200,
            message: 'Task deleted successfully',
        };
    } catch (error) {
        return { error };
    }
};

module.exports = { deleteTask };
