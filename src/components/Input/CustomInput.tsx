import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Input } from '@rneui/themed';
import { width } from '../../constant/index.js';

type InputItemsProps = {
  id:string;
  isPassword?:boolean;
  errors?:string,
  placeholder: string;
  iconName?:string;
  maxLength?:number;
  iconType?:string;
  value:any;
  onChangeText?: (text: string) => void;
  containerStyle?:{};
  inputStyle?:{};
  editable?:boolean

};


const CustomInput = ({id,editable=true,errors,isPassword,placeholder,iconName,iconType,value,maxLength,onChangeText,containerStyle,inputStyle}:InputItemsProps) => {
  const [secure, setSecure] = useState<boolean>(true);
  return (
    <View style={styles.container}>
        <Input
          id={id}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={[styles.inputStyle,inputStyle]}
          leftIcon={{ type: iconType, name: iconName }}
          errorStyle={{ color: 'red' }}
          errorMessage={errors}
          maxLength={maxLength}
          editable={editable}
          secureTextEntry={secure && isPassword}
          rightIcon={isPassword ? {name:secure ? 'eye': 'eye-off' ,type:'feather',onPress:()=>setSecure(!secure)}: {}}
      />
    </View>
  )
}

export default CustomInput;

const styles = StyleSheet.create({
  container:{
    // flex:1
  },
  inputStyle:{
    width:width*0.8
  }
})