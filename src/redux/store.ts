import {configureStore,combineReducers} from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';

// const rootReducer = combineReducers({
//   userReducer: userSlice,
// });

// export type RootState = ReturnType<typeof rootReducer>;



export default configureStore({
  reducer: {
    user: userSlice,
  },
});




// export type RootState = ReturnType<typeof >;
