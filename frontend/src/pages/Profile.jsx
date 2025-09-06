import React, { useContext, useState } from 'react'
import { AppContex } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContex);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  // ✅ format date for <input type="date">
  const formatDateForInput = (date) => {
    if (!date) return '';
    try {
      return new Date(date).toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);

      // ✅ send lowercase "dob" to backend
      formData.append('dob', userData.dob);

      if (image) {
        formData.append('image', image);
      }

      const resp = await axios.post(
        backendUrl + '/api/user/update-profile',
        formData,
        { headers: { token } }
      );

      if (resp.data.success) {
        toast.success(resp.data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="mx-6 py-10 md:mx-24 md:py-20 text-gray-800 font-[sans-serif]">
        {/* Profile Image */}
        <div className="flex flex-col md:flex-row gap-6 items-center mb-8">
          {isEdit ? (
            <label htmlFor="image">
              <div className="inline-block relative cursor-pointer">
                <img
                  className="w-36 rounded opacity-75"
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : userData?.image 
                  }
                  alt="Profile"
                />
                <img
                  className="absolute bottom-2 right-2 w-6 h-6"
                  src={assets.upload_icon}
                  alt="Upload"
                />
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img
              className="w-36 rounded"
              src={userData?.image || assets.default_avatar}
              alt="Profile"
            />
          )}
        </div>

        {/* Name */}
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="text-2xl font-semibold mb-6 border px-2 py-1 rounded w-full max-w-md"
          />
        ) : (
          <p className="text-3xl md:text-4xl font-semibold mb-6">
            {userData.name}
          </p>
        )}

        <hr className="mb-6" />

        {/* Contact Information */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-600 mb-2 uppercase">
            Contact Information
          </p>
          <div className="text-sm space-y-2">
            <div className="flex gap-2">
              <p className="font-medium w-20">Email id:</p>
              <p className="text-blue-600">{userData.email}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-medium w-20">Phone:</p>
              {isEdit ? (
                <input
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="border px-2 py-1 rounded w-full max-w-sm"
                />
              ) : (
                <p className="text-blue-600">{userData.phone}</p>
              )}
            </div>
            <div className="flex gap-2">
              <p className="font-medium w-20">Address:</p>
              {isEdit ? (
                <p className="space-y-2">
                  <input
                    type="text"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    className="border px-2 py-1 rounded w-full max-w-sm"
                  />
                  <br />
                  <input
                    type="text"
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    className="border px-2 py-1 rounded w-full max-w-sm"
                  />
                </p>
              ) : (
                <p>
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div>
          <p className="text-sm font-semibold text-gray-600 mb-2 uppercase">
            Basic Information
          </p>
          <div className="text-sm space-y-3">
            {/* Gender */}
            <div className="flex gap-2 items-center">
              <p className="font-medium w-20">Gender:</p>
              {isEdit ? (
                <select
  value={userData.gender}
  onChange={(e) =>
    setUserData((prev) => ({ ...prev, gender: e.target.value }))
  }
>
  <option value="Not selected">Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
</select>

              ) : (
                <p>{userData.gender}</p>
              )}
            </div>

            {/* Birthday */}
            <div className="flex gap-2 items-center">
              <p className="font-medium w-20">Birthday:</p>
              {isEdit ? (
                <input
                  type="date"
                  value={formatDateForInput(userData.dob)}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  className="border px-2 py-1 rounded"
                />
              ) : (
                <p>
                  {userData.dob
                    ? new Date(userData.dob).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'Not set'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              className="px-4 py-2 border-2 border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition"
            >
              Save information
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-2 border-2 border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default Profile;

