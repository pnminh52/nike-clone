import React from 'react';
import Header1 from '../components/user/headerAndFooter/Header1';
import Header2 from './../components/user/headerAndFooter/Header2';
import Header3 from './../components/user/headerAndFooter/Header3';
import CheckoutHeader from './../components/user/headerAndFooter/CheckoutHeader';
import CheckoutFooter from './../components/user/headerAndFooter/CheckoutFooter';
import { Outlet, useLocation } from 'react-router-dom';
import Footer  from './../components/user/headerAndFooter/Footer';

const UserLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isCheckoutPage = location.pathname.startsWith('/checkout');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && (
        <>
         
            <>
              <Header1 />
              <Header2 />
              <Header3 />
            </>
        
        </>
      )}

      <main className="flex-grow">
        <Outlet />
      </main>

      {!isAuthPage && (
        <>
         
           <div className='mt-10'>
             <Footer />
           </div>
         
        </>
      )}
    </div>
  );
};

export default UserLayout;
