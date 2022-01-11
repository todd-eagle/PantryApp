import React from 'react'
import { StyleSheet, View, Text, TextInput, FlatList } from 'react-native'
const BaseForm = (props) => {
    const {inputInfo, dropDownInfo, errors, serverErrors, autoCapitalize, autoCorrect} = props
    let {onChangeInputs} = props    
    return (
        <View>
             <FlatList 
                data={inputInfo}
                keyExtractor={inputInfo => inputInfo.id}
                renderItem = {({item}) =>{
                    return <>   
                      {item.label ? <Text>{item.label}</Text> : null }
                      {errors ? <Text>{errors[item.id]}</Text> : null}
                      <TextInput 
                          style = {styles.input}
                          id={ item.id}
                          name={item.id}
                          placeholder={item.placeholder} 
                          autoCapitalize = {autoCapitalize}
                          autoCorrect = {autoCorrect}
                          onChangeText={(text) => {onChangeInputs(item.id, text)}}
                          secureTextEntry = {item.hidePassword ? true : false}
                      />
                    </>
            }}   
         />
          {serverErrors ? <Text>{serverErrors}</Text> : null}
        </View>
       
    )

}
const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

export default BaseForm
