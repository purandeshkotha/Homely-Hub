import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../../store/User/user-action'

const ResetPassword = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useParams()

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }
        await dispatch(resetPassword({ password, passwordConfirm: confirmPassword }, token))
        toast.success("Password reset successfully!")
        navigate("/login")
    }

    return (
        <div className='row wrapper'>
            <div className='col-10 col-lg-5'>
                <form onSubmit={submitHandler}>
                    <h1 className='mb-3'>Reset Password</h1>
                    <div className='form-group'>
                        <label htmlFor='password_field'>New Password</label>
                        <input
                            type='password'
                            id='password_field'
                            className='form-control'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='confirm_password_field'>Confirm Password</label>
                        <input
                            type='password'
                            id='confirm_password_field'
                            className='form-control'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type='submit' className='btn btn-block py-3'>Reset Password</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
