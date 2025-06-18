import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Interest from './../../components/user/profile/Interest';
import MemberBenefit from './../../components/user/profile/MemberBenefit';
import NikeApps from './../../components/user/profile/NikeApps';
import ProductSkeleton from './../../components/user/etc/ProductSkeleton';

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
  
  if (loading) return <div className="">
    <ProductSkeleton />
  </div>;
  if (!user) return <div className="text-center py-10">Không tìm thấy người dùng.</div>;

  return (
  <div>
     <div className="hidden sm:block">
     <div className="max-w-screen-2xl px-6 sm:px-10 py-10  mx-auto  ">
      <div className="flex gap-4 mb-10">
      <p className="inter text-gray-400">Profile</p>
      <p className="inter">Inbox</p>
      <p className="inter">Orders</p>
      <p className="inter">Favourites</p>
      <p className="inter">Settings</p>
      </div>
    <div className="flex gap-6 items-center mb-6">
    <div
  className="relative w-20 h-20 sm:w-24 sm:h-24 border border-dashed border-gray-400 rounded-full overflow-hidden group cursor-pointer"
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

      
     
    
     
       
     <div className="flex justify-between">
      <p className="text-2xl py-8">Interests</p>
      <p className="inter cursor-pointer">Edit</p>
     </div>
     <div>
      <p>Add your interests to shop a collection of products that are based on what you're into.</p>
     </div>
     
    </div>
   </div>
   <div className="block sm:hidden">
    <div className="max-w-screen-2xl px-6 pt-8 ">
    {/* <div className="flex gap-4 py-10 overflow-auto hide-scrollbar">
      <p className="inter ">Profile</p>
      <p className="inter text-gray-400">Inbox</p>
      <p className="inter text-gray-400">Orders</p>
      <p className="inter text-gray-400">Favourites</p>
      <p className="inter text-gray-400">Settings</p>
      </div> */}
      <div className="flex justify-center">
  <div className="flex flex-col items-center text-center">
    <div
      className="w-24 h-24 border-gray-400 rounded-full overflow-hidden group cursor-pointer"
      onClick={() => navigate("/setting")}
    >
      {user.avatar ? (
        <img
          src={user.avatar}
          alt="avatar"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[#E5E5E5]">
        </div>
      )}
    </div>
    <div className=" py-3">
      <p className="text-3xl inter">{user.firstname} {user.lastname}</p>
      <p className=" text-gray-500">
        Nike Member Since{" "}
        {user.createdAt
          ? new Date(user.createdAt).toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })
          : "Chưa cập nhật"}
      </p>
    </div>
    <button className="border rounded-full flex gap-2 items-center border-gray-400 cursor-pointer inter hover:border-black  px-4 py-2">
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none"><path stroke="currentColor" stroke-width="1.5" d="M12.75 13.5h4.5m1.5 0h1.5m-7.5 3h1.5m6 3H16.5v-3h3.75m-15.75-6h6v-6h-6v6zm0 9h6v-6h-6v6zm9-9h6v-6h-6v6z"></path></svg>
      View Member Pass</button>
  </div>
  
</div>
<Interest />
<div className="space-y-8">

<MemberBenefit />
<NikeApps />
</div>

    </div>
   </div>
  </div>
  );
};

export default Profile;
