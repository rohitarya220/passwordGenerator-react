import { useCallback, useState, useEffect, useRef } from "react";



function App() {
  const [length, setLength] = useState(8);
  const [numallowed, setNumallowed] = useState(false);
  const [charallowed, setCharallowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef= useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(numallowed) str += '124567890'
    if(charallowed) str += '!@#$%^&*()<>'
    for (let  i = 1;  i <= length;  i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
   setPassword(pass)
  },[length, numallowed, charallowed, setPassword])

const copyPassword = useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,25)
  window.navigator.clipboard.writeText(password)
},[password])


  useEffect( ()=>{
    generatePassword()
  }, [length,charallowed, numallowed, generatePassword  ])
 

  return (
   <div className=' w-full h-screen bg-cyan-900'>
    <h1 className="md:text-3xl text-2xl text-center font-bold text-white">Password Generator</h1>

    <div className="md:w-full w-80 max-w-md mx-auto shadow-md rounded-lg my-8 py-8 px-4 bg-gray-700 text-orange-500">
      <div className=" flex shadow rounded-lg overflow-hidden ">
        <input
         type="text"
         value={password}
         ref={passwordRef}
         className="outline-none w-full py-1 px-3 font-bold"
         placeholder="password"
         readOnly
        />
        <button onClick={copyPassword} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-800">Copy</button>
      </div>
      <div className="flex text-sm gap-x-2 mt-2"> 
        <div className="flex items-center gap-x-1">
          <input 
           type="range"
           min={8}
           max={30}
           value={length}
           className=" md:w-44 text-orange-600 w-24 cursor-pointer"
           onChange={(e)=> {setLength(e.target.value)}}

          />
          <label >({length})</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
           type="checkbox"
           defaultChecked={numallowed}
           className=" cursor-pointer"
           id="numberInput"
           onChange={()=>{
            setNumallowed((prev) => !prev)
            }}

          />
          <label htmlFor="numberInput" >Number</label>
          
        </div>
        <div className="flex items-center gap-x-1">
          <input 
           type="checkbox"
           defaultChecked={charallowed}
           className=" cursor-pointer"
           id="charInput"
           onChange={()=>{
            setCharallowed((prev) => !prev)
            }}

          />
          <label htmlFor="charInput" >Characters</label>
        </div>
      </div>

    </div>

    
   </div>
  )
}

export default App
