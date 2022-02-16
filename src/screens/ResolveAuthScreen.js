import { useEffect, useContext } from 'react'
// import { Context as AuthContext } from '../context/reducers/AuthContext'
import useAuth from '../hooks/useAuth'

const ResolveAuthScreen = () => {
  // const { tryLocalSignin } = useContext(AuthContext)

  const {tryLocalSignIn} = useAuth()


  useEffect(() => {
    tryLocalSignIn()
  }, [])

  return null
}

export default ResolveAuthScreen
