import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"

const PopUpPasswordChange = ({ isOpen, onClose, currentPassword, onSave }) => {
  const [oldPasswordInput, setOldPasswordInput] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const isChanged =
  oldPasswordInput !== "" && newPassword !== "" && confirmPassword !== "";

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)
  }
const handleCancel=()=>{
  onClose()
}
  const handleSubmit = () => {
    if (!oldPasswordInput || !newPassword || !confirmPassword) {
      toast.error("Vui lòng điền đầy đủ thông tin")
      return
    }

    if (oldPasswordInput !== currentPassword) {
      toast.error("Mật khẩu hiện tại không đúng")
      return
    }

    if (!validatePassword(newPassword)) {
      toast.error("Mật khẩu mới phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số")
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp")
      return
    }

    onSave(newPassword)
    toast.success("Đổi mật khẩu thành công")
  }
  useEffect(() => {
    if (isOpen) {
      setOldPasswordInput("")
      setNewPassword("")
      setConfirmPassword("")
    }
  }, [isOpen])
  
  if (!isOpen) return null



  return (
    <div className='fixed inset-0 bg-black/40 flex justify-center items-center z-50'>
      <div className='relative bg-white py-12 px-10  max-w-lg w-full rounded-3xl'>
      <div className="absolute top-4 right-4">
            <button
              onClick={handleCancel}
              type="button"
              className="w-8 h-8 cursor-pointer bg-gray-200 rounded-full"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M7 17L16.8995 7.10051" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
        <h2 className='text-2xl  mb-4'>Edit Password</h2>

<div className="space-y-4">
<input
  type="password"
  name="current-password-hidden" // tránh dùng "current-password"
  autoComplete="new-password"    // ép trình duyệt không điền
  className={`block h-14 rounded-lg p-3.5 text-lg w-full text-gray-900 bg-transparent border appearance-none focus:outline-none focus:ring-0 peer`}
  value={oldPasswordInput}
  onChange={(e) => setOldPasswordInput(e.target.value)}
  placeholder="Mật khẩu hiện tại"
/>

        <input
          type='password'
          className={`block h-14 rounded-lg p-3.5 text-lg w-full text-gray-900 bg-transparent border appearance-none focus:outline-none focus:ring-0 peer`}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder='Mật khẩu mới'
        />
        <input
          type='password'
          className={`block h-14 rounded-lg p-3.5 text-lg w-full text-gray-900 bg-transparent border appearance-none focus:outline-none focus:ring-0 peer`}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Xác nhận mật khẩu mới'
        />
</div>
<div className="py-8">
<p className="text-gray-500 flex gap-2 items-center"> <svg
            aria-label="Error"
            width="11"
            height="12"
            className="opacity-0"
            viewBox="0 0 11 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.351562 1.35156L9.64823 10.6482" stroke="#757575"></path>
            <path d="M9.64823 1.35156L0.351562 10.6482" stroke="#757575"></path>
          </svg>Password requirements:</p>
<div className="flex gap-2 items-center text-gray-500 "> <svg
            aria-label="Error"
            width="11"
            height="12"
            viewBox="0 0 11 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.351562 1.35156L9.64823 10.6482" stroke="#757575"></path>
            <path d="M9.64823 1.35156L0.351562 10.6482" stroke="#757575"></path>
          </svg><p>Minimum of 8 characters</p></div>
<div className="flex gap-2 items-center text-gray-500 "> <svg
            aria-label="Error"
            width="11"
            height="12"
            viewBox="0 0 11 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.351562 1.35156L9.64823 10.6482" stroke="#757575"></path>
            <path d="M9.64823 1.35156L0.351562 10.6482" stroke="#757575"></path>
          </svg><p>Uppercase, lowercase letters and one number</p></div>





</div>
        <div className='flex justify-end gap-2'>
      
        <button
  onClick={handleSubmit}
  className={`rounded-full inter px-4 py-1.5 ${isChanged ? 'bg-black text-white' : 'text-[#CDCDCE] bg-[#E5E5E5] cursor-not-allowed'}`}
  disabled={!isChanged}
>
Save
</button>


        </div>
      </div>
    </div>
  )
}

export default PopUpPasswordChange
