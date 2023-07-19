import {createSlice,PayloadAction} from '@reduxjs/toolkit';
interface UserState {
  fname: string;
  lname: string;
  email:string;
  password:string;
  c_password:string;
}

const initialState: UserState = {
  fname: '',
  lname: '',
  email:'',
  password:'',
  c_password:''
};

export const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    setFname(state, action: PayloadAction<string>) {
      state.fname = action.payload;
    },
    setLname(state, action: PayloadAction<string>) {
      state.lname = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setC_password(state, action: PayloadAction<string>) {
      state.c_password = action.payload;
    },
  }
});

// Action creators are generated for each case reducer function
export const {setFname,setLname,setEmail,setPassword,setC_password} = userSlice.actions;

export default userSlice.reducer;
