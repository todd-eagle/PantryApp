import { useEffect, useContext } from 'react'
import { Context as AuthContext } from '../context/reducers/AuthContext'

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext)

  useEffect(() => {
    tryLocalSignin()
  }, [])

  return null
}

export default ResolveAuthScreen
