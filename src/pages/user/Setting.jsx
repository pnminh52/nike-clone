import { NavLink, useParams } from 'react-router-dom'
import AccountDetails from './Setting/AccountDetails'
const tabs = [
  {
    svg: (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 48 48" role="img" width="25px" height="25px" fill="none">
        <path stroke="currentColor" strokeWidth="3" d="M7.5 42v-6a7.5 7.5 0 017.5-7.5h18a7.5 7.5 0 017.5 7.5v6m-9-27a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
      </svg>
    ),
    path: 'account',
    label: 'Account Details',
  },
  {
    svg: (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 48 48" role="img" width="25px" height="25px" fill="none">
        <path stroke="currentColor" strokeWidth="3" d="M7.5 19.5h33m-4.5 18H12A4.502 4.502 0 017.5 33V15a4.5 4.5 0 014.5-4.5h24a4.5 4.5 0 014.5 4.5v18c0 2.484-2.016 4.5-4.5 4.5z" />
      </svg>
    ),
    path: 'payment',
    label: 'Payment Methods',
  },
  {
    svg: (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 48 48" role="img" width="25px" height="25px" fill="none">
        <path stroke="currentColor" strokeWidth="3" strokeMiterlimit="10" d="M24 27V13c0-3.48 2.02-5.5 4.5-5.5h8.78l3.22 12m0 0h-33m33 0v21h-33v-21m0 0l3.22-12H21" />
      </svg>
    ),
    path: 'addresses',
    label: 'Delivery Addresses',
  },
  {
    svg: (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 48 48" role="img" width="25px" height="25px" fill="none">
        <path stroke="currentColor" strokeWidth="3" d="M43.5 21v13.5a3 3 0 01-3 3h-33a3 3 0 01-3-3V21m6.615-4.5h25.77m-25.77 0l5.304-5.303M11.115 16.5l5.304 5.303M36.885 16.5l-5.304-5.303m5.304 5.303l-5.304 5.303M34.5 38v-5M24 38v-5m-10.5 5v-5" />
      </svg>
    ),
    path: 'shop',
    label: 'Shop Preferences',
  },
  {
    svg: (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 48 48" role="img" width="25px" height="25px" fill="none">
        <path stroke="currentColor" strokeWidth="3" d="M43.5 21v13.5a3 3 0 01-3 3h-33a3 3 0 01-3-3V21m6.615-4.5h25.77m-25.77 0l5.304-5.303M11.115 16.5l5.304 5.303M36.885 16.5l-5.304-5.303m5.304 5.303l-5.304 5.303M34.5 38v-5M24 38v-5m-10.5 5v-5" />
      </svg>
    ),
    path: 'communication',
    label: 'Communication Preferences',
  },
  {
    svg: (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 48 48" role="img" width="25px" height="25px" fill="none">
        <path stroke="currentColor" strokeWidth="3" d="M4.5 42v-6a7.5 7.5 0 017.5-7.5h12a7.5 7.5 0 017.5 7.5v6m14.41-23.666l-9.546 9.546-5.304-5.302M25.5 15a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
      </svg>
    ),
    path: 'privacy',
    label: 'Privacy',
  },
  {
    svg: (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 48 48" role="img" width="25px" height="25px" fill="none">
        <path stroke="currentColor" strokeWidth="3" d="M16.025 26.013L32 34m-.024-19.988l-15.95 7.974M40.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 24a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-24-12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
      </svg>
    ),
    path: 'visibility',
    label: 'Profile Visibility',
  },
  {
    svg: (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 48 48" role="img" width="25px" height="25px" fill="none">
        <path stroke="currentColor" strokeWidth="3" d="M25.06 33.547l-4.241 4.242a7.503 7.503 0 01-10.608 0 7.503 7.503 0 010-10.608l6.364-6.362a7.5 7.5 0 0110.608 0l2.122 2.12m-6.366-8.485l4.242-4.244a7.503 7.503 0 0110.608 0 7.503 7.503 0 010 10.608l-6.364 6.364a7.5 7.5 0 01-10.608 0l-2.122-2.122" />
      </svg>
    ),
    path: 'linked',
    label: 'Linked Accounts',
  },
]

const Setting = () => {
  const { tab } = useParams()

  const renderContent = () => {
    switch (tab) {
      case 'account':
        return <div><AccountDetails /></div>
      case 'payment':
        return <div>Payment Methods</div>
      case 'addresses':
        return <div>Delivery Addresses</div>
      case 'shop':
        return <div>Shop Preferences</div>
      case 'communication':
        return <div>Communication Preferences</div>
      case 'privacy':
        return <div>Privacy</div>
      case 'visibility':
        return <div>Profile Visibility</div>
      case 'linked':
        return <div>Linked Accounts</div>
      default:
        return <div><AccountDetails /></div>
    }
  }

  return (
    <div className='max-w-screen-2xl px-20 py-10 mx-auto'>
        <p className='text-2xl '>Settings</p>
      <div className='flex'>
        <div className='w-1/3  p-6'>
          <ul className='space-y-4'>
            {tabs.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={`/setting/${item.path}`}
                  className={({ isActive }) =>
                    `flex items-center gap-2 ${isActive ? '' : ''}`
                  }
                >
                  {item.svg}
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className='w-[38%]  p-6'>
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default Setting
