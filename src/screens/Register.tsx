import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native'
import React,{useState} from 'react'
import Button from '../components/Button/CustomButton'
import Input from '../components/Input/CustomInput'
import { COLORS, width } from '../constant/index.js'
import GobackHeader from '../components/GobackHeader/GobackHeader';
import { useNavigation } from '@react-navigation/native'
import { isValid } from '../../utils/supportFunctions.js'
import { fetchData } from '../hooks/fetchData'
import Loader from '../components/Loader/Loader'
import { storeUserSession } from '../../utils/storeUser'

// Define the interface for the form details
interface FormDetails {
  fname: string;
  lname: string;
  email: string;
  password: string;
  c_password: string;
}


const Register = () => {
    const navigation = useNavigation();
    const [formDetails, setFormDetails] = useState<FormDetails>({
    fname: '',
    lname: '',
    email: '',
    password: '',
    c_password: '',
  });
  const [errors,setErrors] = useState<FormDetails>({fname:'',lname:'',email:'',password:'',c_password:''})
  const [loading,setLoading] = useState<boolean>(false);

  const handleInputChange = (field:string, value:string) => {
    setFormDetails(prevState => ({...prevState, [field]: value}));
  };

const handleSignUp = async() => {
     try {
      let obj = {
        fname: isValid('First Name', formDetails.fname,),
        lname: isValid('Last Name', formDetails.lname,),
        email: isValid('Email', formDetails.email, 'email'),
        
        password: isValid('Password', formDetails.password, 'password'),
        c_password: isValid(
          'Confirm Password',
          formDetails.c_password,
          'c_password',
        ),
      };
      if (!obj?.c_password)
        obj.c_password =
          formDetails.password !== formDetails.c_password
            ? "Password doen't match"
            : '';
      if (Object.values(obj).filter(e => e !== '').length > 0)
        return setErrors(obj);
        setErrors({fname:'',lname:'',email:'',password:'',c_password:''});

       const data = { "fname":formDetails.fname, lname:formDetails.lname,"email": formDetails.email,"password": formDetails.password };
       setLoading(true);
        const response = await fetchData({ url: 'register', method: 'POST', data });
        setLoading(false);
        if(response?.error){
            Alert.alert('ALERT!',response.error);
        }else{
            await storeUserSession('registerSession', {
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            id:response.id,
            registerToken:response.token
          });
            Alert.alert('ALERT!','Signup successful!',[
          {text: 'OK', onPress: () => {
            setFormDetails({ 
              fname: '',
              lname: '',
              email: '',
              password: '',
              c_password: '',
            })
              navigation.navigate("Profile")
            }
          }
        ]);
        }
            
    } catch (err) {
      console.log('error in SignUp', err);
    }
}

  return (
    <SafeAreaView style={{flex:1}}>
      <Loader visible={loading} />
        {/* <GobackHeader /> */}
        <View style={{justifyContent:'center',flex:1,marginHorizontal:width*0.05}}>
            <Input id='fname' errors={errors.fname} placeholder='First Name' iconName='user' iconType='font-awesome' value={formDetails.fname} onChangeText={text => handleInputChange('fname', text)} />
            <Input id='lname' errors={errors.lname} placeholder='Last Name' iconName='user' iconType='font-awesome' value={formDetails.lname} onChangeText={text => handleInputChange('lname', text)} />
            <Input id='email' errors={errors.email} placeholder='Email' iconName='email' iconType='font-awesome5' value={formDetails.email} onChangeText={text => handleInputChange('email', text)}/>
            <Input id='password' errors={errors.password} placeholder='Password' iconName='lock' iconType='font-awesome5' value={formDetails.password} onChangeText={text => handleInputChange('password', text)} isPassword/>
            <Input id='c_password' errors={errors.c_password} placeholder='Confirm Password' iconName='lock' iconType='font-awesome5' value={formDetails.c_password} onChangeText={text => handleInputChange('c_password', text)} isPassword/>
            <Button title='Sign Up' btnStyle={styles.btnStyle} onPress={handleSignUp}/>
            <Text style={{alignSelf:'center',color:COLORS.black}}>Already have an Account?<Text style={{color:'blue'}} onPress={()=>navigation.navigate('Login')}> Sign in</Text> </Text>
        </View>
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
    btnStyle:{
        alignSelf:'center',
        margin:10
    }
})