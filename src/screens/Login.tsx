import { View, Text, SafeAreaView, StyleSheet, Alert } from 'react-native'
import React,{useState} from 'react'
import { COLORS, width } from '../constant/index'
import GobackHeader from '../components/GobackHeader/GobackHeader'
import CustomButton from '../components/Button/CustomButton'
import CustomInput from '../components/Input/CustomInput'
import { useNavigation } from '@react-navigation/native';
import { isValid } from '../../utils/supportFunctions'
import { fetchData } from '../hooks/fetchData';
import Loader from '../components/Loader/Loader';
import { storeUserSession } from '../../utils/storeUser'
import { useSelector, useDispatch } from 'react-redux';
import {setEmail,setPassword} from '../redux/slices/userSlice'

// Define the interface for the form details
interface FormDetails {
  email: string;
  password: string;
}
interface ErrorDetails {
  email: string;
  password: string;
}

const Login = () => {
  const navigation = useNavigation();
  // const [formDetails, setFormDetails] = useState<FormDetails>({
  //   email: '',
  //   password: '',
  // });
  const [errors,setErrors] = useState<ErrorDetails>({email:'',password:''});
  const [loading,setLoading] = useState<boolean>(false);

  
  
    // Redux toolkit 
    const dispatch = useDispatch();
    const formDetails = useSelector((state) => state.user);

      const handleInputChange = (field: string, value: string) => {
      // Dispatch the appropriate action based on the 'field' parameter
      if (field === 'email') {
        dispatch(setEmail(value));
      } else if (field === 'password') {
        dispatch(setPassword(value)); // Assuming 'age' is a number in the state
      }
  };


  //   const handleInputChange = (field:string, value:string) => {
  //   setFormDetails(prevState => ({...prevState, [field]: value}));
  // };

  const handleSignInUp = async() => {
     try {
      let obj = {
        email: isValid('Email', formDetails.email, 'email'),
        password: isValid('Password', formDetails.password),
      };
      if (Object.values(obj).filter(e => e !== '').length > 0)
        return setErrors(obj);
        setErrors({email:'',password:''});

        const data = { "email":formDetails.email,"password": formDetails.password };
          setLoading(true);
        const response = await fetchData({ url: 'login', method: 'POST', data });
      setLoading(false)
        if(response.error){
            Alert.alert('ALERT!',response.error,[
          {
            text: 'OK', 
            // onPress: () => Alert.alert('ALERT!','Please try this email:eve.holt@reqres.in and password:cityslicka')
          }
        ]);
        }else{
          await storeUserSession('loginSession', {
            email:data.email,
            loginToken:response.token
          });
            Alert.alert('ALERT!','Signin successful!',[
          {text: 'OK', onPress: () => {
              // setFormDetails({email:'',password:''})
              dispatch(setEmail(""));
              dispatch(setPassword(""));
              navigation.navigate("Profile")
            }
          }
        ]);
        }
            
    } catch (err) {
      console.log('error in Signin', err);
    }
}
  return (
    <SafeAreaView style={{flex:1}}>
      <Loader visible={loading} />
        <GobackHeader />
        <View style={{justifyContent:'center',flex:1,marginHorizontal:width*0.05}}>
        <CustomInput id='email' errors={errors.email} placeholder='Email' iconName='email' iconType='font-awesome5' value={formDetails?.email} onChangeText={text => handleInputChange('email', text)}/>
        <CustomInput id='password' errors={errors.password} placeholder='Password' iconName='lock' iconType='font-awesome5' value={formDetails?.password} onChangeText={text => handleInputChange('password', text)} isPassword/>
        <CustomButton title='Sign In' btnStyle={styles.btnStyle} onPress={handleSignInUp}/>
         <Text style={{alignSelf:'center',color:COLORS.black}}>Don't have an Account?<Text style={{color:'blue'}} onPress={()=>navigation.navigate('Register')}> Sign up</Text> </Text>
        </View>
    </SafeAreaView>
  )
}

export default Login;
const styles = StyleSheet.create({
  btnStyle:{
        alignSelf:'center',
        margin:10
    }
})