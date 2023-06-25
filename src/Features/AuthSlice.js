import {createSlice} from '@reduxjs/toolkit'
const initialAuth={
    isAuth:false,
    mynumbers:[],
    number:null
}
export const AuthSlice=createSlice({
    name:'authentication',
    initialState:initialAuth,
    reducers:{
        doAuth:(state,action)=>{
            console.log(action);
         state.number=action.payload
          state.isAuth=true
        },
        removeAuth:(state,action)=>{
          state.isAuth=false;
        },
        addNumber:(state,action)=>{
             state.mynumbers.push(action.payload)
        }
    }
})
export const{doAuth,addNumber,removeAuth}=AuthSlice.actions;
export default AuthSlice.reducer
