import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left+1)
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setRight(left+1)
    }

    return(
        <div>
            <div>
                <Display value={left} />
                <Button handleClick={handleLeftClick} text='vasen'/>
                <Button handleClick={handleRightClick} text='oikea'/>
                <Display value={right} />
                <History allClicks={allClicks} />
            </div>
        </div>
    )
}

const History = (props) => {
    if (props.allClicks.length === 0){
        return (
            <div>
                sovellusta käytetään nappeja painelemassa
            </div>
        )
    }
    return(
        <div>
            Näppäilyhistoria: {props.allClicks.join(' ')}
        </div>
    )
}

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)

const Display = ({value}) =>{
    return(
      <div>{value}</div>  
    )
}
    



ReactDOM.render(<App />, document.getElementById('root'))
