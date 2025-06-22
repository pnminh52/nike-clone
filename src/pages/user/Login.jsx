import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useToast from '../../hooks/useToast'; 

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); 
  const [show, setShow]=useState(false);
  const [error, setError]=useState('')
  const [touched, setTouched] = useState(false);
  const { successToast, errorToast, warningToast } = useToast();
  const API_URL = "http://localhost:3000";


  const navigate = useNavigate();

  const handleContinue = async (e) => {
    e.preventDefault();
  
    if (step === 1) {
      if (!email) {
       warningToast('Required');
        return;
      }
  
      // Gọi API để kiểm tra email
      try {
        const res = await fetch(`${API_URL}/users?email=${email}`);
        const data = await res.json();
  
        if (data.length === 0) {
          errorToast("Email không tồn tại");
          return;
        }
  
        // Email hợp lệ, chuyển sang bước 2
        setError('');
        setStep(2);
      } catch (err) {
        console.error(err);
        setError('Lỗi khi kiểm tra email');
      }
    } else {
      if (!password) {
       warningToast('Required');
        return;
      }
      handleSubmit();
    }
  };
  

  const handleSubmit = async () => {
    const user = await login(email, password);
    if (user) {
      if (user.role === "Admin" || user.role === "Staff") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  };
  

  return (
    <form onSubmit={handleContinue} noValidate className="mt-8 max-w-lg px-6 h-200 mx-auto">
      {/* Logo và tiêu đề */}
      <div className="flex items-center gap-2 mb-4">
      <svg
  viewBox="0 0 24 24"
  fill="none"
  width="60px"
  height="60px"
>
  <path
    fill="currentColor"
    d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z"
    style={{ transform: "scale(1.2)", transformOrigin: "center" }}
  />
</svg>
        <svg aria-hidden="true" class="css-132diu7" focusable="false" viewBox="0 0 48 48" role="img" width="48px" height="48px" fill="none" aria-label="jordan-logo" alt-text="jordan-logo"><path fill="currentColor" fill-rule="evenodd" d="M26.363 7.467c-.024-.078-.024-.078-.024-.144a1.933 1.933 0 011.844-2.014 1.94 1.94 0 012.014 1.844 1.927 1.927 0 01-1.834 2.014c-.054.008-.124 0-.202 0-.032.008-.078.008-.112.044-.112.168.28.146-.01.878 0 0 0 .078-.024.156-.024.28-.158 1.124-.192 1.586.058.08.08.1.058.26-.024.212-.102.73-.18 1.068-.08.28-.192.348-.294.404-.146.596-.19 1.09-.562 1.81-.044.552-.09.698-.212.968-.034.798.022.92-.562 2.202-.16.598-.034 1.014.1 1.642.136.642.552.922.596 1.586.102 1.542.034 2.61-.326 3.814l.27.696c.36.168 1.236.652.72 1.35.686.38 1.73.788 2.562 1.562.35.294.698.63 1.024 1 .632.114.552.158 1.012.462 1.35.876 3.498 2.608 4.746 3.812.224.134.294.224.472.326.022.046.034.068.022.078-.054.146-.054.146-.122.282.078.08.19.146.268.214.08.01.08-.012.192-.034.158.146.36.27.428.27.212-.044.168-.01.37-.202.058-.068.168 0 .168 0 .082-.078.226-.236.428-.35.158-.09.462-.09.462-.09.102.012.078.102.056.146-.114.046-.36.114-.494.216-.304.28-.552.706-.552.706.598-.066.968.09 1.438.046.272-.01.474.012.754-.18 0 0 .282-.192.53-.282.236-.1.46-.032.662.126.136.168.236.168 0 .392-.09.09-.202.192-.36.338-.268.248-.628.584-1 .866-.382.28-.798.516-1.056.63-.676.46-.518.348-1.046.788-.058.044-.248.156-.326.212-.214.124-.27.012-.394-.236 0 0-.056-.09-.158-.282-.102-.212-.18-.46-.146-.46-.124-.012-.662-.686-.662-.82-.126-.024-.608-.518-.62-.62l-.428-.36c-.506.09-.618-.224-1.922-1.214-.158-.012-.394-.102-.72-.348-.596-.506-2.014-1.63-2.248-1.766-.26-.134-.562-.268-.766-.428-.292-.044-.436-.1-.596-.134-.158-.044-.28-.114-.652-.158-.606-.09-1.236-.36-1.822-.674-.28-.146-.528-.214-.764-.338-.54-.248-1.012-.472-1.372-.562-.136-.012-.798-.236-1.136-.45-.122-.068-.19-.122-.268-.146-.18-.044-.306.012-.384.044-.46.216-.876.406-1.272.62-.358.18-.696.372-1.056.572-.314.17-.686.338-1.068.508 0 0-1.068.506-1.664.696-.518.394-1.574 1.092-2.214 1.43-.316.146-.934.504-1.216.584-.158.122-.742.516-1.192.842-.36.248-.618.462-.618.462-.214.168-.204.258-.562.09a2.983 2.983 0 00-.258.192c-.282.19-.294.146-.406.134-.202.158-.226.078-.394.258-.122.17 0 .124-.236.214-.056.012-.078.078-.114.112-.188.146-.2.586-.65.608-.27.178-.214.406-.394.382 0 .204-.36.46-.428.46-.584.192-.608-.236-1.292.07-.09.032-.226.144-.394.168-.304.044-.664-.012-.888-.204-.338-.282-.652-.796-.652-.796-.102-.26-.034-.416.326-.664.146-.09.168-.158.416-.168.122-.048.09.02.302-.048.126-.032.126-.01.384-.01.056-.034.134-.044.248-.09.2-.068.392-.124.392-.124s.056-.046.248-.022c.156-.068.338-.158.428-.192-.024-.248.01-.248.122-.348.16-.124.18-.1.294-.022.044-.012.078-.024.054-.068-.02-.146-.122-.214-.09-.494-.044-.114-.122-.258-.098-.348.02-.09.054-.138.11-.158.058-.024.09.012.114.044.056.068.102.27.102.27.01.236.078.518.302.36.134-.124.168-.484.428-.406l.192.17c.168-.146.168-.146.28-.214 0 0-.158-.146-.024-.27.09-.078.216-.134.416-.35.552-.584.844-.84 1.428-1.314a13.622 13.622 0 013.398-1.878c.292-.348.562-.572 1.17-.608.754-1.212 2.17-2.272 2.496-2.44.268-.46.382-.416.73-.494.27-.214.35-.214.46-.428.126-.46-.224-1.72.766-1.754.224-.292.156-.224.392-.496a4.382 4.382 0 01-.236-1c-.01-.032-.392-.314-.258-.664-.158-.2-.46-.652-.538-.864a.403.403 0 01-.126-.024c-.044-.01-.11-.01-.18-.01-.156.392-.326.416-.606.506-.518 1.024-.698 1.462-2.092 2.284-.56.596-.764 1.28-.764 1.268-.102.204-.078.486-.024.642-.09.214-.054.248-.054.248.022.09.112.212.212.224.158.046.338.046.316.236-.022.226-.326.18-.474.146-.55-.1-.37-.46-.73-.348-.282.17-.392.696-.832.618-.056-.044-.034-.146.012-.236.056-.122.168-.236.112-.282-.292.08-.866.248-.866.248-.27.08-.562-.078-.294-.248.126-.044.306-.1.53-.236 0 0 .124-.144-.114-.078a2.288 2.288 0 01-.832.09s-.514-.078-.584-.112c-.056-.044-.122-.214.034-.202.214.012.732-.046 1.126-.134.19-.07.562-.282.764-.372 0 0 .226-.314.36-.382.214-.226.382-.36.562-.596.18-.36.382-.922 1-1.812.282-.404.63-.876 1.068-1.292 0 0 .124-.676.686-1.146a6.53 6.53 0 01.518-.924 3.4 3.4 0 00.212-.336c.182-.26.372-.754 1.036-.822 0 0 .294-.202.394-.348.168-.146.148-.372.282-.518-.214-.212-.732-.618-.766-1.146-.032-.586.168-1.036.53-1.384.392-.37.796-.55 1.292-.516.618.11.732.314.91.516.18.202.26.08.326.292.518.146.496.09.474.472.09.114.212.216.202.428.168-.35.214-.416.686-.798.124-.314.202-.63.302-.956.102-.292.226-.596.306-.82-.08-.652.122-.754.392-1.328-.044-.078-.032-.102-.012-.224.114-.384.272-.866.372-1.192 0 0 .034-.126.17-.126.122-.404.314-1.158.358-1.326.124-.416.058-.574-.02-.82-.024-.08-.012-.18-.058-.272-.134-.246-.28-.584-.382-.82-.056-.146-.158-.708-.158-.708-.01-.124-.01-.18-.01-.18z" clip-rule="evenodd"></path></svg>
      </div>

      <p className="text-3xl mb-0">
        {step === 1
          ? 'Enter your email to join us or sign in.'
          : "What's your password?"}
      </p>
      {step > 1 && (
  <div className="flex items-center  mb-6 gap-1">
    <p className="text-black text-lg">{email}</p>
    <button
      type="button"
      className="text-gray-500 text-lg underline cursor-pointer "
      onClick={() => setStep(1)}
    >
      Edit
    </button>
  </div>
)}


      {step === 1 ? (
       <div className='mt-8'>
        <div className="relative z-0 w-full group">
        <input
  type="text"
  name="text"
  id="text"
  onBlur={() => setTouched(true)}
  className={`block h-15.5 rounded-lg p-3.5 text-lg  w-full text-gray-900 bg-transparent border appearance-none focus:outline-none focus:ring-0 peer 
   `
  }
  placeholder=" "
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

 <label
  htmlFor="text"
  className={`absolute text-lg inter rounded-lg duration-300 transform -translate-y-4 scale-75 top-1.5 bg-white px-1 z-10 origin-[0] left-3
    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-4
  `}
>
  Email*
</label>

</div>
<div>
  <p className=' py-1.5  text-sm'>New to Nike? <span className='underline text-blue-600 cursor-pointer' onClick={()=>navigate("/register")}>Join us</span> now!</p>
</div>
{/* {error && <p className="text-[#D30005] text-sm inter ml-4 mt-1.5">{error}</p>} */}

       </div>
      ) : (
        <div className="relative z-0 w-full group mb-4">
  <input
     type={show ? "text" : "password"}
    name="password"
    onBlur={() => setTouched(true)}
    id="password"
    className={`block h-15.5 rounded-lg p-3.5 text-lg  w-full text-gray-900 bg-transparent border appearance-none focus:outline-none focus:ring-0 peer 
    `
    }    placeholder=" "
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <label
  htmlFor="password"
  className={`absolute text-lg inter rounded-lg duration-300 transform -translate-y-4 scale-75 top-1.5 bg-white px-1 z-10 origin-[0] left-3
    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-4
    `}
>
  Password*
</label>
  <div
        className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        {/* Show icon */}
        {show ? (
          // 👁 Mắt mở
        <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Hide password</title><desc>Created with Sketch.</desc><g id="Icons-/-Forms-/-Password-/-Hide" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Icon/Interface/Eye/Slash/Black"><rect id="Container" x="0" y="0" width="24" height="24"></rect><g id="eye-slash" transform="translate(1.000000, 1.000000)" fill="#000000" fill-rule="nonzero"><path d="M9.94,5.08 C10.2907639,5.02623324 10.6451396,4.99948791 11,5 C14.18,5 17.17,7.29 18.91,11 C18.6438891,11.5645923 18.3433222,12.1122919 18.01,12.64 C17.9041777,12.8038098 17.8485624,12.9949873 17.85,13.19 C17.8545776,13.638491 18.1572094,14.0290749 18.5903469,14.1455097 C19.0234843,14.2619445 19.4811652,14.0757457 19.71,13.69 C20.1759266,12.95793 20.5806338,12.1886518 20.92,11.39 C21.0284252,11.1378274 21.0284252,10.8521726 20.92,10.6 C18.9,5.91 15.1,2.99990136 11,2.99990136 C10.5306669,2.9976351 10.0620847,3.03779929 9.6,3.12 C9.2427344,3.18073514 8.94500919,3.42745566 8.81897458,3.76722432 C8.69293996,4.10699297 8.7577436,4.48819082 8.98897458,4.76722433 C9.22020556,5.04625783 9.58273441,5.18073516 9.94,5.12 L9.94,5.08 Z M2.71,1.29 C2.45634143,1.03634143 2.08662601,0.937276483 1.74012196,1.03012196 C1.39361791,1.12296744 1.12296744,1.39361791 1.03012196,1.74012196 C0.937276483,2.08662601 1.03634143,2.45634143 1.29,2.71 L4.39,5.8 C2.97557308,7.16152828 1.84985681,8.79398692 1.08,10.6 C0.968686852,10.8550505 0.968686852,11.1449495 1.08,11.4 C3.1,16.09 6.9,19 11,19 C12.7971076,18.9875864 14.5517705,18.4525011 16.05,17.46 L19.29,20.71 C19.4777666,20.8993127 19.7333625,21.0057983 20,21.0057983 C20.2666375,21.0057983 20.5222334,20.8993127 20.71,20.71 C20.8993127,20.5222334 21.0057983,20.2666375 21.0057983,20 C21.0057983,19.7333625 20.8993127,19.4777666 20.71,19.29 L2.71,1.29 Z M9.07,10.48 L11.52,12.93 C11.3509866,12.9784661 11.1758132,13.0020472 11,13 C9.8954305,13 9,12.1045695 9,11 C8.99795283,10.8241868 9.02153387,10.6490134 9.07,10.48 L9.07,10.48 Z M11,17 C7.82,17 4.83,14.71 3.1,11 C3.74608887,9.57374827 4.66307117,8.28657682 5.8,7.21 L7.57,9 C6.71601758,10.5586149 6.99283089,12.4937785 8.24952622,13.7504738 C9.50622154,15.0071691 11.4413851,15.2839824 13,14.43 L14.59,16 C13.501093,16.6408815 12.2634245,16.985636 11,17 Z" id="Shape"></path></g></g></g></svg>

        ) : (
          // 👁‍🗨 Mắt gạch (ẩn)
          <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g transform="translate(1, 4)" fill="#000000">
            <path d="M20.92,7.6 C18.9,2.91 15.1,0 11,0 C6.9,0 3.1,2.91 1.08,7.6 C0.968686852,7.85505046 0.968686852,8.14494954 1.08,8.4 C3.1,13.09 6.9,16 11,16 C15.1,16 18.9,13.09 20.92,8.4 C21.0313131,8.14494954 21.0313131,7.85505046 20.92,7.6 Z M11,14 C7.83,14 4.83,11.71 3.1,8 C4.83,4.29 7.83,2 11,2 C14.17,2 17.17,4.29 18.9,8 C17.17,11.71 14.17,14 11,14 Z M11,4 C8.790861,4 7,5.790861 7,8 C7,10.209139 8.790861,12 11,12 C13.209139,12 15,10.209139 15,8 C15,6.93913404 14.5785726,5.92171839 13.8284271,5.17157288 C13.0782816,4.42142736 12.060866,4 11,4 Z M11,10 C9.8954305,10 9,9.1045695 9,8 C9,6.8954305 9.8954305,6 11,6 C12.1045695,6 13,6.8954305 13,8 C13,9.1045695 12.1045695,10 11,10 Z" />
          </g>
        </svg>
        )}
      </div>


</div>

      )}

     {step===1?(
       <p className="mt-2 text-lg text-gray-500 py-4">
       By continuing, I agree to Nike's{' '}
       <span className="underline cursor-pointer">Privacy Policy</span> and{' '}
       <span className="underline cursor-pointer">Terms of Use</span>
     </p>
     ):(
      <p className='mt-2 text-lg text-gray-500 py-2 inter underline cursor-pointer'>Forgotten your password?</p>
     )}

     
      <div className="text-right">
  <button
    type="submit"
    className="bg-black cursor-pointer inter rounded-full text-white px-7 py-3 mt-7 text-lg"
  >
    {step === 1 ? 'Continue' : 'Sign in'}
  </button>
</div>

    </form>
  );
};

export default Login;
