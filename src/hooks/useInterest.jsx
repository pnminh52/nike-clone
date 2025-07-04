import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const useInterest = () => {
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, updateUser } = useAuth();
  const navigate=useNavigate()

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const res = await axios.get("http://localhost:3000/interest");
        setInterests(res.data);
      } catch (err) {
        console.error("Failed to fetch interests", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterests();
  }, []);

  const saveUserInterests = async (selectedIds) => {
    try {
      const selectedItems = interests.filter((i) => selectedIds.has(i.id));
      const updatedUser = { ...user, interest: selectedItems };

      await axios.patch(`http://localhost:3000/users/${user.id}`, {
        interest: selectedItems,
      });

      updateUser(updatedUser);
      toast.success("Interests updated successfully!");
      navigate(`/profile/${user?.id}`)
    } catch (err) {
      console.error("Failed to save interests", err);
      toast.error("Failed to save interests");
    }
  };

  return { interests, loading, saveUserInterests };
};

export default useInterest;
