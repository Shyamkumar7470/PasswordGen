import { useState, useCallback, useEffect ,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%&*_"

    for (let i = 1; i <= length; i++) {

      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    setPassword(pass);


  }, [length, numAllowed, charAllowed, setPassword])

    const copyPasswordToClipboard = useCallback(()=>{

      passwordRef.current?.select()
    //   passwordRef.current?.setSelectionRange(0,5);
      window.navigator.clipboard.writeText(password);
    },[password])   

   useEffect(() =>{
            passwordGenerator()
   } , [length ,numAllowed , charAllowed ,passwordGenerator])

  return (
    <>
      <div className=' w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange '>
        <h1 className='text-white text-center my-3'>Password Genrator</h1>
        <div className='flex shadow overflow-hidded mb-4'>
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3 rounded'
            placeholder='Password'
            readOnly>
          </input>
          <button onClick={copyPasswordToClipboard} className=' outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={8}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            ></input>
            <label >Length : {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={() => {
                setNumAllowed((prev) => !prev)
              }}
            ></input>
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            ></input>
            <label htmlFor='characterInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
