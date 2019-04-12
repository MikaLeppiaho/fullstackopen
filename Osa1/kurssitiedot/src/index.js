import React from 'react'
import ReactDOM from 'react-dom'

const App = () =>  {

    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                exercises: 10
            },
            {
                name: 'Tiedonvälitys propseilla',
                exercises: 7
            },
            {
                name: 'Komponenttien tila',
                exercises: 14
            }
        ]
    }
    console.log(course)
    return (
        <div>
            
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
            
        </div>
    )
}

const Header = (props) =>{
    console.log(props.course.name)
    return(
        <div>
            <h1>{props.course.name}</h1>
        </div>
    )
}

const Content = (props) =>{
    console.log(props.course.parts[0])
    return(
        <div>
           <Part parts={props.course.parts[0]}/>
           <Part parts={props.course.parts[1]}/>
           <Part parts={props.course.parts[2]}/>
        </div>
    )
}

const Part = (props) =>{
    console.log(props)
    return(
        <p>{props.parts.name} {props.parts.exercises}</p>
    )
}
const Total = (props) =>{

    return(
        <div>
        <p>Yhteensä {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises} tehtävää</p>
        </div>
    )
}



ReactDOM.render(<App />, document.getElementById('root'))