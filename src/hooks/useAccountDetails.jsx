import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useToast from './useToast';

const useAccountDetails = () => {
  const { successToast, errorToast } = useToast();
  const [user, setUser] = useState(null);

  const [email, setEmail] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");

  const [password, setPassword] = useState("");
  const [originalPassword, setOriginalPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [originalPhone, setOriginalPhone] = useState("");

  const [address, setAddress] = useState("");
  const [originalAddress, setOriginalAddress] = useState("");

  const [district, setDistrict] = useState("");
  const [originalDistrict, setOriginalDistrict] = useState("");

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

  const navigate = useNavigate();

  // Lấy user từ API
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

          setAddress(res.data.address || "");
          setOriginalAddress(res.data.address || "");

          setDistrict(res.data.district || "");
          setOriginalDistrict(res.data.district || "");

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
        }
      } catch (error) {
        errorToast("Failed to fetch user");
      }
    };

    fetchUser();
  }, []);

  // Cập nhật thông tin
  const handleUpdate = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const dobStr = `${dateOfBirth.year}-${dateOfBirth.month}-${dateOfBirth.day}`;
      const updatedUser = {
        ...user,
        email,
        password,
        phone,
        address,
        district,
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
      setOriginalAddress(address);
      setOriginalDistrict(district);
      setOriginalDob(dateOfBirth);

      successToast("The information has been updated.");
    } catch (error) {
      errorToast("Failed to update information");
    }
  };

  // Xóa tài khoản
  const handleDelete = async () => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.delete(`http://localhost:3000/users/${userId}`);
      localStorage.clear();
      successToast("The account has been deleted.");
      navigate("/");
    } catch (error) {
      errorToast("Account deletion failed");
    }
  };

  const isChanged =
    email !== originalEmail ||
    password !== originalPassword ||
    phone !== originalPhone ||
    address !== originalAddress ||
    district !== originalDistrict ||
    JSON.stringify(dateOfBirth) !== JSON.stringify(originalDob);

  return {
    user,
    email,
    setEmail,
    password,
    setPassword,
    phone,
    setPhone,
    address,
    setAddress,
    district,
    setDistrict,
    dateOfBirth,
    setDateOfBirth,
    handleUpdate,
    handleDelete,
    isChanged,
  };
};

export default useAccountDetails;
