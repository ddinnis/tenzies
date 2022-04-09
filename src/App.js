import React, { useState } from "react";
import Dice from "./component/Dice"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Timer from "./component/Timer";

function App() {
const [dice, setDice] = useState(allNewDice())
const [tenzies, setTenzies] = useState(false)
const [count, setCount] = useState(0)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allValue = dice.every(die => die.value === firstValue)
    
    if(allHeld && allValue){
      setTenzies(true)
      setStart(false)
    }  
  },[dice])


const [time, setTime] = React.useState(0);
const [start, setStart] = React.useState(false);

  React.useEffect(() => {
    let interval = null;
    if (start && !tenzies) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [start, tenzies]);


  function generateNewDice() {
      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for(let i=0; i<10; i++){
      const randomNum = Math.ceil(Math.random() * 6)
      newDice.push({
        value: randomNum,
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice;
  }

  function rollDice() {
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return !die.isHeld ? 
          generateNewDice() :
          die
      }))
      setCount(oldCount => oldCount + 1 )
      setStart(true)
    }else{

      setTenzies(false) 
      setDice(allNewDice())
      setCount(0)
    }
  }

  function holdDice(id) {
    if (!tenzies) {
      setStart(true);
    }
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        {...die, isHeld: !die.isHeld} :
        die
    }
      ))
  }
  

  const diceElements = dice.map(diceNum => (
        <Dice 
          key={diceNum.id}
          value={diceNum.value} 
          id={diceNum.id}
          isHeld={diceNum.isHeld}
          holdDice={() => holdDice(diceNum.id)} //anonymous function
    />))

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="intro-container">
        <h1>Tenzies</h1>
        <p>{!tenzies ? 
            `Roll until all dice are the same. Click each die to freeze it at its current value between rolls.` :
            `TENZI, You Win ! `}</p>
      </div>
      <div className="dice-container" >
        {diceElements}
      </div>
      <button className="roll-button" onClick={rollDice}>{tenzies ?  `New Game` : `Roll`}</button>
      <div className="buttom-container">
        <h3>Dice Roll Count：{count}</h3>
        <h3><Timer time={time}/></h3>
      </div>
    </main>
  );
}

export default App;
