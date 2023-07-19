import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import icons from '../../constant/icons.js'
import { COLORS, FONTSIZE, height, normalize, width } from '../../constant/index.js'
import { useNavigation } from '@react-navigation/native';


type HeaderProps = {
  bg?: boolean;
  title?:string
  onPress?: () => void;
  isReset?:boolean
};

const GobackHeader = ({bg,isReset,title}:HeaderProps) => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity style={[styles.container,{backgroundColor:bg ? COLORS.primary : 'transparant'}]} onPress={()=> navigation.goBack()}>
     <Image source={icons.back} style={[styles.icon,{tintColor:bg ? COLORS.white : COLORS.black}]}/>
     <Text style={styles.titleStyle}>{title}</Text>
    </TouchableOpacity>
  )
}

export default GobackHeader

const styles = StyleSheet.create({
    container:{
        padding:10,
        flexDirection:'row',
        alignItems:'center',
    },
    icon:{
        width:width*0.08,
        height:height*0.04,
        aspectRatio:1
    },
    titleStyle:{
        color:COLORS.white,
        fontWeight:'700',
        fontSize:normalize(FONTSIZE.medium),
        marginHorizontal:width*0.3
    }
})