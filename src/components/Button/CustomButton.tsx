import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react';
import { Button } from '@rneui/themed';
import { COLORS, FONTSIZE, height, normalize, width } from '../../constant/index.js';

type ButtonItemsProps = {
  title: string;
  onPress?: () => void;
  btnStyle?:{},
  titleStyle?:{}
};

const CustomButton = ({title,onPress,btnStyle,titleStyle}: ButtonItemsProps) => {
  return (
      <Button
        title={title}
        loading={false}
        loadingProps={{ size: 'small', color: 'white' }}
        buttonStyle={[styles.container,btnStyle]}
        titleStyle={[styles.text,titleStyle]}
        // containerStyle={styles.container}
        onPress={onPress}
      />
  )
}

export default CustomButton;

const styles = StyleSheet.create({
    container:{
        width:width*0.8,
        height:height*0.06,
        borderRadius:10,
        backgroundColor:COLORS.primary,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontSize:normalize(FONTSIZE.medium),
        fontWeight:'700',
        color:COLORS.white,
    }
})