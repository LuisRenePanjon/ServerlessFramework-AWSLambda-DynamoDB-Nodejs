const { v4 } = require('uuid');

const createTask = async (event) => {
    const { title, description } = event.body;
    const id = v4();
    const createdAt = new Date();
};

module.exports = {
    createTask,
};
