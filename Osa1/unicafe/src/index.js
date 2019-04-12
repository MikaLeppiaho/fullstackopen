import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const App = () =>{
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)
    const [average, setAverage] = useState(0)
    

    const handleGood = () =>{
        setGood(good+1)
        setTotal(total+1)
        setAverage(average+1)
    }
    const handleNeutral = () =>{
        setNeutral(neutral+1)
        setTotal(total+1)
    }
    const handleBad = () =>{
        setBad(bad+1)
        setTotal(total+1)
        setAverage(average-1)
    }

    return(
        
        <div>
            <h1>Anna Palautetta</h1>
            <Button handleClick={handleGood} text='Hyvä' />
            <Button handleClick={handleNeutral} text='Neutraali' />
            <Button handleClick={handleBad} text='Huono' />

            <h2>Statistiikka</h2>
            <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average}/>
            
        </div>
    )
}

const Statistics = (props) =>{
    console.log(props)
    if(props.total === 0){
        return(
            <div>Yhtään palautetta ei ole annettu</div>
        )
    }
        return(
            <div>
                <table>
                    <tbody>
                        <Statistic text='Hyvä' value={props.good} />
                        <Statistic text='Neutraali' value={props.neutral} />
                        <Statistic text='Huono' value={props.bad} />
                        <Statistic text='Yhteensä' value={props.total} />
                        <Statistic text='Keskiarvo' value={props.average/props.total} />
                        <Statistic text='Positiivisia' value={props.good/props.total*100+' %'} />
                    </tbody>
                </table>
            </div>
        )
    }
const Statistic = (props) =>{
    return(
        
        <tr>
            <td>{props.text}:</td>
            <td>{props.value}</td>
        </tr>
        
    )
}

    

const Button = ({handleClick, text}) =>(
    <button onClick={handleClick}>{text}</button>
)

ReactDOM.render(<App />, document.getElementById('root'));


