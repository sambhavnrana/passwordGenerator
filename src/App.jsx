import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [capitalChars, setCapitalChars] = useState(true);
  const [password, setPassword] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyz";
    if (capitalChars) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, capitalChars]);

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      navigator.clipboard.writeText(password);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 1200);
    }
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-lg lg:max-w-4xl bg-gray-900 rounded-xl shadow-lg p-4 lg:p-8 text-orange-400">
        <h1 className="text-3xl lg:text-5xl font-bold text-white text-center mb-6">
          🔐 Password Generator
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-6 relative">
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            className="w-full sm:w-5/6 rounded-md px-4 py-2 text-black text-lg lg:text-2xl outline-none"
          />
          <div className="relative flex items-center justify-center w-full sm:w-1/6">
            <button
              onClick={copyPasswordToClipboard}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition relative"
            >
              COPY
            </button>
            {/* Tooltip */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 -top-3 sm:-top-6 z-10 pointer-events-none transition-all duration-300 ${
                showTooltip
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
            >
              <div className="bg-gray-900 text-white text-xs sm:text-sm rounded px-2 py-1 shadow-lg border border-gray-700">
                Copied!
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <label htmlFor="length" className="whitespace-nowrap text-xl">
              Length: {length}
            </label>
            <input
              id="length"
              type="range"
              min={8}
              max={32}
              value={length}
              className="cursor-pointer accent-orange-500 "
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
          </div>

          <div className="flex items-center gap-3 text-xl">
            <input
              id="numbers"
              type="checkbox"
              checked={capitalChars}
              onChange={() => setCapitalChars((prev) => !prev)}
              className="accent-orange-500 w-4 h-4 lg:w-6 lg:h-6"
            />
            <label htmlFor="numbers">Include Uppercase</label>
          </div>

          <div className="flex items-center gap-3 text-xl">
            <input
              id="numbers"
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="accent-orange-500 w-4 h-4 lg:w-6 lg:h-6"
            />
            <label htmlFor="numbers">Include Numbers</label>
          </div>

          <div className="flex items-center gap-3 text-xl">
            <input
              id="symbols"
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="accent-orange-500 w-4 h-4 lg:w-6 lg:h-6"
            />
            <label htmlFor="symbols">Include Symbols</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
