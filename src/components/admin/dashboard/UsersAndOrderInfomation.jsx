import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const UsersAndOrderInfomation = () => {
    const [userData, setUserData] = useState([]);
    const [totalNewUsers, setTotalNewUsers] = useState(0);
    const [topUsers, setTopUsers] = useState([]);


    useEffect(() => {
        const fetchNewUsers = async () => {
            try {
                const res = await axios.get('http://localhost:3000/users');
                const users = res.data;
    
                const now = new Date();
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(now.getDate() - 6);
    
                const dailyCount = Array(7).fill(0);
                let total = 0;
    
                // ==== TÍNH PROFIT ====
                let weeklyRevenue = 0;
    
                const top = users
                    .filter(u => u.role !== 'Admin')
                    .sort((a, b) => {
                        const totalA = a.orders?.reduce((sum, o) => sum + Number(o.totalPrice || 0), 0) || 0;
                        const totalB = b.orders?.reduce((sum, o) => sum + Number(o.totalPrice || 0), 0) || 0;
                        return totalB - totalA;
                    });
    
                setTopUsers(top);
    
                users.forEach(user => {
                    if (user.role === 'Admin') return;
    
                    const createdAt = new Date(user.createdAt);
                    if (createdAt >= oneWeekAgo && createdAt <= now) {
                        const dayIndex = createdAt.getDay();
                        dailyCount[dayIndex]++;
                        total++;
                    }
    
                    // Tính revenue tuần này từ orders của user
                    user.orders?.forEach(order => {
                        const orderDate = new Date(order.createdAt);
                        if (orderDate >= oneWeekAgo && orderDate <= now) {
                            weeklyRevenue += Number(order.totalPrice || 0);
                        }
                    });
                });
    
                const weeklyProfit = weeklyRevenue * 0.2; // giả sử lợi nhuận 20%
    
                setUserData(dailyCount);
                setTotalNewUsers(total);
               
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };
    
        fetchNewUsers();
    }, []);
    

    const chartData = [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    ].map((day, index) => ({
        day,
        users: userData[index] || 0
    }));

    return (
        <div className='p-4 space-y-4'>
            <div className='grid grid-cols-4 gap-4'>
                <div className='bg-white relative rounded-xl border border-gray-200 items-center space-y-2  cursor-pointer py-4 px-4'>
                    <p className='text-xs  text-black'>New order this week</p>

                    <p className='text-black inter text-xl '>12</p>
                    <div className='absolute bottom-4 right-4'>
                        <div className='flex gap-2 items-center'>
                            <p className='w-12 py-1 bg-green-200 text-green-600 flex justify-center text-[10px] rounded-full'>+20%</p>
                            <p className='text-xs'>Vs last week</p>
                        </div>
                    </div>
                </div>
                <div className='bg-white relative rounded-xl border border-gray-200 items-center space-y-2  cursor-pointer py-4 px-4'>
                    <p className='text-xs  text-black'>New user this week</p>

                    <p className='text-black inter text-xl '>{totalNewUsers}</p>
                    <div className='absolute bottom-4 right-4'>
                        <div className='flex gap-2 items-center'>
                            <p className='w-12 py-1 bg-green-200 text-green-600 flex justify-center text-[10px] rounded-full'>+20%</p>
                            <p className='text-xs'>Vs last week</p>
                        </div>
                    </div>
                </div>
                <div className='bg-white relative rounded-xl border border-gray-200 items-center space-y-2  cursor-pointer py-4 px-4'>
                    <p className='text-xs  text-black'>Sale</p>

                    <p className='text-black inter text-xl '>1200$</p>
                    <div className='absolute bottom-4 right-4'>
                        <div className='flex gap-2 items-center'>
                            <p className='w-12 py-1 bg-green-200 text-green-600 flex justify-center text-[10px] rounded-full'>+20%</p>
                            <p className='text-xs'>Vs last week</p>
                        </div>
                    </div>
                </div>
                <div className='bg-white relative rounded-xl border border-gray-200 items-center space-y-2  cursor-pointer py-4 px-4'>
                    <p className='text-xs  text-black'>Profit</p>

                    <p className='text-black inter text-xl '>980$</p>
                    <div className='absolute bottom-4 right-4'>
                        <div className='flex gap-2 items-center'>
                            <p className='w-12 py-1 bg-green-200 text-green-600 flex justify-center text-[10px] rounded-full'>+20%</p>
                            <p className='text-xs'>Vs last week</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex gap-4 h-[350px]'>
  {/* Left panel */}
  <div className='w-2/3 h-full'>
    <div className='bg-white p-4 rounded-xl border border-gray-200 h-full'>
      <h3 className='mb-2 text-sm'>New user this week</h3>
      <ResponsiveContainer width="100%" height="95%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="users" fill="#465FFF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* Right panel */}
  <div className='w-1/3 h-full'>
    <div className='bg-white p-4 rounded-xl border border-gray-200 h-full overflow-y-auto'>
      <p className='mb-2 text-sm'>Top user</p>
      <ul className='space-y-2'>
        {topUsers.map((user) => (
          <div key={user.id} className='flex items-center justify-between text-sm'>
            <div className='flex items-center gap-2'>
              <img src={user.avatar} className='w-10 h-10 rounded-full' alt='' />
              <span>{user.firstname}{user.lastname}</span>
            </div>
            <span className='text-gray-500'>
              {user.orders?.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0).toLocaleString()}₫
            </span>
          </div>
        ))}
      </ul>
    </div>
  </div>
</div>

            {/* BIỂU ĐỒ */}
          
        </div>
    );
};

export default UsersAndOrderInfomation;
