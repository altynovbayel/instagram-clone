import React from 'react';
import c from './PostCard.module.scss'
import {AiOutlineHeart} from "react-icons/ai";
import {FiMessageCircle} from "react-icons/fi";
import {BsThreeDots} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {api} from "../../config/api";
import {FcLike} from "react-icons/fc";
import PostView from "../PosView";

function PostCard({user, post_images, title, id, allUser, liked, setReload, saved, data}) {
  
  const navigate = useNavigate()
  const [userObj, setUserObj] = React.useState(null)
  const [commentVal, setCommentVal] = React.useState('')
  const [likeState, setLikeState] = React.useState(false)
  const [saveState, setSaveState] = React.useState(false)
  const [postOpen, setPostOpen] = React.useState(false)
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const access = localStorage.getItem('accessToken')
  
  
  React.useEffect(() => {
    const find = allUser?.find(item2 => item2.id === user)
    setUserObj(find)
  }, [])
  
  const setLike = id => {
    api.setLike(access, {post: id}).then(r => {
      r.data &&
      setReload(prev => prev + 1)
      setLikeState(true)
    }).catch(err => err && alert('you should following this user'))
  }
  
  const setSave = id => {
    api.setSave(access, {post: id}).then(r => {
      r.data &&
      setSaveState(true)
      setReload(prev => prev + 1)
    }).catch(err => err && alert('you should following this user'))
  }
  
  const postComment = () => {
    api.createComment(access, {
      body: commentVal.trim(),
      post: id,
      parent: null,
    }).then(r => r.data && console.log(r.data))
  }
  
  const removeLike = () => {
    const check = liked?.find(item => item.user === currentUser.id)
    api.removeLike(access, check?.id).then(r => {
      r &&
      setReload(prev => prev + 1)
      setLikeState(false)
    })
  }
  
  const unSave = () => {
    const find = saved?.find(item => item.post === id)
    api.removeSave(access, find.id).then(r => r && setSaveState(false))
  }
  
  React.useEffect(() => {
    const check = liked?.find(item => item.user === currentUser.id)
    check && setLikeState(true)
    
    const checkSaved = saved?.find(item => item.post === id)
    checkSaved && setSaveState(true)
  }, [])
  

  return (
    <div className={c.post}>
      {
        postOpen &&
        <PostView
          setOpen={setPostOpen}
          data={{post_images}}
          id={id}
          userData={userObj}
          liked={liked}
        />
      }
      <div className={c.post_header}>
        <div className={c.name} onClick={() => navigate(`/user/${userObj?.id}`)}>
          <img
            src={userObj?.avatar ? userObj?.avatar : "https://www.transparentpng.com/thumb/user/blue-male-user-profile-transparent-png-2lbgMx.png"}
            alt=""/>
          <p>
            {userObj?.username}
          </p>
        </div>
        <span>
          <BsThreeDots/>
        </span>
      </div>
      <div className={c.post_img}>
        {
          post_images?.length === 0 ? <img src='https://pchelp24.com/wp-content/uploads/images/05(1).png' alt=""/>
            : <img
              src={post_images[0]?.image}
              alt=""
            />
        }
      
      </div>
      <div className={c.post_btn}>
        <div className={c.btns}>
          <button
            className={c.like}
            onClick={() => likeState ? removeLike() : setLike(id)}
          >
            {
              likeState ? <FcLike/> : <AiOutlineHeart/>
            }
          </button>
          <button className={c.comment_btn} onClick={() => setPostOpen(true)}>
            <FiMessageCircle/>
          </button>
          <button className={c.share}>
            <svg aria-label="Поделиться публикацией" color="#fafafa" fill="#fafafa" height="24"
                 role="img" viewBox="0 0 24 24" width="24">
              <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3"
                    y2="10.083"></line>
              <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                       stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
            </svg>
          </button>
        </div>
        <div className={c.save_btn}>
          <button onClick={() => saveState ? unSave() : setSave(id)}>
            {
              saveState ?
                <svg aria-label="Удалить" className="_ab6-" color="#fafafa" fill="#fafafa" height="24" role="img"
                     viewBox="0 0 24 24" width="24">
                  <path
                    d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path>
                </svg> :
                <svg aria-label="Сохранить" color="#fafafa" fill="#fafafa" height="24" role="img"
                     viewBox="0 0 24 24" width="24">
                  <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor"
                           strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
                </svg>
            }
          </button>
        </div>
      </div>
      <div className={c.likes_count}>
        <p>liked <span>{liked?.length}</span> users</p>
      </div>
      <div className={c.post_title}>
        <div className={c.title_name}>
          {
            userObj?.username
          }
        </div>
        <div>
          {
            title
          }
        </div>
      </div>
      
      <div className={c.comment}>
        <textarea
          className={c.area}
          placeholder={'Добавьте комментарии'}
          onChange={e => setCommentVal(e.target.value)}
        >
        </textarea>
        <button
          onClick={postComment}
          disabled={commentVal.length === 0}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default PostCard;