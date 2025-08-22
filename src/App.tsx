import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*`";

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const copyPasswordToClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-lg bg-gray-800 shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Password Generator
        </h1>

        {/* Password Box */}
        {/* Password Box */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-gray-700 rounded-lg overflow-hidden gap-2">
          <input
            type="text"
            value={password}
            placeholder="password"
            readOnly
            ref={passwordRef}
            className="flex-1 bg-gray-700 text-green-400 font-mono px-3 py-2 focus:outline-none"
          />
          <button
            className="bg-green-600 text-white px-4 py-2 hover:bg-green-400 transition w-full sm:w-auto rounded-br-lg rounded-tr-lg"
            onClick={passwordGenerator}
          >
            Regenerate
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 hover:bg-pink-500 transition w-full sm:w-auto"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-5 mt-5 text-white">
          <div className="flex items-center gap-x-1 ">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer accent-green-500'
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label htmlFor="Length">Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              className='accent-green-500'
              onChange={() => { setNumberAllowed((prev) => !prev); }}
            />
            <label htmlFor="NumberInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={characterAllowed}
              className='accent-green-500'
              id="characterInput"
              onChange={() => { setCharacterAllowed((prev) => !prev); }}
            />
            <label htmlFor="charAllowed">Character</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
