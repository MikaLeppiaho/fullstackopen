require('dotenv').config()
const express =     require('express')
const cors =        require('cors')
const app =         express()
const bodyParser =  require('body-parser')
const Person =      require('./models/person')
var morgan =        require('morgan')

app.use(express.static('build'))

app.use(bodyParser.json())


morgan.token('body', function (req, res) {return JSON.stringify(req.body)})
app.use(morgan(' :method :url :status :res[content-length] :response-time ms :body'))

app.use(cors())


app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })
    .catch(error => next(error))
})

app.get('/info', (req,res, next) => {
    Person.count({})
        .then(persons => {
            console.log(persons)
            res.send(`<p>Phonebook has info for ${persons} people</p>
            ${Date()}
            `)
        }
       
    )
    
    .catch(error => next(error))
    
})

app.get('/api/persons/:id', ( req,res, next ) => {
    Person.findById(req.params.id)
        .then(person => {
            if ( person ){
                res.json(person.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req,res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(res => {
            res.status(204).end()
        })
    .catch(error => next(error))
})



const generateId = () => {
    const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
    return maxId + 1
}

app.post('/api/persons', (req,res, next) =>{

    const body = req.body

    const person = new Person({
        name: body.name,
        number: body.number,
    })
    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    
    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(req.params.id, person, { new: true})
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

const errorHandler = (error, req, res, next ) => {
    console.error(error.message)

    if ( error.name == 'CastError' && error.kind == 'ObjectID') {
        return res.status(400).send({ error: 'malformatted id'})
    } else if ( error.name === 'ValidationError' ) {
        return res.status(400).json({ error: error.message})
    }
    
    next(error)
}

app.use(errorHandler)

const port = process.env.PORT
app.listen(port)
console.log(`Server runnin on port ${port}`)