import React,{useState} from 'react'
import { Input,Button } from 'antd';
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {doAuth,addNumber } from '../../Features/AuthSlice';
const Login = () => {
  const dispatch=useDispatch();
  const data=useSelector((state)=>state.authentication.mynumbers)
  console.log(data);
  const[warning,setWarning]=useState('');
  const[number,setNumber]=useState('');
  const navigate=useNavigate();
  const verify=()=>{
    if(number?.length<10 || number?.length>10){
      setWarning("Please Enter Valid Phone Number")
    }
    else{
      let gotSame=false;
      dispatch(doAuth(number));
      data?.map((item)=>{
        if(item===number){
          gotSame=true;
           navigate('/otp',{state:number});
        }
      })
      if(gotSame===false){
      dispatch(addNumber(number));
      navigate('/otp',{state:number});
      }
    }
  }
  return (
    <div className='log'>
    <div className='logContainer'>
      <div className='logImgContainer'>
       <img className='loginImg'src="https://i.pinimg.com/564x/2e/3f/43/2e3f43d45005cf8bc9f028b8a00abb9d.jpg" alt="Img not found"/>
      </div>
      <div className='loginContainer'>
        <div className='inpContainer'>
      <Input placeholder="Enter your Number" style={{width:200}} onChange={e=>{setNumber(e.target.value);setWarning('')}}/><br/><br/>
      <span style={{color:'red',fontFamily:'Cursive'}}>{warning}</span><br/>
      <Button type="primary" style={{backgroundColor:'green'}} onClick={()=>verify()}>Submit</Button>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Login