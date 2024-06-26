import React from 'react'

const RegisterPage = () => {
  return (
    <div className='register'>
      <div className='register_content'>
         <form action="">
          <input type="text" 
          placeholder='First Name'
          name='firstname'
          required
          />
          <input type="text" 
          placeholder='Last Name'
          name='lastname'
          required
          />
          <input type="email" 
          placeholder='Email'
          name='email'
          required
          />
          <input type="password" 
          placeholder='Password'
          name='password'
          required
          />
          <input type="password" 
          placeholder='Confirm Password'
          name='confirmpassword'
          required
          />
          <input type="file" 
           name='profileImage' accept='image/*'
           style={{display:"none"}}
           required
           />
           <label>
            <img src="" alt="" />

           </label>
           
         </form>
         <a href='/login'>Already Have an account?Log in Here</a>
      </div>
    
    </div>
  )
}

export default RegisterPage