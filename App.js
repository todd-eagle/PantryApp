import React from 'react'
import { StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {Provider as AuthProvider} from './src/context/reducers/AuthContext'
import {Provider as CartProvider} from './src/context/reducers/CartContext'
import {navigationRef} from './src/navigationRef'

//screens
import AccountScreen from './src/screens/AccountScreen'
import ProductScreen from './src/screens/ProductScreen'
import StoreScreen from './src/screens/StoreScreen'
import SignupScreen from './src/screens/SignupScreen'
import SigninScreen from './src/screens/SigninScreen'
import CartScreen from './src/screens/CartScreen'
import AddressScreen from './src/screens/AddressScreen'
import ResolveAuthScreen from './src/screens/ResolveAuthScreen'
import PaymentScreen from './src/screens/PaymentScreen'


const App = () => {

  const Tabs = createBottomTabNavigator()
  const AuthStack = createStackNavigator()
  const StoreStack = createStackNavigator()
  const AccountStack = createStackNavigator()
  const ProductStack = createStackNavigator()
  const CartStack = createStackNavigator()
  const AddressStack = createStackNavigator() 
  const PaymentStack = createStackNavigator()
  const Stack = createStackNavigator()
 
  const AuthStackScreens = () =>  (
      <AuthStack.Navigator>
        <AuthStack.Screen name = 'ResolveAuth' component = {ResolveAuthScreen} options={{headerShown: false}}/>
        <AuthStack.Screen name = 'Signup' component = {SignupScreen} options = {{title: 'Sign Up'}} />
        <AuthStack.Screen name = 'Signin' component = {SigninScreen}  options = {{title: 'Sign In'}} />
      </AuthStack.Navigator>
    )
 

  const StoreStackScreen = () =>  (
      <StoreStack.Navigator>
        <StoreStack.Screen name = 'Store' component = {StoreScreen}/>
      </StoreStack.Navigator>
    )

    const AccountStackScreen = () =>  (
      <AccountStack.Navigator>
        <AccountStack.Screen name = 'Account' component = {AccountScreen}/>
      </AccountStack.Navigator>
    )  
  
  const ProductStackScreen = () =>  (
      <ProductStack.Navigator>
        <ProductStack.Screen name = 'Product' component = {ProductScreen}/>
      </ProductStack.Navigator>
    )

  const AddressStackScreen = () => (
      <AddressStack.Navigator>
        <AddressStack.Screen name = 'Address' component = {AddressScreen}/>
      </AddressStack.Navigator>
  )  

  const CartStackScreen = () =>  (
      <CartStack.Navigator>
        <CartStack.Screen name = 'Cart' component = {CartScreen}/>
      </CartStack.Navigator>
    )

  const PaymentStackScreen = () => (
      <PaymentStack.Navigator>
        <PaymentStack.Screen name = 'Payment' component = {PaymentScreen}/>
      </PaymentStack.Navigator>
  )  

  const TabScreens = () => (
    <Tabs.Navigator>
      <Tabs.Screen name = 'Store' component = {StoreStackScreen}/>
      <Tabs.Screen name = 'Account' component = {AccountStackScreen}/>
      <Tabs.Screen name = 'Cart' component = {CartStackScreen}/>
      <Tabs.Screen name = 'Product' component = {ProductStackScreen} options = {{ tabBarButton: () => null }}/>
      <Tabs.Screen name = 'Address' component = {AddressStackScreen} options = {{ tabBarButton: () => null }}/>
      <Tabs.Screen name = 'Payment' component = {PaymentStackScreen} options = {{ tabBarButton: () => null }}/>
    </Tabs.Navigator>
  )

  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer ref={navigationRef}>
        <Stack.Navigator headerMode = 'none'>
          <Stack.Screen name = 'Auth' component = {AuthStackScreens} />
          <Stack.Screen name = 'Tabs' component = {TabScreens}/>
        </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>  
    </AuthProvider>  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App