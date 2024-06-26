import React from 'react'
import  { useState } from 'react';

import "../styles/Register.scss"

const RegisterPage = () => {
  const [formData,setFormData]= useState({firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
    profileImage: null
  });
   const handleChange= (e) => {
     const {name,value,files}=e.target
     setFormData({
      ...formData,
      [name]:value,
      [name]:name==='profileImage' ? files[0] : value


     })
   }
   return (
    <div className='register'>
      <div className='register_content'>
         <form className="register_content_form">
          <input type="text" 
          placeholder='First Name'
          name='firstName'
          value={formData.firstName}
          onChange={handleChange}
          required
          />
          <input type="text" 
          placeholder='Last Name'
          name='lastName'
          value={formData.lastName}
          onChange={handleChange}
          required
          />
          <input type="email" 
          placeholder='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
          />
          <input type="password" 
          placeholder='Password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          required
          />
          <input type="password" 
          placeholder='Confirm Password'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          />
          <input 
           id='image'
           type="file" 
           name='profileImage' accept='image/*'
           style={{display:"none"}}
           onChange={handleChange}
           required
           />
           <label htmlFor='image'>
            <img src="/assets/addImage.png" alt="add profile pic" />
            <p>Upload Your Photo</p>
           </label>
           <button type='submit'>REGISTER</button>
         </form>
         <a href='/login'>Already Have an account? Log in Here</a>
      </div>
    
    </div>
  )
}

export default RegisterPage;