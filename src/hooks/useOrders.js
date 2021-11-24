import {useState, useContext} from 'react'
import {Context as AuthContext} from '../context/reducers/AuthContext'
import orderRoute from '../api/route'
 
const useOrders = () => {

    const {addOrder} = useContext(AuthContext)
    const orderList = []
    
    const addItem = (arrayObj, userId, number) => {
        
        const order = {
            user_id: userId,
            prod_id: arrayObj.prod_id,
            title: arrayObj.title,
            quantity: number
        }

        getResponse('/cart/',order)

        return order
    }

    const getResponse = async (path, orderItem) => {
        const foundOrder = isInOrderList(orderItem)
        let response
        
        // foundOrder ? 
        // response = await orderRoute.put(`${path}/${orderItem.user_id}`, orderItem) :
        // await orderRoute.post(path, orderItem)

        if(foundOrder.length > 0) {
            // response = await orderRoute.put(`${path}/${orderItem.user_id}`, orderItem) 
        } else {
            response = await orderRoute.post(path, orderItem)

            console.log('response.data: ', response.data)

            // orderList.push(response.data)
        }
    }

    const isInOrderList = (order) => {
        const foundId = orderList.filter(orderId=>orderId === order.id)
        foundId.length > 0 ? foundId : orderList.push(order)
        console.log('foundId: ', foundId)
        return foundId
    }

    return {addItem}
}

export default useOrders
