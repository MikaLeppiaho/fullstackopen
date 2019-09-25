//Kyseessä react komponentti. Lisätään react
import React from 'react'

const Header = () => <div><h1>Opintojakso</h1></div>

  

const Total = ({part}) => {
  //Luo kurssien tehtävistä taulukko ja reduce funktiolla laske yhteen arvot.
  const exrc = part.parts.map(teht => teht.exercises)
  const sum = exrc.reduce((add,sum) => add+sum)

  return(
    <p>Yhteensä {sum} tehtävää</p>
  )
  
}


const Part = ({nimi}) =>{
  const parts = nimi.parts.map(osa => <p key={osa.id}> {osa.name} {osa.exercises}</p>)

  return(
    <div>    
    <h2>{nimi.name}</h2>
    {parts}
    <Total part={nimi}/>
    </div>

  )

}

//renderöi otsikko ja kurssit
const Content = ({courses}) => {
  const kurssit = () => courses.map(nimi =>
    <Part
    key={nimi.id}
    nimi={nimi}
    />)

  return(
    <div>
      {kurssit()}

    </div>
  )
}

const Course = ({courses}) => {
  console.log('Course', courses)
return(
  <div> 
    <Header/>
    <Content courses={courses}/>
  </div>
)


}
//export käytetään, kun halutaan viedä komponentteja, funktioita, objecteja tai primitiivisä arvoja moduulista. 
export default Course