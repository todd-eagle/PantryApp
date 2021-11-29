import {useState, useContext, useEffect} from 'react'
import {Context as AuthContext} from '../context/reducers/AuthContext'
import orderRoute from '../api/route'
 
const useOrders = () => {
    const {addOrder} = useContext(AuthContext)
    const [orderList, setOrderList] = useState ([])
    

    useEffect(() => {
        orderList.length > 0 ? addOrder(orderList) : null
    }, [orderList])

    const addItem = (arrayObj, userId, number) => {
        
        const order = {
            user_id: userId,
            prod_id: arrayObj.prod_id,
            title: arrayObj.title,
            quantity: number
        }

        getResponse('/cart/', order)

        return order
    }

    const getResponse = async (path, orderItem) => {
        const foundOrder = isInOrderList(orderItem)
        let response

        if(foundOrder.length > 0) {

            const totalQuantity = foundOrder[0].quantity + orderItem.quantity

            foundOrder[0].quantity = totalQuantity
            
            try {
                response = await orderRoute.put(path+foundOrder[0].id, foundOrder[0])
                updateOrderList(response.data)
            } catch (err) {
                console.log('Update error: ', err)
            }

        } else {

            try {
                response = await orderRoute.post(path, orderItem)
                addToOrderList(response.data)

            } catch (err) {
                console.log('Post error: ', err)
            }
        }
    }

    const addToOrderList = (order) => {
        setOrderList(prev => [...prev, order])
        console.log('addToOrderList orderList: ', orderList)
        // addOrder(orderList)

    }

    const updateOrderList = (order) => {
        orderList.find(orderItem => orderItem.prod_id === order[0].prod_id).quantity = order[0].quantity
        const modifiedList = [...orderList]
        setOrderList(modifiedList)

    }

    const isInOrderList = (order) => {
        // console.log('isInOrderList order: ', order)
        const foundId = orderList.filter(orderId=>orderId.prod_id === order.prod_id)
        return foundId
    }

    return {addItem}
}

export default useOrders
