import React, { useRef } from 'react'
import { useState } from 'react';
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";


function ProfilePicSelector({ image, setImage }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file)
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setPreview(null)
  }

  const onChooseImage = () => {
    inputRef.current.click()
  }
  return (
    <div className='flex justify-center mb-6'>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
      />

      {!image ? (
        <div className="w-20 h-20 rounded-full bg-indigo-100 flex justify-center items-center relative">
          <LuUser className='text-4xl text-primary' />
          <button type='button' onClick={onChooseImage} className='w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white absolute -bottom-1 -right-1'>
            <LuUpload className='' />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview}
            alt="Profile Photo"
            className='w-20 h-20 object-cover rounded-full'
          />
          <button type='button' onClick={handleRemoveImage} className='w-8 h-8 flex items-center justify-center rounded-full bg-red-700 text-white absolute -bottom-1 -right-1'>
            <LuTrash className='' />
          </button>
        </div>
      )}

    </div>
  )
}

export default ProfilePicSelector