import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Interest from './../../components/user/profile/Interest';
import MemberBenefit from './../../components/user/profile/MemberBenefit';
import NikeApps from './../../components/user/profile/NikeApps';
import ProductSkeleton from './../../components/user/etc/ProductSkeleton';
import NavigationBarProfile from './../../components/user/etc/NavigationBarProfile';
import AccountDetails from './Setting/AccountDetails';
import useToast from "../../hooks/useToast";

const Profile = () => {
  const { successToast, errorToast } = useToast();
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
      successToast("Avatar updated successfully");
    } else {
      errorToast("Cannot update avatar");
    }
  };
  
  if (loading) return <div className="">
    <ProductSkeleton />
  </div>;
  if (!user) return <div className="text-center py-10">Không tìm thấy người dùng.</div>;

  return (
  <div>
     <div className="hidden sm:block">
     <div className="max-w-screen-sm py-6  mx-auto  ">
     
    <div className="flex gap-6 items-center mb-6">
    <div
  className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden group
    ${user.avatar ? "ring-2 p-1 ring-black" : "border border-dashed border-gray-300"}`}
>
  <input
    type="file"
    id="avatarInput"
    hidden
    onChange={handleAvatarChange}
  />
  <label htmlFor="avatarInput" className="cursor-pointer w-full h-full block">
    {user.avatar ? (
      <img
        src={user.avatar}
        alt="avatar"
        className="w-full h-full rounded-full object-cover"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-4xl text-gray-400">
        +
      </div>
    )}
  </label>
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

      

      
     
    
     
       
    
     <AccountDetails />
    </div>
   </div>
   <div className="block sm:hidden">
    <div className="max-w-screen-2xl px-6 ">
   <NavigationBarProfile />
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
