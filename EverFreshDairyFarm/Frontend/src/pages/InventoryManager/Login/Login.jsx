import React, { useContext, useState } from 'react';
import { assets } from '../../../assets/assets';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../../../Content/AppContent';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

function Login() {
    const navigate = useNavigate();
    const { setIsLoggedin, getUserData } = useContext(AppContent);

    const [state, setState] = useState('Sign Up');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [NIC, setNIC] = useState('');
    const [workExperience, setWorkExperience] = useState('');
    const [password, setPassword] = useState('');

    const SubmitHandler = async (e) => {
        e.preventDefault();
        try {
            axios.defaults.withCredentials = true;

            if (state === 'Sign Up') {
                const { data } = await axios.post('http://Localhost:8000/inventoryManager/register',{
                    name,
                    NIC,
                    workExperience,
                    email,
                    password
                });
                      
                if (data.success) {
                    setIsLoggedin(true);
                    getUserData();
                    navigate('/');
                } else {
                    alert(data.message);
                }

            } else {
                const { data } = await axios.post('http://localhost:8000/inventoryManager/login', {email,password});

                if (data.success) {
                    setIsLoggedin(true);
                    getUserData();
                    navigate('/');
                } else {
                    alert(data.message);
                }
            }
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
     <Header/> 
        <div className='flex items-center justify-center min-h-screen bg-gray-100'> 
            <div className='bg-green-700 p-10 rounded-[10px] shadow-[0_4px_10px_rgba(0,0,0,0.2)] w-full max-w-[400px] text-indigo-300 text-sm text-center'>
            <h2 className='text-2xl font-semibold text-white mb-[10px]'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
            <p className='mb-5 text-sm'>{state === 'Sign Up' ? 'Create your account' : 'Login to your account'}</p>

            <form onSubmit={SubmitHandler}>
                {state === 'Sign Up' && (
                    <> 
                        <div className='flex items-center gap-2.5 w-full p-2.5 rounded-full bg-[#05491a] mb-[15px]'>
                            <img className='w-[20px]' src={assets.person_icon} alt="" />
                            <input
                                className='flex-1 text-white bg-transparent border-none outline-none'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                type="text"
                                placeholder="Enter the Name"
                                required
                            />
                        </div>

                        <div  className='flex items-center gap-2.5 w-full p-2.5 rounded-full bg-[#05491a] mb-[15px]'>
                            <img className='w-[20px]' src={assets.NIC_icon} alt="" />
                            <input
                                className='flex-1 text-white bg-transparent border-none outline-none'
                                onChange={(e) => setNIC(e.target.value)}
                                value={NIC}
                                type="text"
                                placeholder="Enter the NIC"
                                required
                            />
                        </div>

                        <div className='flex items-center gap-2.5 w-full p-2.5 rounded-full bg-[#05491a] mb-[15px]'>
                            <img className='w-[20px]' src={assets.person_icon} alt="" />
                            <input
                                className='flex-1 text-white bg-transparent border-none outline-none'
                                onChange={(e) => setWorkExperience(e.target.value)}
                                value={workExperience}
                                type="text"
                                placeholder="Enter the work Experience Duration"
                                required
                            />
                        </div>
                    </>
                )}

                <div className='flex items-center gap-2.5 w-full p-2.5 rounded-full bg-[#05491a] mb-[15px]'>
                    <img className='w-[20px]' src={assets.mail_icon} alt="" />
                    <input
                        className='flex-1 text-white bg-transparent border-none outline-none'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"  
                        placeholder="Enter the Email"
                        required
                    />
                </div>

                <div className='flex items-center gap-2.5 w-full p-2.5 rounded-full bg-[#05491a] mb-[15px]'>
                    <img className='w-[20px]' src={assets.lock_icon} alt="" />
                    <input
                        className='flex-1 text-white bg-transparent border-none outline-none'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"  
                        placeholder="Enter the password"
                        required
                    />
                </div>

                <button className=" pt-3 pb-3 pr-6 pl-6  rounded-full bg-gradient-to-r from-[#63f163] to-[#2e8140] text-white font-medium border-none cursor-pointer" type="submit">{state}</button>
            </form>

            {state === 'Sign Up' ? (
                <p className='text-slate-400 text-xs mt-2.5'>
                    Already have an account?{' '}
                    <span className='text-blue-400 underline cursor-pointer' onClick={() => setState('Login')} style={{ cursor: 'pointer', color: 'blue' }}>
                        Login here
                    </span>
                </p>
            ) : (
                <p className='text-slate-400 text-xs mt-2.5'>
                    Don't have an account?{' '}
                    <span className='text-blue-400 underline cursor-pointer' onClick={() => setState('Sign Up')} style={{ cursor: 'pointer', color: 'blue' }}>
                        Sign up
                    </span>
                </p>
            )}
            </div>
        </div>
        <Footer/>
    </div>
    );
}

export default Login;
