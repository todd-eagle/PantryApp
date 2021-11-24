import {useEffect, useState} from 'react'
import { Context as ProductContext } from '../context/reducers/ProductsContext'
import productRoute from '../api/route'

const useProductList = () => {

    const [list, setList] = useState([])
    const prodIds = []
    const getList = async () => {
        try {
            if(list.length == 0){
                const response = await productRoute.get('/products')
                setList(response.data)
            }
        } catch (err) {
            console.log('err: ', err)
        }
    }

    useEffect(() => {
        getList()
    }, [])

  return {list}
}

export default useProductList
