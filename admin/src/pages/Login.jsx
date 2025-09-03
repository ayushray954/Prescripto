import { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { DoctorContex } from '../context/DoctorContext';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setToken,backendUrl} = useContext(AdminContext)
  const {setDToken} = useContext(DoctorContex)
const submitHandler = async (e) => {
  e.preventDefault();
  try {
    if (state === 'Admin') {
      const response = await axios.post(backendUrl + '/api/admin/login',{ email, password });

      if (response.data.success === true) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        toast.success("Login successful!");
      } else {
        toast.error(response.data.message);
      }

    } else {
       const response = await axios.post(backendUrl + '/api/doctor/login',{ email, password });

      if (response.data.success === true) {
        localStorage.setItem('dToken', response.data.token);
        setDToken(response.data.token);
        console.log(response.data.token)
        toast.success("Login successful!");
      } else {
        toast.error(response.data.message);
      }
    }

  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error("An unexpected error occurred.");
    }

    console.error("Login error:", err);
  }
};


  return (
    <form onSubmit={submitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 bg-white rounded-lg shadow-md'>
        <p className='text-2xl font-semibold m-auto'>
          <span className='text-primary'>{state}</span> Login
        </p>

        <div className='w-full'>
          <p>Email</p>
          <input
            onChange={(e)=>setEmail(e.target.value)} value={email}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='email'
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
              onChange={(e)=>setPassword(e.target.value)} value={password}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='password'
          />
        </div>

        <button className='bg-primary text-white w-full py-2 rounded-md text-base mt-4'>
          Login
        </button>
        {
            state==='Admin' ?
            <p>Doctor Login? <span className='text-primary cursor-pointer' onClick={()=>setState('Doctor')}>click here</span></p>:
            <p>Admin Login? <span className='text-primary cursor-pointer' onClick={()=>setState('Admin')}>click here</span></p>
        }
      </div>
    </form>
  );
};

export default Login;
