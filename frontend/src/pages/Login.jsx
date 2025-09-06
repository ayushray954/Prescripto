import React, { useContext, useEffect, useState } from 'react'
import { AppContex } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token, setToken, backendUrl } = useContext(AppContex);
  const navigate = useNavigate()

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      if (state === 'SignUp') {
        const resp = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (resp.data.success) {
          localStorage.setItem('token', resp.data.token);
          setToken(resp.data.token);
        }
        else {
          toast.error(resp.data.message);
        }
      }
      else{
        const resp = await axios.post(backendUrl + '/api/user/login', {email, password });
        if (resp.data.success) {
          localStorage.setItem('token', resp.data.token);
          setToken(resp.data.token);
        }
        else {
          toast.error(resp.data.message);
        }
      }
    }
    catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <form onSubmit={(e) => submitHandle(e)} className='flex items-center justify-center min-h-[80vh]'>
      <div className='border border-gray-300 md:w-[400px] w-auto h-auto px-4 rounded-md shadow-md text-zinc-600 py-6 m-auto' >
        <div className=''>
          <p className='text-2xl font-semibold'>{state === 'SignUp' ? 'Create Account' : 'Login'}</p>
          <p>Please {state === 'SignUp' ? 'sign' : 'login'} up to book appointment</p>
        </div>
        <div className='flex flex-col gap-4 pt-4'>
          {
            state === 'SignUp' && <div>
              <label id='name'>Full Name</label>
              <input className='border border-zinc-300 rounded-md w-full p-2 mt-1 ' onChange={(e) => setName(e.target.value)} required value={name} type='text' id='name' />
            </div>
          }
          <div>
            <label id='Email'>Email</label>
            <input className='border border-zinc-300 rounded-md w-full p-2 mt-1 ' onChange={(e) => setEmail(e.target.value)} required value={email} type='text' id='Email' />
          </div>
          <div>
            <label id='Password'>Password</label>
            <input className='border border-zinc-300 rounded-md w-full p-2 mt-1 ' onChange={(e) => setPassword(e.target.value)} required value={password} type='text' id='Password' />
          </div>
        </div>
        <button type='submit' className='p-2 mt-5 bg-primary text-white rounded-md w-full'>{state === 'SignUp' ? 'Create Account' : 'Login'}</button>
        <div className='mt-4'>
          {
            state === 'SignUp' ?
              <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary cursor-pointer underline'>Login here</span></p> :
              <p>Create a new account? <span onClick={() => setState('SignUp')} className='text-primary cursor-pointer underline'>click here</span></p>
          }
        </div>
      </div>
    </form>
  )
}

export default Login
