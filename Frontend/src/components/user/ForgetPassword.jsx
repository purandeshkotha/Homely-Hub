import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { forgotPassword } from '../../store/User/user-action'
import "../../css/ForgetPassword.css"

const ForgetPassword = () => {
    const [email, setEmail] = useState("")
    const dispatch = useDispatch()

    const submitHandler = async (e) => {
        e.preventDefault()
        await dispatch(forgotPassword(email))
        toast.success("Password reset email sent!")
    }

    return (
        <div className='row wrapper'>
            <div className='col-10 col-lg-5'>
                <form onSubmit={submitHandler}>
                    <h1 className='mb-3'>Forgot Password</h1>
                    <div className='form-group'>
                        <label htmlFor='email_field'>Enter your email</label>
                        <input
                            type='email'
                            id='email_field'
                            className='form-control'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type='submit' className='btn btn-block py-3'>Send Reset Email</button>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword
