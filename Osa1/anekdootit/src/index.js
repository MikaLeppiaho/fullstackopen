import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { SlowBuffer } from 'buffer';

const App = (props) =>{
    const [selected, setSelected] = useState(0)
    let [votes, setVote] = useState([0,0,0,0,0,0])
    

    const nextAnecdote = () => setSelected(Math.floor(Math.random()*(5 - 0))+ 0)
    
    const vote = () => {
        const copy = [...votes]
        copy[selected] +=1
        setVote(votes = copy)
        console.log(copy)
    
    }
    const winner = () =>{
        
        const max = votes.indexOf(Math.max(...votes))
        console.log("Index of winner: ",max)

        return max
        }



    return (
    <div>

        {props.anecdotes[selected]}
        <Button handleClick={nextAnecdote} text = "Next anecdote" selected={selected}/>
        <Button handleClick={vote} text = "Vote"/>
        <Vote vote={votes} i={selected}/>
        <Winner winner={winner()} anek={anecdotes}/>
        
    </div>
    )
    
}

const Button = ({handleClick, text}) =>(
    <div>
        <button onClick={handleClick}>{text}</button>
        
    </div>
)
const Vote = ({vote, i}) =>{

    return(
        <div>Has {vote[i]} votes</div>
    )
}

const Winner =({winner, anek}) => {
    //console.log(winner)
    return(
        <div>
        <h1>Anecdote with most votes</h1>
        {anek[winner]}<br/>
        With {winner} votes
        </div>
    )

}










const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
