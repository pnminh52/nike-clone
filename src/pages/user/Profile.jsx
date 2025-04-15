import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/users/${id}`);
        setUser(res.data);
      } catch (error) {
        toast.error("Không thể tải thông tin người dùng");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <div className="text-center py-10">Đang tải thông tin...</div>;
  if (!user) return <div className="text-center py-10">Không tìm thấy người dùng.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Hồ sơ cá nhân</h1>
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <p><strong>Họ tên:</strong> {user.firstname}</p>
        <p><strong>Họ tên:</strong> {user.lastname}</p>

        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Số điện thoại:</strong> {user.phone || "Chưa cập nhật"}</p>
        <p><strong>Địa chỉ:</strong> {user.address || "Chưa cập nhật"}</p>
      </div>
    </div>
  );
};

export default Profile;
