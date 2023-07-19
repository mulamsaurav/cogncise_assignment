import { StyleSheet, Image, View,SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import React,{useEffect, useState} from 'react'
import GobackHeader from '../components/GobackHeader/GobackHeader'
import { height, width } from '../constant/index.js'
import { Avatar } from '@rneui/themed'
import CustomInput from '../components/Input/CustomInput';
import CustomButton from '../components/Button/CustomButton'
import { retrieveUserSession } from '../../utils/storeUser'
import { fetchData } from '../hooks/fetchData'
import { isValid } from '../../utils/supportFunctions.js'
import { useNavigation } from '@react-navigation/native'
import Loader from '../components/Loader/Loader'

interface FormDetails {
  fname: string;
  lname:string;
  email: string;
  password: string;
  c_password: string;
}
interface ErrorDetails {
  fname: string;
  lname: string;
}


const Profile = () => {
  const navigation = useNavigation()
     const [imageUri, setImageUri] = useState<string>(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_xdDre4lqxczG2sdZ73IGUPaQlA4B0p9RhQdgkRbnCg&s',
  );

  const [formDetails, setFormDetails] = useState<FormDetails>({
    fname: '',
    lname:'',
    email: '',
    password: '',
    c_password: '',
  });
  const [errors,setErrors] = useState<ErrorDetails>({fname:'',lname:''})
  const [loading,setLoading] = useState<boolean>(false)

  useEffect(()=>{
    fetchUserData()
  },[])
  
  const fetchUserData = async() => {
    const userToken = await retrieveUserSession('registerSession');
    const response = await fetchData({ url: `users/${userToken?.id}`, method: 'GET' });
    const data = response.data;
    if(!data){
      return Alert.alert("ALERT!", "User data not found")
    }
    setImageUri(data?.avatar)
    setFormDetails(prevState => ({...prevState, email: data?.email,fname:data?.first_name,lname:data?.last_name}));
  }

  const handleInputChange = (field:string, value:string) => {
    setFormDetails(prevState => ({...prevState, [field]: value}));
  };

  const handleUpdateBtn = async() => {
    const userToken = await retrieveUserSession('registerSession');
    try {
      let obj = {
        fname: isValid('First Name', formDetails.fname),
        lname: isValid('Last Name', formDetails.lname),
      };
      if (Object.values(obj).filter(e => e !== '').length > 0)
        return setErrors(obj);
        setErrors({fname:'',lname:''});

        const data = { "first_name":formDetails.fname,"last_name": formDetails.lname };
          setLoading(true);
        const response = await fetchData({ url: `users/${userToken?.id}`, method: 'PUT', data });
        setLoading(false)
        if(response.error){
            Alert.alert('ALERT!',response.error,[
          {
            text: 'OK', 
            // onPress: () => Alert.alert('ALERT!','Please try this email:eve.holt@reqres.in and password:cityslicka')
          }
        ]);
        }else{
         
            Alert.alert('ALERT!','Update successful!',[
          {text: 'OK', onPress: () => navigation.replace("Profile")}
        ]);
        }
            
    } catch (err) {
      console.log('error in Signin', err);
    }
  }


  return (
    <SafeAreaView style={{flex:1}}>
      <GobackHeader bg title='Profile'/>
      <Loader visible={loading}/>
       <View style={styles.container}>
        <View style={[styles.profileImageView]}>
            <Avatar
                size={width*0.23}
                rounded
                source={{ uri: imageUri }}
                containerStyle={{ backgroundColor: "grey" ,}}
            >
                <Avatar.Accessory size={width*0.065} name='edit' />
            </Avatar>
        </View>
        <View style={{flex:1}}>
            <CustomInput 
              id='fname' 
              errors={errors?.fname}
              editable={true} 
              placeholder='First Name' 
              iconName='user' 
              iconType='font-awesome' 
              value={formDetails.fname} 
              inputStyle={styles.inputStyle}
              onChangeText={text => handleInputChange('fname', text)}
            />
            <CustomInput 
              id='lname' 
              errors={errors?.lname}
              editable={true} 
              placeholder='Last Name' 
              iconName='user' 
              iconType='font-awesome' 
              value={formDetails.lname} 
              inputStyle={styles.inputStyle} 
              onChangeText={text => handleInputChange('lname', text)}
            />
            <CustomInput id='email' editable={false} placeholder='Email' iconName='email' iconType='font-awesome5' value={formDetails.email} inputStyle={styles.inputStyle} />
            <CustomButton title='Update Profile' btnStyle={styles.btnStyle} onPress={handleUpdateBtn} />
        </View>


       </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
    flex: 1,
    marginHorizontal:width*0.03,
    marginVertical:height*0.2,
    justifyContent: 'center',
  },
  profileImageView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.9,
    padding: 5,
    margin: 5
  },
  inputStyle:{
    width:width*0.8
  },
  btnStyle:{
    width:width*0.4,
    alignSelf:'center'
  }
})