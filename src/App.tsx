import React from 'react';
import './App.css';

import { parsePhoneNumberFromString } from 'libphonenumber-js'

function Error () {
  return (<div className="error-message">something went wrong.</div>)
}

function Duplicate () {
  return (<div className="message">number already signed up.</div>)
}

function Success () {
  return (<div className="message">success. text soon.</div>)
}

function Space () {
  return (
    <>
    <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

    </>
    )
}

// @observer
function App() {
  const [title, __] = React.useState("hoon.bot")
  const [number, setNumber] = React.useState('')
  const [fontSize, _] = React.useState(100)
  const [complete, setComplete] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [duplicate, setDuplicate] = React.useState(false)

  function handleJoin(number: any){
    // post to server
    if (number.substr(0, 1) != 1){
      number = "+1" + number
    }
    // str.substr(1, 4)
    console.log(number)
    const phoneNumber = parsePhoneNumberFromString(number)
    console.log(phoneNumber)
  if (phoneNumber) {
    console.log('joining')

    console.log({phoneNumber: phoneNumber.number})
      fetch('http://149.248.61.161:4000/api/join', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({phoneNumber: phoneNumber.number})
      })
      .then(async (res) => {
        console.log(res)
        if(res.status == 200){
          setComplete(true)
        } else if(res.status == 409){
          fetch('http://149.248.61.161:4000/api/status/'+phoneNumber.number, 
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
      })
      .then(async (res) => {
        console.log(res)
          setDuplicate(true)
      }).catch((e) => {
        console.log(e)
        setError(true)
      })
        }
      }).catch((e) => {
        console.log(e)
        
        setError(true)
      })
    } else {
        setError(true)
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
          <span className={"title"} style={{fontSize: fontSize, top: '15vh'}}>{title}</span>
          <span className={"title"} style={{fontSize: fontSize, top: '30vh'}}>{title}</span>
          <span className={"title"} style={{fontSize: fontSize, top: '45vh'}}>{title}</span>
          <Space />
          <p style={{color: 'black', fontSize: "20px"}}>automated text service for timely hoon academy nuggets</p>
          <a className="phoneNumber" href="tel:16727020100">text {/*>*/} +16727020100</a>
          <br/>

          {
            complete ? <Success /> : null
          }

          {
            error ? <Error /> : null
          }

          {
            duplicate ? <Duplicate /> : null
          }

          {
            !(complete || error || duplicate ) ? 
            <>
              <input placeholder="your number" onChange={(e) => {
                setNumber(e.target.value)
              }}/>
              <br/>
              <button className="button" onClick={() => handleJoin(number)}>join</button>
            </>
            : null
          }
      </header>
    </div>
  );
}

export default App;