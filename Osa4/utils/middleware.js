const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unkown endpoint'})
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if(error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'Validationerror') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}