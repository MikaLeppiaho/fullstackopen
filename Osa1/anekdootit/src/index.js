import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = (props) =>{
    const [selected, setSelected] = useState(0)

    

    const nextAnecdote= () => setSelected(Math.floor(Math.random()*(5 - 0))+ 0)

    
    const updateVotes = () =>{
        console.log(props.points)
    }
    

    return (
    <div>
        
        {console.log(selected)}
        {props.anecdotes[selected]}
        <Aanestys selected ={selected}/>
        <button onClick={updateVotes}>Vote</button>
        <button onClick={nextAnecdote}>Next anecdote</button>
        
    </div>
    )
}

const Aanestys = (props) =>{
    return(
        <div>Has {props.selected} vote</div>
    )
}




const points = Array.apply(null, new Array(10)).map(Number.prototype.valueOf,0);

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));

