import { cn } from './cn';

function CalculatorButton({ children, className, onClick, ...props }) {
  return <></>;
}

function Calculator() {
  return <div className="bg-white">Create your calculator here!</div>;
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
