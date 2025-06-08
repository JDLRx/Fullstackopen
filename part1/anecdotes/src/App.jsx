import { useState } from 'react'


const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const VotedAnecdote = (props) => {

  if (props.mostVotes.votes == 0){

    return (
      <div></div>
    )
  } else {
    
    return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.mostVotes.anecdote}</p>
      <p>has {props.mostVotes.votes} votes</p>
    </div>
  )
  }

  
}

const Anecdote = (props) => {

  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.anecdotes[props.selected]}</p>
    </div>
  )
}


const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})
  const [mostVotes, setMostVotes] = useState({
    "anecdote": "",
    "votes": 0,
  })

  function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  // The maximum is inclusive and the minimum is inclusive
  }



  const handleNext = () => {

    const newQuote = getRandomIntInclusive(0, anecdotes.length - 1)
    if (newQuote == selected) {
      handleNext()
    } else {
      setSelected(newQuote)
    }
  }

  const handleVotes = () => {

    let currentVotes = {...votes}
    let mostVoted = {...mostVotes}


    if (currentVotes[selected] == undefined) {
      currentVotes[selected] = 0
    }

    currentVotes[selected] += 1
    setVotes(currentVotes)
    
    if (mostVoted.anecdote == ""){
      mostVoted = {"anecdote": anecdotes[selected], "votes":currentVotes[selected]}
      setMostVotes(mostVoted)
    } else if (mostVoted.anecdote != "") {
      if (mostVoted.votes < currentVotes[selected]) {
        mostVoted = {"anecdote": anecdotes[selected], "votes":currentVotes[selected]}
        setMostVotes(mostVoted)
      }
    }
  }


  return (
    <div>
      <Anecdote anecdotes={anecdotes} selected={selected} title="Anecdote of the day"/>
      <p>has {votes[selected]} votes</p>
      <Button onClick={handleVotes} text="vote" />
      <Button onClick={handleNext} text="next anecdote" />
      <VotedAnecdote mostVotes={mostVotes} selected={selected} title="Anecdote with most votes" />
    </div>
  )
}

export default App