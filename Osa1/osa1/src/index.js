import React from 'react';
import ReactDOM from 'react-dom';

const App = () =>{
    const course = 'Half Stack -sovelluskehitys'
    const part1 = 'Reactin perusteet'
    const exercises1 = 10
    const part2 = 'Tiedonvälitys propseilla'
    const exercises2 = 7
    const part3 = 'Komponenttien tila'
    const exercises3 = 14
    

    return(
        <div>
            <Header course={course} /> 
            <Content part={part1} exc={exercises1} />
            <Content part={part2} exc={exercises2} />
            <Content part={part3} exc={exercises3} />

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
const Content = (props)=> {
    return(
        <div>
            <p>{props.part} {props.exc}</p>
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