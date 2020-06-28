const mongoose = require('mongoose')

if ( process.argv.length < 3 ) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0-t4ghf.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser:true, useUnifiedTopology:true})


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    number: number,
    
})

//numeroiden hakeminen
if (process.argv.length == 3 ){
    console.log('Phonebook:')
    Person.find({}).then(res => {
        res.forEach(person => {
            console.log(`${person.name} ${person.number}`)  
        })
        mongoose.connection.close()
    })
}

//Numeron tallentaminen tietokantaan
if ( process.argv.length == 5 ) {
    person.save().then(res => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    })
}


