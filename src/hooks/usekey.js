import {useEffect, useState} from 'react'
import keyRoute from '../api/route'

const usekey =  () => {

    const [key, setKey] = useState('')
    const [state, setState] = useState({});

    useEffect(() => {
        getKey()
        return () => {
            setState({}) // This worked for me
          }
    }, [])

    const getKey = async () => {
        try {
            const response = await keyRoute.get('/publishableKey')
            setKey(response.data)
        } catch (err) {
            console.error(err)
        }

        console.log('useKey: ', key)
    }

    return {key, getKey}
 
}

export default usekey