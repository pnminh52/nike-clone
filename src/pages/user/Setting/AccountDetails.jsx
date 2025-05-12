import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PopUpDelete from "../../../components/user/setting/accountDetails/PopUpDelete";
import PopUpPasswordChange from "../../../components/user/setting/accountDetails/PopUpPasswordChange";
import PopUpPhoneChange from "../../../components/user/setting/accountDetails/PopUpPhoneChange"; // Make sure to import PopUpPhoneChange

const AccountDetails = () => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [originalEmail, setOriginalEmail] = useState("");
    const [password, setPassword] = useState("");
    const [originalPassword, setOriginalPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [originalPhone, setOriginalPhone] = useState("");
    const [touched, setTouched] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState({
        day: "",
        month: "",
        year: "",
    });
    const [originalDob, setOriginalDob] = useState({
        day: "",
        month: "",
        year: "",
    });
    const [showPopup, setShowPopup] = useState(false);
    const [showPasswordPopup, setShowPasswordPopup] = useState(false);
    const [showPhonePopup, setShowPhonePopup] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (userId) {
                    const res = await axios.get(`http://localhost:3000/users/${userId}`);
                    const dob = res.data.dateOfBirth?.split("-") || ["", "", ""];

                    setUser(res.data);
                    setEmail(res.data.email);
                    setOriginalEmail(res.data.email);
                    setPassword(res.data.password);
                    setOriginalPassword(res.data.password);
                    setPhone(res.data.phone);
                    setOriginalPhone(res.data.phone);
                    setDateOfBirth({
                        day: dob[2] || "",
                        month: dob[1] || "",
                        year: dob[0] || "",
                    });
                    setOriginalDob({
                        day: dob[2] || "",
                        month: dob[1] || "",
                        year: dob[0] || "",
                    });
                } else {
                    toast.error("Không tìm thấy thông tin người dùng");
                }
            } catch (error) {
                toast.error("Không thể tải thông tin người dùng");
            }
        };

        fetchUser();
    }, []);

    const handleUpdate = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const dobStr = `${dateOfBirth.year}-${dateOfBirth.month}-${dateOfBirth.day}`;

            const updatedUser = {
                ...user,
                email,
                password,
                phone,
                dateOfBirth: dobStr,
            };

            const res = await axios.put(
                `http://localhost:3000/users/${userId}`,
                updatedUser
            );
            setUser(res.data);
            setOriginalEmail(email);
            setOriginalPassword(password);
            setOriginalPhone(phone);
            setOriginalDob(dateOfBirth);
            toast.success("Thông tin đã được cập nhật");
        } catch (error) {
            toast.error("Cập nhật thông tin thất bại");
        }
    };

    const handleDelete = async () => {
        try {
            const userId = localStorage.getItem("userId");
            await axios.delete(`http://localhost:3000/users/${userId}`);
            localStorage.clear();
            toast.success("Tài khoản đã được xóa");
            navigate("/");
        } catch (error) {
            toast.error("Xóa tài khoản thất bại");
        }
    };

    const isChanged =
        email !== originalEmail ||
        password !== originalPassword ||
        phone !== originalPhone ||
        JSON.stringify(dateOfBirth) !== JSON.stringify(originalDob);

    return (
        <div>
            <p className="text-xl">Account Details</p>
            {user ? (
                <div className="">
                    {/* Email Field */}
                    <div className="py-4">
                        <div className="relative z-0 w-full group">
                            <input
                                className={`block h-15.5 rounded-lg p-3.5 text-lg w-full text-gray-900 bg-transparent border appearance-none focus:outline-none focus:ring-0 peer`}
                                onBlur={() => setTouched(true)}
                                placeholder=""
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                            />
                            <label
                                htmlFor="text"
                                className={`absolute text-lg inter rounded-lg duration-300 transform -translate-y-4 scale-75 top-1.5 bg-white px-1 z-10 origin-[0] left-3
                                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-4`}
                            >
                                Email*
                            </label>
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="flex justify-between items-center">
                        <div className="w-full">
                            <label className="block inter">Password</label>
                            <div className="flex justify-between items-center py-4">
                                <p className="text-xs">{"•".repeat(password.length)}</p>
                                <button
                                    onClick={() => setShowPasswordPopup(true)}
                                    className="text-sm inter underline ml-4 cursor-pointer"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Phone Field */}
                    <div className="">
                        <label className="block inter">Phone Number</label>
                        <div className="flex justify-between items-center py-4">
                            <p>
                                <span>(+84) </span>
                                {phone}
                            </p>
                            <button
                                onClick={() => setShowPhonePopup(true)}
                                className="text-sm inter underline ml-4 cursor-pointer"
                            >
                                Edit
                            </button>
                        </div>
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <div>
                            <label className="block inter">Date of Birth</label>
                            <div className="flex gap-2 py-4">
                                {/* Day */}
                                <select
                                    value={dateOfBirth.day}
                                    onChange={(e) =>
                                        setDateOfBirth({ ...dateOfBirth, day: e.target.value })
                                    }
                                    className="border p-2 w-20"
                                    disabled={
                                        dateOfBirth.year && dateOfBirth.month && dateOfBirth.day
                                    } // Disable if dateOfBirth is not empty
                                >
                                    <option value="">Day</option>
                                    {[...Array(31)].map((_, index) => (
                                        <option key={index} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))}
                                </select>

                                {/* Month */}
                                <select
                                    value={dateOfBirth.month}
                                    onChange={(e) =>
                                        setDateOfBirth({ ...dateOfBirth, month: e.target.value })
                                    }
                                    className="border p-2 w-20"
                                    disabled={
                                        dateOfBirth.year && dateOfBirth.month && dateOfBirth.day
                                    } // Disable if dateOfBirth is not empty
                                >
                                    <option value="">Month</option>
                                    {[...Array(12)].map((_, index) => (
                                        <option key={index} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))}
                                </select>

                                {/* Year */}
                                <select
                                    value={dateOfBirth.year}
                                    onChange={(e) =>
                                        setDateOfBirth({ ...dateOfBirth, year: e.target.value })
                                    }
                                    className="border p-2 w-24"
                                    disabled={
                                        dateOfBirth.year && dateOfBirth.month && dateOfBirth.day
                                    } // Disable if dateOfBirth is not empty
                                >
                                    <option value="">Year</option>
                                    {Array.from({ length: 100 }, (_, index) => (
                                        <option
                                            key={index}
                                            value={new Date().getFullYear() - index}
                                        >
                                            {new Date().getFullYear() - index}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Delete Account */}
                    <div className="py-6">
                        <div className="flex justify-between items-center border-t border-b border-gray-400 py-6">
                            <p className="inter">Delete Account</p>
                            <button
                                onClick={() => setShowPopup(true)}
                                className=" bg-white cursor-pointer border text-black rounded-full border-gray-400 hover:border-black px-4 py-1.5 "
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className=" text-right">
                        <button
                            onClick={handleUpdate}
                            className={`rounded-full inter  px-4 py-1.5 ${isChanged
                                    ? "bg-black text-white"
                                    : "text-[#CDCDCE] bg-[#E5E5E5] cursor-not-allowed"
                                }`}
                            disabled={!isChanged}
                        >
                            Save
                        </button>
                    </div>

                    {/* Popups */}
                    <PopUpDelete
                        isOpen={showPopup}
                        onClose={() => setShowPopup(false)}
                        onConfirm={handleDelete}
                    />
                    <PopUpPasswordChange
                        isOpen={showPasswordPopup}
                        onClose={() => setShowPasswordPopup(false)}
                        currentPassword={password}
                        onSave={async (newPassword) => {
                            setPassword(newPassword);
                            setOriginalPassword(newPassword);
                            setShowPasswordPopup(false);
                            await handleUpdate();
                        }}
                    />
                    <PopUpPhoneChange
                        isOpen={showPhonePopup}
                        onClose={() => setShowPhonePopup(false)}
                        currentPhone={phone}
                        onSave={async (newPhone) => {
                            setPhone(newPhone);
                            setOriginalPhone(newPhone); // Cập nhật gốc luôn để không hiển thị "Save Changes"
                            setShowPhonePopup(false);

                            try {
                                const userId = localStorage.getItem("userId");
                                const dobStr = `${dateOfBirth.year}-${dateOfBirth.month}-${dateOfBirth.day}`;
                                const updatedUser = {
                                    ...user,
                                    email,
                                    password,
                                    phone: newPhone,
                                    dateOfBirth: dobStr,
                                };
                                const res = await axios.put(
                                    `http://localhost:3000/users/${userId}`,
                                    updatedUser
                                );
                                setUser(res.data);
                                toast.success("Số điện thoại đã được cập nhật");
                            } catch (error) {
                                toast.error("Cập nhật số điện thoại thất bại");
                            }
                        }}
                    />
                </div>
            ) : (
                <p>Đang tải thông tin...</p>
            )}
        </div>
    );
};

export default AccountDetails;
