import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

function CalculatorButton({ children, className, ...rest }) {
  return (
    <button
      className={twMerge(
        'bg-gray-100 py-5 aspect-square rounded-3xl shadow-sm hover:brightness-95 hover:cursor-pointer active:brightness-90 text-gray-600 transition-all duration-100 text-3xl',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

function Calculator() {
  const [curVal, setCurVal] = useState('');
  const [prevVal, setPrevVal] = useState('');
  const [op, setOp] = useState('');

  function handleClear() {
    setCurVal('');
    setPrevVal('');
    setOp('');
  }

  function handleDigit(i) {
    setCurVal((prev) => prev + i);
  }

  function handleOp(op) {
    setPrevVal(curVal);
    setCurVal('');
    setOp(op);
  }

  function handleEq() {
    const prev = parseFloat(prevVal);
    const curr = parseFloat(curVal);

    if (op === '+') {
      setPrevVal('');
      setCurVal(prev + curr);
      setOp('');
    } else if (op === '÷') {
      setPrevVal('');
      setCurVal(prev / curr);
      setOp('');
    } else if (op === '×') {
      setPrevVal('');
      setCurVal(prev * curr);
      setOp('');
    } else if (op === '−') {
      setPrevVal('');
      setCurVal(prev - curr);
      setOp('');
    }
  }

  function formatDisplay() {
    if (curVal.length === 0) {
      return '0';
    } else if (curVal === '.') {
      return '0.';
    } else if (curVal[curVal.length - 1] === '.') {
      return parseFloat(curVal).toLocaleString() + '.';
    } else {
      return parseFloat(curVal).toLocaleString();
    }
  }

  return (
    <div className="bg-white p-5 rounded-2xl">
      <div className="text-6xl text-right bg-gray-100 p-3 rounded-xl mb-6">
        {formatDisplay()}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <CalculatorButton
          className="bg-red-100 text-red-400"
          onClick={handleClear}
        >
          C
        </CalculatorButton>
        <CalculatorButton
          onClick={() => {
            setCurVal((prev) => String(parseFloat(prev) / 100));
          }}
        >
          %
        </CalculatorButton>
        <CalculatorButton
          onClick={() => {
            setCurVal((prev) => String(Math.sqrt(parseFloat(prev))));
          }}
        >
          √
        </CalculatorButton>
        <CalculatorButton className="bg-orange-400 text-white">
          <div className="-translate-y-[1px]" onClick={() => handleOp('÷')}>
            ÷
          </div>
        </CalculatorButton>
        <CalculatorButton onClick={() => handleDigit('1')}>1</CalculatorButton>
        <CalculatorButton onClick={() => handleDigit('2')}>2</CalculatorButton>
        <CalculatorButton onClick={() => handleDigit('3')}>3</CalculatorButton>
        <CalculatorButton className="text-white bg-orange-400">
          <div className="-translate-y-[1px]" onClick={() => handleOp('×')}>
            ×
          </div>
        </CalculatorButton>
        <CalculatorButton onClick={() => handleDigit('4')}>4</CalculatorButton>
        <CalculatorButton onClick={() => handleDigit('5')}>5</CalculatorButton>
        <CalculatorButton onClick={() => handleDigit('6')}>6</CalculatorButton>
        <CalculatorButton className="bg-orange-400 text-white">
          <div className="-translate-y-[1px]" onClick={() => handleOp('−')}>
            −
          </div>
        </CalculatorButton>
        <CalculatorButton onClick={() => handleDigit('7')}>7</CalculatorButton>
        <CalculatorButton onClick={() => handleDigit('8')}>8</CalculatorButton>
        <CalculatorButton onClick={() => handleDigit('9')}>9</CalculatorButton>
        <CalculatorButton className="bg-orange-400 text-white">
          <div className="-translate-y-[1px]" onClick={() => handleOp('+')}>
            +
          </div>
        </CalculatorButton>
        <CalculatorButton
          className="col-span-2 aspect-auto"
          onClick={() => handleDigit('0')}
        >
          0
        </CalculatorButton>
        <CalculatorButton onClick={() => handleDigit('.')}>.</CalculatorButton>
        <CalculatorButton className="bg-green-400 text-white">
          <div className="-translate-y-[1px]" onClick={handleEq}>
            =
          </div>
        </CalculatorButton>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-linear-to-br from-slate-800 to-slate-950  h-dvh flex items-center justify-center">
      <Calculator />
    </div>
  );
}

export default App;
