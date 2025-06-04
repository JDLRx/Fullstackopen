import { use, useState } from 'react'


const Statistics = (props) => {

  if (props.total == 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  } else {

    return (
    <div>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.total}</p>
      <p>average {props.average}</p>
      <p>positive {props.positive} %</p>
    </div>
  )

  }


  
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)


  function calcAverage () {
   setAverage((good * 1 - bad * 1) / total)
  }

  function calcPositive () {
    setPositive(good / total)
  }

  const handleGood = () => {
  setGood(good + 1)
  setTotal(total + 1)
  calcAverage()
  calcPositive()
  }

  const handleNeutral = () => {
  setNeutral(neutral + 1)
  setTotal(total + 1)
  calcAverage()
  calcPositive()
  }

  const handleBad = () => {
  setBad(bad + 1)
  setTotal(total + 1)
  calcAverage()
  calcPositive()
  }



  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <Statistics
          good={good} neutral={neutral}
          bad={bad} total={total} 
          average={average} positive={positive}
      />
    </div>
  )
}

export default App