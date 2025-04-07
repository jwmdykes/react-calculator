import { useState } from 'react';
import { cn } from './cn';
import { useEffect } from 'react';
import { useCallback } from 'react';

function CalculatorButton({ children, className, onClick, ...props }) {
  const defaultClasses =
    'px-6 bg-gray-100 rounded-3xl text-xl flex items-center justify-center hover:cursor-pointer hover:brightness-95 transition-all duration-100 font-medium text-gray-600 shadow-sm active:brightness-90';
  const combinedClasses = cn(defaultClasses, className);

  return (
    <button className={combinedClasses} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

function Calculator() {
  const [currentInput, setCurrentInput] = useState('0');
  const [previousOperand, setPreviousOperand] = useState(null);
  const [operation, setOperation] = useState(null);

  const formatDisplay = (value) => {
    const number = parseFloat(value);
    if (isNaN(number)) return 'NaN';
    return number.toLocaleString();
  };

  const handleNumberClick = useCallback(
    (number) => {
      if (currentInput === '0') {
        setCurrentInput(String(number));
      } else {
        setCurrentInput((prev) => prev + number);
      }
    },
    [currentInput, setCurrentInput]
  );

  const handleClearClick = useCallback(() => {
    setCurrentInput('0');
    setPreviousOperand(null);
    setOperation(null);
  }, [setCurrentInput, setPreviousOperand, setOperation]);

  const handleDecimalClick = useCallback(() => {
    if (!currentInput.includes('.')) {
      setCurrentInput((prev) => prev + '.');
    }
  }, [currentInput, setCurrentInput]);

  const handlePercentClick = useCallback(() => {
    const currentValue = parseFloat(currentInput);
    setCurrentInput(String(currentValue / 100));
  }, [currentInput, setCurrentInput]);

  const handleSquareRootClick = useCallback(() => {
    const currentValue = parseFloat(currentInput);
    if (currentValue < 0) {
      setCurrentInput('Error');
    } else {
      setCurrentInput(String(Math.sqrt(currentValue)));
    }
  }, [currentInput, setCurrentInput]);

  const handleEqualsClick = useCallback(() => {
    if (previousOperand === null || operation === null) return;

    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentInput);
    let result;

    switch (operation) {
      case '÷':
        if (current === 0) {
          result = 'Error';
        } else {
          result = prev / current;
        }
        break;
      case '×':
        result = prev * current;
        break;
      case '−':
        result = prev - current;
        break;
      case '+':
        result = prev + current;
        break;
      default:
        return;
    }

    setCurrentInput(String(result));
    setOperation(null);
    setPreviousOperand(null);
  }, [
    currentInput,
    previousOperand,
    operation,
    setCurrentInput,
    setOperation,
    setPreviousOperand,
  ]);

  const handleOperationClick = useCallback(
    (newOperation) => {
      if (currentInput === '0' && previousOperand === null) return;

      if (previousOperand !== null) {
        handleEqualsClick();
      }

      setPreviousOperand(currentInput);
      setOperation(newOperation);
      setCurrentInput('0');
    },
    [
      currentInput,
      previousOperand,
      handleEqualsClick,
      setCurrentInput,
      setPreviousOperand,
      setOperation,
    ]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      if (/[0-9]/.test(key)) {
        event.preventDefault();
        handleNumberClick(parseInt(key));
      } else if (key === '.') {
        event.preventDefault();
        handleDecimalClick();
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        event.preventDefault();
        handleClearClick();
      } else if (key === '/' || key === '÷') {
        event.preventDefault();
        handleOperationClick('÷');
      } else if (key === '*' || key === '×') {
        event.preventDefault();
        handleOperationClick('×');
      } else if (key === '-' || key === '−') {
        event.preventDefault();
        handleOperationClick('−');
      } else if (key === '+' || key === 'Add') {
        event.preventDefault();
        handleOperationClick('+');
      } else if (key === '=') {
        event.preventDefault();
        handleEqualsClick();
      } else if (key === '%') {
        event.preventDefault();
        handlePercentClick();
      } else if (key === 's' || key === 'S') {
        event.preventDefault();
        handleSquareRootClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    handleClearClick,
    handleDecimalClick,
    handleEqualsClick,
    handleNumberClick,
    handleOperationClick,
    handlePercentClick,
    handleSquareRootClick,
  ]);

  return (
    <div className="shadow-2xl shadow-slate-600 p-5 bg-white rounded-xl">
      <div className="bg-gray-100 rounded-lg p-3 mb-6 shadow-sm">
        <div className="text-base text-gray-500 text-right mb-1 min-h-[1.5rem]">
          {previousOperand !== null
            ? `${formatDisplay(previousOperand)} ${operation || ''}`
            : '\u00A0'}
        </div>
        <div className="text-5xl text-right">{formatDisplay(currentInput)}</div>
      </div>
      <div className="grid grid-rows-5 grid-cols-4 gap-3">
        {/* C, %, √, ÷ */}
        <CalculatorButton
          className="bg-red-100 text-red-400 row-start-1 col-start-1 col-span-1 aspect-square"
          onClick={handleClearClick}
        >
          <span className="-translate-x-[1px] -translate-y-[1px]">C</span>
        </CalculatorButton>
        <CalculatorButton
          className="row-start-1 col-start-2 col-span-1"
          onClick={handlePercentClick}
        >
          <span className="-translate-y-[1px]">%</span>
        </CalculatorButton>
        <CalculatorButton
          className="row-start-1 col-start-3 col-span-1"
          onClick={handleSquareRootClick}
        >
          <span className="-translate-y-[1px]">√</span>
        </CalculatorButton>
        <CalculatorButton
          className="row-start-1 col-start-4 col-span-1 bg-orange-400 text-white"
          onClick={() => handleOperationClick('÷')}
        >
          <span className="-translate-y-[2px]">÷</span>
        </CalculatorButton>

        {/* 1, 2, 3, x */}
        {Array.from({ length: 3 }, (_, i) => i + 1).map((i) => (
          <CalculatorButton key={i} onClick={() => handleNumberClick(i)}>
            {i}
          </CalculatorButton>
        ))}
        <CalculatorButton
          className="row-start-2 col-start-4 col-span-1 bg-orange-400 text-white"
          onClick={() => handleOperationClick('×')}
        >
          <span className="-translate-y-[2px]">×</span>
        </CalculatorButton>

        {/* 4, 5, 6, - */}
        {Array.from({ length: 3 }, (_, i) => i + 4).map((i) => (
          <CalculatorButton key={i} onClick={() => handleNumberClick(i)}>
            {i}
          </CalculatorButton>
        ))}
        <CalculatorButton
          className="row-start-3 col-start-4 col-span-1 bg-orange-400 text-white"
          onClick={() => handleOperationClick('−')}
        >
          <span className="-translate-y-[2px]">−</span>
        </CalculatorButton>

        {/* 7, 8, 9, + */}
        {Array.from({ length: 3 }, (_, i) => i + 7).map((i) => (
          <CalculatorButton key={i} onClick={() => handleNumberClick(i)}>
            {i}
          </CalculatorButton>
        ))}
        <CalculatorButton
          className="row-start-4 col-start-4 col-span-1 bg-orange-400 text-white"
          onClick={() => handleOperationClick('+')}
        >
          <span className="-translate-y-[2px]">+</span>
        </CalculatorButton>

        {/* 0, ., = */}
        <CalculatorButton
          className="row-start-5 col-start-1 col-span-2"
          onClick={() => handleNumberClick(0)}
        >
          0
        </CalculatorButton>
        <CalculatorButton onClick={handleDecimalClick}>.</CalculatorButton>
        <CalculatorButton
          className="row-start-5 col-start-4 col-span-1 bg-green-400 text-white"
          onClick={handleEqualsClick}
        >
          <span className="-translate-y-[2px]">=</span>
        </CalculatorButton>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-linear-to-br from-slate-800 to-slate-950  h-dvh w-full flex items-center justify-center relative overflow-clip">
      <div className="w-[600px] h-[800px] absolute right-0 translate-x-1/2 translate-y-[200px] bg-slate-800 rounded-full blur-[150px]"></div>
      <Calculator />
    </div>
  );
}

export default App;
