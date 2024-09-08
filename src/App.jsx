import { useState, useCallback ,useEffect,useRef } from 'react';
import React from 'react';

function App() {
  const [length, setlength] = useState(8);
  const [numberallowed, setnumberallowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [Password, setpassword] = useState("")
//use ref hook
const passwordRef=useRef(null)

  // Password generator
  const passowordGenerstor = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz";
    if (numberallowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(+[]~";
    
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberallowed, charAllowed, setpassword]);

   const copyPasswordToClipoard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20);
  window.navigator.clipboard.writeText(Password)   }, [Password])
  useEffect(()=>{
passowordGenerstor()
  },[length ,numberallowed,charAllowed ,passowordGenerstor])
  return (
    <>
      <div className="main-box">
        <div className="input-box">
          <h1 className="text">Password Generator</h1>
          <input
            type='text'
            value={Password}
            className="input"
            placeholder='password'
            readOnly 
            ref={passwordRef}/>
          <button 
          onClick={copyPasswordToClipoard}
          className="btn">Copy</button> {/* Fixed className */}
        </div>
        <div className="items-box">
          <div className="range">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setlength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div  className='check-number'>
            <input
            type='checkbox'
            defaultChecked={numberallowed}
          onChange={()=>{
            setnumberallowed((prev) =>!prev)
          }}
          />
          <label htmlFor='nmberInput'>Number</label>
          </div>
          <div className='check-char'>
            <input 
            type='checkbox'
            defaultChecked={charAllowed}
            onChange={()=>{
              setcharAllowed((prev)=> !prev)
            }}
            />
            <label htmlFor='characterInput'>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
