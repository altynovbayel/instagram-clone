import React from 'react';
import c from './Main.module.scss'
import PostCard from "../../../components/PostCard";
import {api} from "../../../config/api";
import Loader from "../../../components/Loader";
import Stories from "../../../components/Stories";

function Main() {
  const [allUser, setAllUser] = React.useState(null)
  const [posts, setPosts] = React.useState(null)
  const [reload, setReload] = React.useState(0)
  const [postRefresh, setPostRefresh] = React.useState(null)
  const [saved, setSaved] = React.useState(null)
  
  const username = localStorage.getItem('username')
  const access = localStorage.getItem('accessToken')
  
  React.useEffect(() => {
    api.getAllUser().then(r => {
      setAllUser(r.data)
      const currentUser = r?.data?.find(item => item.username === username)
      currentUser
        ? localStorage.setItem('currentUser', JSON.stringify(currentUser))
        : setReload(1)
    })
  }, [reload])
  
  React.useEffect(() => {
    api.getPosts().then(r => r.data && setPosts(r.data.reverse()))
    setReload(11)
  }, [postRefresh])
  
  React.useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    api.getSaved(access, currentUser?.id).then(r => setSaved(r.data))
  }, [])
  
  if(!allUser) return <Loader/>
  if(!posts) return <Loader/>
  return (
    <div className={c.main}>
      <div className={c.stories}>
        <Stories allUsers={allUser}/>
      </div>
      <div className={c.posts}>
        {
          posts?.map((item, id) => (
            <div key={id}>
              <PostCard
                {...item}
                data={item}
                allUser={allUser}
                setReload={setPostRefresh}
                saved={saved}
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Main;