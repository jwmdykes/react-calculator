import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

function CalculatorButton({ children, className, ...props }) {
  return (
    <button
      className={twMerge(
        'bg-gray-100 py-5 aspect-square rounded-3xl shadow-sm hover:brightness-95 hover:cursor-pointer active:brightness-90 text-gray-600 transition-all duration-100 text-3xl',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function Calculator() {
  const [currVal, setCurrVal] = useState(0);
  const [prevVal, setPrevVal] = useState(null);
  const [operation, setOperation] = useState(null);
  const [decimalExp, setDecimalExp] = useState(null);

  const handleNumberClick = useCallback(
    (i) => {
      if (decimalExp === null) {
        setCurrVal(currVal * 10 + i);
      } else {
        setCurrVal(currVal + i / Math.pow(10, decimalExp));
        setDecimalExp(decimalExp + 1);
      }
    },
    [currVal, decimalExp]
  );

  const handleResetClick = () => {
    setCurrVal(0);
    setDecimalExp(null);
  };

  const handleDecimalClick = useCallback(() => {
    if (decimalExp === null) {
      setDecimalExp(1);
    }
  }, [decimalExp]);

  const handlePercentClick = useCallback(() => {
    setCurrVal(currVal / 100);
    setDecimalExp(null);
  }, [currVal]);

  const handleSqrtClick = useCallback(() => {
    setCurrVal(Math.sqrt(currVal));
    setDecimalExp(null);
  }, [currVal]);

  const handleOperatorClick = useCallback(
    (op) => {
      setPrevVal(currVal);
      setOperation(op);
      setCurrVal(0);
      setDecimalExp(null);
    },
    [currVal]
  );

  const handleEqualsClick = useCallback(() => {
    if (operation === '−') {
      setCurrVal(prevVal - currVal);
      setOperation(null);
      setPrevVal(null);
      setDecimalExp(null);
    } else if (operation === '×') {
      setCurrVal(prevVal * currVal);
      setOperation(null);
      setPrevVal(null);
      setDecimalExp(null);
    } else if (operation === '÷') {
      setCurrVal(prevVal / currVal);
      setOperation(null);
      setPrevVal(null);
      setDecimalExp(null);
    } else if (operation === '+') {
      setCurrVal(prevVal + currVal);
      setOperation(null);
      setPrevVal(null);
      setDecimalExp(null);
    }
  }, [currVal, prevVal, operation]);

  useEffect(() => {
    function onKeyPress(e) {
      const { key } = e;
      if (/[0-9]/.test(key)) {
        handleNumberClick(parseInt(key));
      } else if (key === '.') {
        handleDecimalClick();
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        handleResetClick();
      } else if (key === '/' || key === '÷') {
        handleOperatorClick('÷');
      } else if (key === '*' || key === '×') {
        handleOperatorClick('×');
      } else if (key === '-' || key === '−') {
        handleOperatorClick('−');
      } else if (key === '+' || key === 'Add') {
        handleOperatorClick('+');
      } else if (key === '=') {
        handleEqualsClick();
      } else if (key === '%') {
        handlePercentClick();
      } else if (key === 's' || key === 'S') {
        handleSqrtClick();
      }
    }

    window.addEventListener('keypress', onKeyPress);

    return () => {
      window.removeEventListener('keypress', onKeyPress);
    };
  }, [
    handleDecimalClick,
    handleEqualsClick,
    handleNumberClick,
    handleOperatorClick,
    handleSqrtClick,
    handlePercentClick,
  ]);

  return (
    <div className="bg-white p-5 rounded-2xl">
      <div className="text-right bg-gray-100 p-3 rounded-xl mb-6">
        <h2 className="text-lg text-gray-500">
          {prevVal?.toLocaleString() ?? '\u00a0'} {operation}
        </h2>
        <h1 className="text-6xl">
          {currVal.toLocaleString() + (decimalExp === 1 ? '.' : '')}
        </h1>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <CalculatorButton
          className="bg-red-100 text-red-400"
          onClick={handleResetClick}
        >
          C
        </CalculatorButton>
        <CalculatorButton onClick={handlePercentClick}>%</CalculatorButton>
        <CalculatorButton onClick={handleSqrtClick}>√</CalculatorButton>
        <CalculatorButton className="bg-orange-400 text-white">
          <div
            className="-translate-y-[1px]"
            onClick={() => handleOperatorClick('÷')}
          >
            ÷
          </div>
        </CalculatorButton>
        <CalculatorButton onClick={() => handleNumberClick(1)}>
          1
        </CalculatorButton>
        <CalculatorButton onClick={() => handleNumberClick(2)}>
          2
        </CalculatorButton>
        <CalculatorButton onClick={() => handleNumberClick(3)}>
          3
        </CalculatorButton>
        <CalculatorButton className="text-white bg-orange-400">
          <div
            className="-translate-y-[1px]"
            onClick={() => handleOperatorClick('×')}
          >
            ×
          </div>
        </CalculatorButton>
        <CalculatorButton onClick={() => handleNumberClick(4)}>
          4
        </CalculatorButton>
        <CalculatorButton onClick={() => handleNumberClick(5)}>
          5
        </CalculatorButton>
        <CalculatorButton onClick={() => handleNumberClick(6)}>
          6
        </CalculatorButton>
        <CalculatorButton className="bg-orange-400 text-white">
          <div
            className="-translate-y-[1px]"
            onClick={() => handleOperatorClick('−')}
          >
            −
          </div>
        </CalculatorButton>
        <CalculatorButton onClick={() => handleNumberClick(7)}>
          7
        </CalculatorButton>
        <CalculatorButton onClick={() => handleNumberClick(8)}>
          8
        </CalculatorButton>
        <CalculatorButton onClick={() => handleNumberClick(9)}>
          9
        </CalculatorButton>
        <CalculatorButton className="bg-orange-400 text-white">
          <div
            className="-translate-y-[1px]"
            onClick={() => handleOperatorClick('+')}
          >
            +
          </div>
        </CalculatorButton>
        <CalculatorButton
          className="col-span-2 aspect-auto"
          onClick={() => handleNumberClick(0)}
        >
          0
        </CalculatorButton>
        <CalculatorButton onClick={handleDecimalClick}>.</CalculatorButton>
        <CalculatorButton className="bg-green-400 text-white">
          <div className="-translate-y-[1px]" onClick={handleEqualsClick}>
            =
          </div>
        </CalculatorButton>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-linear-to-br from-slate-800 to-slate-950  h-dvh w-full flex items-center justify-center relative overflow-clip">
      <Calculator />
    </div>
  );
}

export default App;
