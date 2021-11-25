import {useState, useContext} from 'react'
import {Context as AuthContext} from '../context/reducers/AuthContext'
import orderRoute from '../api/route'
 
const useOrders = () => {

    const {addOrder} = useContext(AuthContext)
    // const orderList = []
    const [orderList, setOrderList] = useState ([])
    
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
        console.log('FOUND ORDER!!: ', foundOrder )
        let response

        if(foundOrder.length > 0) {

            const totalQuantity = foundOrder[0].quantity + orderItem.quantity

            foundOrder[0].quantity = totalQuantity
            
            // console.log('UPDATE PATH: ', path+foundOrder[0].id)
            try {
                response = await orderRoute.put(path+foundOrder[0].id, foundOrder[0])
            } catch (err) {
                console.log('Update error: ', err)
            }
            
            // console.log("RESPONSE DATA: ", response.data)
            
            // console.log("RESPONSE DATA[0]: ", response.data[0])
            updateOrderList(response.data)
        } else {

            try {
                response = await orderRoute.post(path, orderItem)
            } catch (err) {
                console.log('Post error: ', err)
            }
           

            // console.log('response.data: ', response.data)

            addToOrderList(response.data)
        }
    }

    const addToOrderList = (order) => {
            setOrderList(prev => [...prev, order])
            console.log('addToOrderList orderList: ', orderList)

    }

    const updateOrderList = (order) => {
        // console.log('UPDATED ORDER: ', order)
        
        ////////   need to use setOrderList here: /////////////////
        orderList.find(orderItem => orderItem.prod_id === order[0].prod_id).quantity = order[0].quantity
        
        // console.log('Updated orderList: ', orderList)
    }

    const isInOrderList = (order) => {
        // console.log('isInOrderList orderList: ', orderList)
        console.log('isInOrderList order: ', order)
        const foundId = orderList.filter(orderId=>orderId.prod_id === order.prod_id)

        // foundId.length > 0 ? foundId : orderList.push(order)
        console.log('foundId: ', foundId)
        return foundId
    }

    return {addItem}
}

export default useOrders
