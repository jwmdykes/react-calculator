import { twMerge } from 'tailwind-merge';

function CalculatorButton({ children, className }) {
  return (
    <button
      className={twMerge(
        'bg-gray-100 py-5 aspect-square rounded-3xl shadow-sm hover:brightness-95 hover:cursor-pointer active:brightness-90 text-gray-600 transition-all duration-100 text-3xl',
        className
      )}
    >
      {children}
    </button>
  );
}

function Calculator() {
  return (
    <div className="bg-white p-5 rounded-2xl">
      <div className="text-6xl text-right bg-gray-100 p-3 rounded-xl mb-6">
        0
      </div>
      <div className="grid grid-cols-4 gap-4">
        <CalculatorButton className="bg-red-100 text-red-400">
          C
        </CalculatorButton>
        <CalculatorButton>%</CalculatorButton>
        <CalculatorButton>√</CalculatorButton>
        <CalculatorButton className="bg-orange-400 text-white">
          <div className="-translate-y-[1px]">÷</div>
        </CalculatorButton>
        <CalculatorButton>1</CalculatorButton>
        <CalculatorButton>2</CalculatorButton>
        <CalculatorButton>3</CalculatorButton>
        <CalculatorButton className="text-white bg-orange-400">
          <div className="-translate-y-[1px]">×</div>
        </CalculatorButton>
        <CalculatorButton>4</CalculatorButton>
        <CalculatorButton>5</CalculatorButton>
        <CalculatorButton>6</CalculatorButton>
        <CalculatorButton className="bg-orange-400 text-white">
          <div className="-translate-y-[1px]">−</div>
        </CalculatorButton>
        <CalculatorButton>7</CalculatorButton>
        <CalculatorButton>8</CalculatorButton>
        <CalculatorButton>9</CalculatorButton>
        <CalculatorButton className="bg-orange-400 text-white">
          <div className="-translate-y-[1px]">+</div>
        </CalculatorButton>
        <CalculatorButton className="col-span-2 aspect-auto">
          0
        </CalculatorButton>
        <CalculatorButton>.</CalculatorButton>
        <CalculatorButton className="bg-green-400 text-white">
          <div className="-translate-y-[1px]">=</div>
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
