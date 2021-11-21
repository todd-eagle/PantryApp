import {useState} from 'react'

const useCount = (num, maxNum = 2) => {

  const [number, setNumber] = useState(num)

  const add = n => number < maxNum ? setNumber(number + n) : number

  const subtract = n => number > 1 ? setNumber(number - n) : number

  return {number, add, subtract}
}

export default useCount
