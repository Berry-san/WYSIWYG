import hamburger from '../../assets/svgs/hamburger.svg'
import profile from '../../assets/svgs/profile.svg'
import { useSelector } from 'react-redux'

const Topbar = (props) => {
  const { user_name, role } = useSelector((state) => state.user.user)
  return (
    <header className="sticky top-0 z-30 flex w-full bg-white border-b border-border_color drop-shadow-1 ">
      <div className="flex items-center justify-between flex-grow px-1 pt-3 lg:justify-end lg:py-3.5 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation()
              props.setSidebarOpen(!props.sidebarOpen)
            }}
            className="z-40 block  bg-white p-1.5 lg:hidden"
          >
            <img src={hamburger} className="w-8 h-8" alt="" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-3" to="#">
          <span className="p-3 mb-2 mr-2 bg-gray-200 rounded-full">
            <img src={profile} className="w-6 h-6" alt="User" />
          </span>
          <span className="hidden lg:block">
            <span className="block text-sm font-medium text-black ">
              {user_name}
            </span>
            <span className="block text-xs uppercase">
              {role === '1' ? 'Admin' : 'User'}
            </span>
          </span>
        </div>
      </div>
    </header>
  )
}

export default Topbar
