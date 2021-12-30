import {useState, useEffect} from 'react'

const useCount = (num, maxNum = 4) => {

  useEffect(() => {
   setNumber(num)
  }, [num])

  const [number, setNumber] = useState(num)

  // console.log('useCount Number: ', number)

  const add = n => number < maxNum ? setNumber(number + n) : number

  const subtract = n => number > 1 ? setNumber(number - n) : number

  const reset = () => setNumber(1)

  return {number, add, subtract, reset}
}

export default useCount