import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// const UPLOAD_PRESET = "unsigned_avatar_upload";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 const navigate=useNavigate()
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

  const addAvatarToUser = async (file, userId) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "nike_product_comment"); // Preset đã tạo trên Cloudinary
  
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dovbpv8ul/image/upload",
        formData
      );
  
      const avatarUrl = uploadRes.data.secure_url;
  
      await axios.patch(`http://localhost:3000/users/${userId}`, {
        avatar: avatarUrl,
      });
  
      return avatarUrl;
    } catch (error) {
      console.error("Lỗi khi thêm avatar:", error);
      return null;
    }
  };
  
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const imageUrl = await addAvatarToUser(file, user.id);
    if (imageUrl) {
      setUser((prev) => ({ ...prev, avatar: imageUrl }));
      toast.success("Cập nhật avatar thành công");
    } else {
      toast.error("Không thể cập nhật avatar");
    }
  };
  
  if (loading) return <div className="text-center py-10">Đang tải thông tin...</div>;
  if (!user) return <div className="text-center py-10">Không tìm thấy người dùng.</div>;

  return (
    <div className="max-w-screen-2xl px-10 py-10 mx-auto  ">
    <div className="flex gap-6 items-center mb-6">
    <div
  className="relative w-24 h-24 border border-dashed border-gray-400 rounded-full overflow-hidden group cursor-pointer"
  onClick={() => navigate("/setting")}
>
  {user.avatar ? (
    <img
      src={user.avatar}
      alt="avatar"
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-4xl text-gray-400">
      +
    </div>
  )}
</div>


  <div className="leading-tight">
    <p className="text-3xl inter">{user.firstname} {user.lastname}</p>
    <p className="text-sm text-gray-500">
  Nike Member Since{" "}
  {user.createdAt
    ? new Date(user.createdAt).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Chưa cập nhật"}
</p>

  </div>
</div>

      {user.avatar && (
          <label className="absolute bottom-0 right-0 bg-white px-2 py-1 text-xs rounded cursor-pointer shadow">
            Đổi
            <input type="file" hidden onChange={handleAvatarChange} />
          </label>
        )}

      
     
    
     
        {/* <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Số điện thoại:</strong> {user.phone || "Chưa cập nhật"}</p>
        <p><strong>Địa chỉ:</strong> {user.address || "Chưa cập nhật"}</p> */}
     <div className="flex justify-between">
      <p className="text-2xl py-8">Interests</p>
      <p className="inter cursor-pointer">Edit</p>
     </div>
     <div>
      <p>Add your interests to shop a collection of products that are based on what you're into.</p>
     </div>
     
    </div>
  );
};

export default Profile;
