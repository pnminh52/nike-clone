import React from 'react';
import Header1 from '../components/user/Header1';
import Header2 from './../components/user/Header2';
import Header3 from './../components/user/Header3';
import CheckoutHeader from './../components/user/CheckoutHeader';
import CheckoutFooter from './../components/user/CheckoutFooter';
import { Outlet, useLocation } from 'react-router-dom';

const UserLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isCheckoutPage = location.pathname.startsWith('/checkout');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && (
        <>
          {isCheckoutPage ? (
            <CheckoutHeader />
          ) : (
            <>
              <Header1 />
              <Header2 />
              <Header3 />
            </>
          )}
        </>
      )}

      <main className="flex-grow">
        <Outlet />
      </main>

      {!isAuthPage && (
        <>
          {isCheckoutPage ? (
            <CheckoutFooter />
          ) : (
            <footer>
              {/* Footer mặc định nếu có */}
            </footer>
          )}
        </>
      )}
    </div>
  );
};

export default UserLayout;
