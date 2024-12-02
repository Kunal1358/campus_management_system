
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');


const id1 = uuidv1()
const id2 = uuidv4()


var generatedId = id1.slice(0, 6) + '_' + id2.slice(0, 4)


module.exports = generatedId