import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"

const PopUpPasswordChange = ({ isOpen, onClose, currentPassword, onSave }) => {
  const [oldPasswordInput, setOldPasswordInput] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)
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
    <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded shadow-lg w-96'>
        <h2 className='text-lg font-semibold mb-4'>Thay đổi mật khẩu</h2>

        <input
  type="password"
  name="current-password-hidden" // tránh dùng "current-password"
  autoComplete="new-password"    // ép trình duyệt không điền
  className="border p-2 w-full mb-3"
  value={oldPasswordInput}
  onChange={(e) => setOldPasswordInput(e.target.value)}
  placeholder="Mật khẩu hiện tại"
/>

        <input
          type='password'
          className='border p-2 w-full mb-3'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder='Mật khẩu mới'
        />
        <input
          type='password'
          className='border p-2 w-full mb-3'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Xác nhận mật khẩu mới'
        />

        <div className='flex justify-end gap-2'>
          <button onClick={onClose} className='px-4 py-2 bg-gray-300 rounded'>Hủy</button>
          <button
            onClick={handleSubmit}
            className='px-4 py-2 bg-blue-500 text-white rounded'
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  )
}

export default PopUpPasswordChange
