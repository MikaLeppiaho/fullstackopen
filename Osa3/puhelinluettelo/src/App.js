import React, {useState,useEffect} from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const Filter = (props) =>{
  
  return(
    <div>
      Filtter users: <input 
      value={props.value}
      onChange={props.onChange} 
      />
    </div>
    )
}


const PersonForm = (props) =>{
  
  return(
    <form onSubmit={props.onSubmit}>

       <div>
        Name: <input 
        value={props.nameChange}
        onChange={props.nameEvent}
        /></div>
        
      <div>
        Number: <input 
        value={props.numberChange}
        onChange={props.numberEvent}
        />
      </div>
        <button type='submit'>add</button>
    </form>
  )
}

const Persons = (props) =>{

  return(
    <ul>
      {props.rows}
    </ul>
     
  )
}

const App = () =>{
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorColor, setErrorColor] = useState('Green')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons =>{
        setPersons(initialPersons)
      })
  },[])

  const addName = (e) => {
    e.preventDefault()//estetään sivun uudelleenlataaminen formin lähetyksessä
    const nameObject ={
      name: newName,
      number: newNumber,
      
    }
    //Katso samanarvoinen nimi ja palauta joko concat tai alert
    const buffer = checkDuplicate(nameObject)
    console.log("buffer: ", buffer)
    setNewName('')
    setNewNumber('')
    // else Alert "That name allready exists"
    console.log("painettu",e.target)
    console.log("Nimiobjekti",nameObject)
    console.log("Lista:",persons)
  }

  const deleteName = (e, name) =>{
    if(window.confirm(`Delete ${name}`)){
      personService
      .removeName(e)      
      .then(() =>{
        setErrorMessage('POISTETTUPOISTETTU')
        setErrorColor('Green')
        setTimeout(()=>{
          setErrorMessage(null)
          setErrorColor(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== e))
      })
      .catch(error => {
        setErrorMessage(`Information of ${name} has already been removed from server`)
        setErrorColor('Red')
        setTimeout(()=>{
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== e))
      })
    }
    }
    
  const handleNameChange = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) =>{
    console.log("NumberChange",e.target.value)
    setNewNumber(e.target.value)
  }
  const handleFiltterchange = (e) => {
    console.log("FiltterChange",e.target.value)
    setShowAll(e.target.value)
  }

  const filtterPersons = persons.filter((person)=>{
    return person.name.toLowerCase().indexOf(
      showAll.toLowerCase())!== -1
  })

  const updateName = (id, newNumber,name) =>{
    const person = persons.find(n => n.id === id)
    const changedPerson = {...person, number: newNumber}

    if(window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)){
      console.log(`Updated ${id} with ${newNumber}`)
      personService
      .updateName(id, changedPerson)
      .then(returnedNote =>{
        setErrorMessage(`Updated ${changedPerson.name}`)
        setErrorColor('Green')
        setTimeout(()=>{
          setErrorMessage(null)
          setErrorColor(null)
        }, 5000)
        setPersons(persons.map(person => person.id !== id ? person:returnedNote))
    })
    .catch(error => {
      setErrorMessage(`There was an error updating ${changedPerson}`)
      setErrorColor('Red')
      setTimeout(()=>{
        setErrorMessage(null)
      }, 5000)
    })
  }}
  const checkDuplicate = (nameObject) => {
    let duplicate = 0
    let itemId = 0
    persons.forEach((item)=>{
      if(item.name===newName){
        itemId = item.id
        duplicate =+1
        console.log("error",duplicate)
      }      
    })
    duplicate === 0 ? 
      personService
      .create(nameObject)
      .then(returnedName=>{
        setErrorMessage(`Added ${nameObject.name}`)
        setErrorColor('Green')
        setTimeout(()=>{
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.concat(returnedName))
      })
      .catch(error => {
        setErrorMessage(JSON.stringify(error.response.data))
        setErrorColor('Red')
        setTimeout(()=>{
          setErrorMessage(null)
        }, 5000)
      })
      :
      updateName(itemId, nameObject.number,nameObject.name)
    // ---Tämän tilalle HTTP PUT jos käyttäjä haluaa päivittää vanhan numeron--
    //alert(`${newName} is allready added to phonebook`)
    //console.log("onko duplicaatti",isDuplicate)
    //duplicate = 0
    //return isDuplicate
   
  }

  const rows = () => filtterPersons.map(person => 
    <li key={person.id}>
       {person.name} {person.number} 
       <button onClick={() => deleteName(person.id, person.name)}>
       delete
       </button>
     </li>
 )

  return(
  <div>
    <h2>Phonebook</h2>
    <Notification message={errorMessage} errorCode={errorColor} />

    <Filter value={showAll} onChange={handleFiltterchange} />

    <h3>Add a new</h3>

    <PersonForm 
      onSubmit={addName}
      nameChange={newName}
      nameEvent={handleNameChange}
      numberChange={newNumber}
      numberEvent={handleNumberChange}
    />

    <h3>Numbers</h3>
    <Persons rows={rows()}/>
  </div>
   
  )
}
export default App
