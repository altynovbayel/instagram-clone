import {FiSearch} from "react-icons/fi";
import {BsMessenger} from "react-icons/bs";
import {AiOutlineHeart} from "react-icons/ai";
import {RiHome2Line} from "react-icons/ri";
import {CgProfile} from "react-icons/cg";

export const sidebarList = [
  {
    id:1,
    title: 'Главная',
    icon: <RiHome2Line/>,
    route: '/'
  },
  {
    id:2,
    title: 'Поисковый запрос',
    icon: <FiSearch/>,
    route: '/search'
  },
  {
    id:3,
    title: 'Создать',
    icon: <svg aria-label="Новая публикация" className="_ab6-" color="#fafafa" fill="#fafafa" height="24" role="img"
               viewBox="0 0 24 24" width="24">
      <path
        d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
        fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
      <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545"
            x2="17.455" y1="12.001" y2="12.001"></line>
      <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line>
    </svg>,
    route: '/post_create'
  },
  {
    id:4,
    title: 'Лайки',
    icon: <AiOutlineHeart/>,
    route: '/likes',
  },
  {
    id:5,
    title:'Профиль',
    route: '/profile',
    icon: <CgProfile/>
  },
]