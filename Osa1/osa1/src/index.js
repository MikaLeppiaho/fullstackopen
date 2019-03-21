import React from 'react';
import ReactDOM from 'react-dom';

const part1 = 'Reactin perusteet'
const exercises1 = 10
const part2 = 'Tiedonvälitys propseilla'
const exercises2 = 7
const part3 = 'Komponenttien tila'
const exercises3 = 14

const App = () =>{
    const course = 'Half Stack -sovelluskehitys'
   

    

    return(
        <div>
            <Header course={course} /> 
            <Content/>
            <Total total={exercises1+exercises2+exercises3} tehtävää />
        </div>
    )
}

const Header = (props) => {
    return(
        <div>
           <h1>{props.course}</h1>
        </div>
    )

}
const Content = () => {

    return(
        <div>
            <Part part={part1} exec={exercises1}/>
            <Part part={part2} exec={exercises2}/>
            <Part part={part3} exec={exercises3}/>
        </div>
    )
}

const Part = (props) => {
    return(
        <div>
            {props.part} {props.exec}
        </div>
    )
}

const Total = (props) => {
    return(
        <div>
            <p>Yhteensä {props.total} tehtävää</p>
        </div>
    )
}



ReactDOM.render(<App />, document.getElementById('root'))