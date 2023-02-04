import React from 'react';
import c from './Likes.module.scss'
import {api} from "../../../config/api";
import Loader from "../../../components/Loader";
import PostCard from "../../../components/PostCard";

function Likes() {
  const [posts, setPosts] = React.useState(null)
  const [users, setUsers] = React.useState(null)
  const [saved, setSaved] = React.useState(null)
  const [postRefresh, setPostRefresh] = React.useState(0)
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const access = localStorage.getItem('accessToken')
  
  React.useEffect(() => {
    api.getAllUser().then(r => setUsers(r.data))
    api.getPosts().then(r => {
      const filter = r.data.filter(item => item.liked.length > 0)
        .map(item => {
          const find = item.liked.find(el => el.user === currentUser.id)
          if(find) return item
        })
        .filter(item => item !== undefined)
      filter && setPosts(filter)
    })
  }, [postRefresh])
  
  React.useEffect(() => {
    api.getSaved(access, currentUser.id).then(r => setSaved(r.data))
  }, [])
  
  if(!users) return <Loader/>
  if(!posts) return <Loader/>
  return (
    <div className={c.likes}>
      <h2>Manage Likes</h2>
      <div className={c.likes_post}>
        {
          posts?.map(item => (
            <PostCard {...item} allUser={users} setReload={setPostRefresh} saved={saved}/>
          ))
        }
      </div>
    </div>
  );
}

export default Likes;