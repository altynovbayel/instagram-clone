import React from 'react';
import c from './UserProfile.module.scss'
import {api} from "../../../config/api";
import {Link, useNavigate} from "react-router-dom";
import ModalWindowSubs from "../../../components/ModalWindowSubs";
import ProfilePost from "../../../components/profilePost";
import Loader from "../../../components/Loader";

function UserProfile() {
  const [data, setData] = React.useState(null)
  const [posts, setPosts] = React.useState(null)
  const [allUser, setAllUser] = React.useState(null)
  const [modalState, setModalState] = React.useState('')
  const [category, setCategory] = React.useState('all')
  const [follow, setFollow] = React.useState(null)
  const [saved, setSaved] = React.useState(null)
  const [allPost, setAllPost] = React.useState(null)
  const [savedUser, setSavedUser] = React.useState(null)
  
  
  const access = localStorage.getItem('accessToken')
  const user = JSON.parse(localStorage.getItem('currentUser'))
  const navigate = useNavigate()
  const apiUrl = 'https://cryxxxen.pythonanywhere.com/'
  
  React.useEffect(() => {
    api.getUser(access, user?.id).then(r => setData(r.data))
    api.getAllUser().then(r => setAllUser(r.data))
    api.getUsersPost(parseInt(user?.id)).then(r => r.data && setPosts(r.data))
    api.getPosts().then(r => setAllPost(r.data))
  }, [])
  
  
  React.useEffect(() => {
    api.getUsersPost(parseInt(user?.id)).then(r => r.data && setPosts(r.data))
  }, [category])
  
  React.useEffect(() => {
    api.getSaved(access, user.id).then(r => {
      if(r.data){
        const filter = allPost?.filter(item => {
          return r.data.some(item2 => item2.post === item.id)
        })
        setSaved(filter)
      }
    })
    const filterUser = allUser?.filter(item => {
      return saved?.some(item2 => item2.user === item.id)
    })
    setSavedUser(filterUser)
  }, [category])
  
  
  React.useEffect(() => {
    if(modalState === 'following'){
      api.getSubscriptions(user.id).then(r => {
        if(r.data){
          const filtered = allUser?.filter(item => {
            return r.data.some(item2 => item.id === item2.to_user)
          })
          filtered && setFollow(filtered)
        }
      })
    }else if(modalState === 'follower'){
      api.getSubscribers(user.id).then(r => {
        if(r.data){
          const filtered = allUser?.filter(item => {
            return r.data.some(item2 => item.id === item2.from_user)
          })
          filtered && setFollow(filtered)
        }
      })
    }
  }, [modalState])
  
  
  const handleLogout = () => {
    localStorage.clear()
    navigate('/auth/login')
    window.location.reload()
  }

  if (!data) return <Loader/>
  return (
    <div className={c.profile}>
      {
        modalState && <ModalWindowSubs arr={follow} setState={setModalState} title={modalState}/>
      }
      <div className={c.container}>
        <div className={c.profile_content}>
          <div className={c.profile_logo}>
            {
              data.avatar ? <img src={data.avatar} alt="" /> : <img src="https://www.transparentpng.com/thumb/user/blue-male-user-profile-transparent-png-2lbgMx.png" alt="" />
            }
          </div>
          <div className={c.profile_info}>
            <div className={c.username}>
              <h2>
                {data.username}
              </h2>
              <Link to={'/profile/edit'}>Edit profile</Link>
              <button
                className={c.logout_btn}
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
            <div className={c.subscribe}>
              <div>
                <span>{posts?.length}</span>
                posts
              </div>
              <div onClick={() => setModalState('follower')}>
                <span> {data.subscribers}</span>
                Followers
              </div>
              <div onClick={() => setModalState('following')}>
                <span>{data.subscriptions}</span>
                Following
              </div>
            </div>
            <div className={c.description}>
              <p>
                {data.first_name}
              </p>
              <p>
                {data.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={c.posts}>
        <div className={c.post_categories}>
          <span
            className={category === 'all' ? c.activeCategory : ''}
            onClick={() => setCategory('all')}
          >
            Posts
          </span>
          <span
            className={category === 'saved' ? c.activeCategory : ''}
            onClick={() => setCategory('saved')}
          >
            Saved
          </span>
        </div>
        <div className={c.posts_row}>
          {
            category === 'all' &&
            posts?.map((item, i) => (
              <ProfilePost
                {...item}
                item={item}
                key={i}
                apiUrl={item.post_images.length > 0 ? `${apiUrl}/${item?.post_images[0]?.image }` : 'https://pchelp24.com/wp-content/uploads/images/05(1).png'}
                userData={data}
                page={'profile'}
              />
            ))
          }
          {
            category === 'saved' &&
            saved?.map((item, i) => (
              <ProfilePost
                {...item}
                item={item}
                key={i}
                apiUrl={item.post_images.length > 0 ? item?.post_images[0]?.image  : 'https://pchelp24.com/wp-content/uploads/images/05(1).png'}
                userData={savedUser}
                page={'saved'}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default UserProfile;