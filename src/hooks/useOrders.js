import {useState, useEffect} from 'react'
import orderRoute from '../api/route'
 
const useOrders = (items = null) => {
    const [orderList, setOrderList] = useState ([])
    const [isRemoved, setIsRemoved] = useState(false)

    useEffect(() => {
        items ? setOrderList(items) : null
        // console.log('useEffect OrderList: ', orderList)
    }, [items])

    const addItem = async(arrayObj, userId, number, isModified = false) => {   
        const order = {
            user_id: userId,
            prod_id: arrayObj.prod_id,
            title: arrayObj.title,
            description: arrayObj.description,
            quantity: number,
            image_url: arrayObj.image_url
        }
        await getResponse('/cart/', order, isModified)

        return order
    }

    const removeOrder = async(orderId, orders) => {
        const path =`/cart/${orderId}`
       
        try {
            response = await orderRoute.delete(path)
            removeFromOrderList(orderId, orders)
        } catch (err) {
            console.log('Delete error: ', err)
        }
    }

    //const getResponse = async (path, orderItem, remove = false) => {

    const getResponse = async (path, orderItem, isModified) => {
        const foundOrder = isInOrderList(orderItem)
        let response = null

        //if(foundOrder.length > 0 && remove === false)

        if(foundOrder.length > 0) {
            let totalQuantity = foundOrder[0].quantity + orderItem.quantity
            isModified ? totalQuantity =  orderItem.quantity : totalQuantity
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
        console.log('addToOrderList List: ', orderList)
    }

    const updateOrderList = (order) => {
        orderList.find(orderItem => orderItem.prod_id === order[0].prod_id).quantity = order[0].quantity
        const modifiedList = [...orderList]
        setOrderList(modifiedList)
    }

    const removeFromOrderList = (orderId, orders) => {
        const newList = orders.filter(orders => orders.id !== orderId)
        const modifiedOrdersList = [...newList]
        setOrderList(modifiedOrdersList)
        setIsRemoved(true)

    }

    const isInOrderList = (order) => {
        const foundId = orderList.filter(orderId=>orderId.prod_id === order.prod_id)
        return foundId
    }

    return {addItem, removeOrder, orderList, isRemoved}
}

export default useOrders
