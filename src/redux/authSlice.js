import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  msg: "",
  user: "",
  token: "",
  loading: false,
  error: "",
};

export const signUpUser=createAsyncThunk('signupuser',async(body)=>{
    const res=await fetch(
        "/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            
          },
          body:JSON.stringify(body)
        }
      );
      return await res.json();
     
})
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [signUpUser.pending]:(state,action)=>{
        state.loading=true
    },
    [signUpUser.fulfilled]:(state,{payload:{error,msg}})=>{
        state.loading=false
        if(error){
            state.error=error
        }else{
            state.msg=msg

        }
    },
    [signUpUser.rejected]:(state,action)=>{
        state.loading=true
    },
  },
});
export default authSlice.reducer;
