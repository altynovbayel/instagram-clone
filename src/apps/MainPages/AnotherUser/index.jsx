import React from 'react';
import {useParams} from "react-router-dom";
import {api} from "../../../config/api";
import c from "./AnotherUser.module.scss";
import ModalWindowSubs from "../../../components/ModalWindowSubs";
import Loader from "../../../components/Loader";
import ProfilePost from "../../../components/profilePost";

function AnotherUser() {
  const [data, setData] = React.useState(null)
  const [followState, setFollowState] = React.useState(false)
  const [modalState, setModalState] = React.useState('')
  const [follow, setFollow] = React.useState(null)
  const [allUser, setAllUser] = React.useState(null)
  const [posts, setPosts] = React.useState(null)
  
  const {id} = useParams()
  const access = localStorage.getItem('accessToken')
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  
  const apiUrl = 'https://cryxxxen.pythonanywhere.com/'
  
  React.useEffect(() => {
    api.getAllUser().then(r => setAllUser(r.data))
    api.getUsersPost(parseInt(id)).then(r => r.data && setPosts(r.data))
  }, [])
  
  React.useEffect(() => {
    api.getSingleUser(parseInt(id)).then(r => r.data && setData(r.data))
    api.getSubscriptions(currentUser.id).then(r => {
      if(r.data){
        const check = r.data.find(item => item.to_user === parseInt(id))
        check ? setFollowState(true) : setFollowState(false)
      }
    })
  }, [followState])
  
  React.useEffect(() => {
    if(modalState === 'following'){
      api.getSubscriptions(parseInt(id)).then(r => {
        if(r.data){
          const filtered = allUser.filter(item => {
            return r.data.some(item2 => item.id === item2.to_user)
          })
          filtered && setFollow(filtered)
        }
      })
    }else if(modalState === 'follower'){
      api.getSubscribers(parseInt(id)).then(r => {
        if(r.data){
          const filtered = allUser.filter(item => {
            return r.data.some(item2 => item.id === item2.from_user)
          })
          filtered && setFollow(filtered)
        }
      })
    }
  }, [modalState])
  
  
  const handleFollow = (id) => {
    api.postFollow(access, {to_user: id}).then(r => r.data && setFollowState(true))
  }
  

  const removeFollower = id => {
    api.getSubscribers(id).then(r => {
      if(r.data){
        const findId = r.data.find(item => item.from_user === currentUser.id)
        api.removeFollow(access, findId.id).then(r => r && setFollowState(false))
      }
    })
  }
  

  if(!data) return <Loader/>
  return (
    <div className={c.profile}>
      {
        modalState && <ModalWindowSubs arr={follow} setState={setModalState}/>
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
              <button
                className={c.subscribe_btn}
                onClick={() => followState ? removeFollower(data.id) : handleFollow(data.id)}
              >
                {
                  followState ? 'Following' : 'Follow'
                }
              </button>
            </div>
            <div className={c.subscribe}>
              <div>
                <span>{posts?.length}</span>
                posts
              </div>
              <div onClick={() => setModalState('follower')}>
                <span> {data.subscribers}</span>
                Follower
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
        <div className={c.posts_row}>
          {
            posts?.map((item, i) => (
             <ProfilePost
               {...item}
               item={item}
               key={i}
               apiUrl={item.post_images.length > 0 ? `${apiUrl}/${item?.post_images[0]?.image }` : 'https://pchelp24.com/wp-content/uploads/images/05(1).png'}
               userData={data}
             />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default AnotherUser;