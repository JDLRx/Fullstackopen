import { useState } from 'react'


const Button = (props) => {

  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {

  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}


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
      <table>
        <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.total} />
        <StatisticLine text="average" value={props.average} />
        <StatisticLine text="positive" value={props.positive} />
        </tbody>
      </table>
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


  function calcAverage (updatedGood, updatedBad, updatedTotal) {
   setAverage((updatedGood * 1 - updatedBad * 1) / updatedTotal)
  }

  function calcPositive (updatedGood, updatedTotal) {
    setPositive((updatedGood / updatedTotal) * 100 +" %")
  }

  const handleGood = () => {
    // use const values to evade asynchronous updates
    const updatedGood = good + 1
    setGood(updatedGood)
    const updatedTotal = total + 1
    setTotal(updatedTotal)
    calcAverage(updatedGood, bad, updatedTotal)
    calcPositive(updatedGood, updatedTotal)
  }

  const handleNeutral = () => {
    // use const values to evade asynchronous updates
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const updatedTotal = total + 1
    setTotal(updatedTotal)
    calcAverage(good, bad, updatedTotal)
    calcPositive(good, updatedTotal)
  }

  const handleBad = () => {
    // use const values to evade asynchronous updates
    const updatedBad = bad + 1
    setBad(updatedBad)
    const updatedTotal = total + 1
    setTotal(updatedTotal)
    calcAverage(good, updatedBad, updatedTotal)
    calcPositive(good, updatedTotal)
  }



  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good"/>
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Statistics
          good={good} neutral={neutral}
          bad={bad} total={total} 
          average={average} positive={positive}
      />
    </div>
  )
}

export default App