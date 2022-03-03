
import accountRoute from '../api/route'


const useAccounts = () => {

    const insertAddress = async (path, id, address) =>{      
        address.user_id=id
        try {
            const response = await accountRoute.post(path, address)
        } catch (err) {
            console.log('Insert address error: ', err)
        }
    }

    const updateAddress = async (path, id, address) => {
        address.user_id=id
        try {
            const response = await accountRoute.update(path+id, address)
        } catch (err) {
            console.log('Update address error: ', err)
        }
    }

    const checkAddress = async (path, id) => {
        try {
            const response = await accountRoute.get(path+id)
            // console.log('response: ', response.data)
            return response.data
        } catch (err) {
            console.log('Get address error: ', err)
        }
    }

 
    return {insertAddress, updateAddress, checkAddress}
}

export default useAccounts
