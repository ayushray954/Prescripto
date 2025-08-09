import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';


const AddDoctor = () => {
    const [image, setDocImg] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [fees, setFees] = useState('');
    const [about, setAbout] = useState('');
    const [speciality, setSpeciality] = useState('General physician');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const { backendUrl, token } = useContext(AdminContext);

    const onSubmitHandle = async (e) => {
        e.preventDefault();
        try {
            if (!image) {
                return toast.error('Image not selected')
            }
            const formData = new FormData();
            formData.append('image', image);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', Number(fees));
            formData.append('about', about);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

            const res = await axios.post(backendUrl+'/api/admin/add-doctor',formData,{headers:{token}})
            if(res.data.success){
                toast.success('doctor added successfully');
                setDocImg(false);
                setAbout('');
                setAddress1('');
                setAddress2('');
                setDegree('');
                setEmail('');
                setPassword('');
                setName('');
                setFees('');
            }
            else {
                toast.error('doctor not added');
            }
        }
        catch (err) {
            toast.error('something went wrong');
        }
    }

    return (
        <div className="bg-white min-h-screen p-6">
            <form onSubmit={onSubmitHandle} className="max-w-5xl mx-auto bg-white shadow-md rounded-md p-8 border border-gray-200">
                <p className="text-lg font-semibold mb-6">Add Doctor</p>

                <div className="flex items-center gap-4 mb-8">
                    <label htmlFor="doc-img" className="cursor-pointer">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="upload" className="w-20 h-20 object-cover rounded-full border" />
                    </label>
                    <input type="file" id="doc-img" hidden onChange={(e) => setDocImg(e.target.files[0])} />
                    <p className="text-sm text-gray-600">Upload doctor <br /> picture</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-sm mb-1">Doctor name</p>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 border rounded" />
                    </div>

                    <div>
                        <p className="text-sm mb-1">Speciality</p>
                        <select value={speciality} onChange={(e) => setSpeciality(e.target.value)} className="w-full p-2 border rounded">
                            <option value="General physician">General physician</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Pediatricians">Pediatricians</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                            <option value='Gynecologist'>Gynecologist</option>
                        </select>
                    </div>

                    <div>
                        <p className="text-sm mb-1">Doctor Email</p>
                        <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border rounded" />
                    </div>

                    <div>
                        <p className="text-sm mb-1">Education</p>
                        <input type="text" placeholder="Education" value={degree} onChange={(e) => setDegree(e.target.value)} className="w-full p-2 border rounded" />
                    </div>

                    <div>
                        <p className="text-sm mb-1">Doctor Password</p>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 border rounded" />
                    </div>

                    <div>
                        <p className="text-sm mb-1">Address</p>
                        <input type="text" placeholder="Address 1" value={address1} onChange={(e) => setAddress1(e.target.value)} className="w-full p-2 border rounded mb-2" />
                        <input type="text" placeholder="Address 2" value={address2} onChange={(e) => setAddress2(e.target.value)} className="w-full p-2 border rounded" />
                    </div>

                    <div>
                        <p className="text-sm mb-1">Experience</p>
                        <select value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full p-2 border rounded" >
                            <option value="1+ year">1+ years</option>
                            <option value="5+ year">5+ years</option>
                            <option value="10+ year">10+ years</option>
                        </select>
                    </div>

                    <div>
                        <p className="text-sm mb-1">Fees</p>
                        <input type="number" placeholder="Your fees" value={fees} onChange={(e) => setFees(e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                </div>

                <div className="mt-6">
                    <p className="text-sm mb-1">About me</p>
                    <textarea placeholder="Write about yourself" rows="4" value={about} onChange={(e) => setAbout(e.target.value)} className="w-full p-2 border rounded" ></textarea>
                </div>

                <div className="mt-6">
                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                        Add doctor
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDoctor;
