import { symbolName } from "typescript"

interface CounterProps {
  value: string
}

export const CounterDollar: React.FC<CounterProps> = ({value}) => {
  return (
    <div className="bg-white py-2 px-8 border-2 rounded-xl border-black text-3xl md:text-6xl w-full text-center md:mt-4 md:mb-16">
        $ {value} 
    </div>
  )
}

export const CounterChad: React.FC<CounterProps> = ({value}) => {
  return (
    <div className="bg-white py-2 px-8 border-2 rounded-xl border-black text-3xl md:text-6xl w-full text-center md:mt-4 md:mb-16">
        $CHAD {value} 
    </div>
  )
}


 
