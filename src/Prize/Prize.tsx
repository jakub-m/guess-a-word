import './Prize.css'
import { characters } from './characters'
import { fast1a32 } from "fnv-plus";

interface PrizeProps {
  seed?: string
}

export const Prize = ({seed = "seed"}: PrizeProps) => {
  const i = fast1a32(seed) % characters.length
  return (
    <div className={'prize-fly'}>
      {characters[i]}
    </div>
  )
}
