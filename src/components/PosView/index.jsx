import React from 'react';
import c from './PostView.module.scss'
import {AiOutlineClose, AiOutlineHeart} from "react-icons/ai";
import {FiMessageCircle} from "react-icons/fi";
import {BsThreeDots} from "react-icons/bs";
import {FcLike} from "react-icons/fc";
import {api} from "../../config/api";

function PostView({setOpen, data, userData, liked, id, page}) {
  const [likeState, setLikeState] = React.useState(false)
  const [dots, setDots] = React.useState(false)
  const [savedData, setSavedData] = React.useState(null)
  const [reload, setReload] = React.useState(0)
  const [saveState, setSaveState] = React.useState(false)
  const [saveArr, setSaveArr] = React.useState(null)
  const [comments, setComments] = React.useState(null)
  const [allUser, setAllUser] = React.useState(null)
  const [commentVal, setCommentVal] = React.useState('')
  
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const access = localStorage.getItem('accessToken')
  
  React.useEffect(() => {
    const check = liked?.find(item => item.user === currentUser.id)
    check && setLikeState(true)
    page === 'saved' && setSaveState(true)
    api.getComments(id).then(r => setComments(r.data.reverse()))
    api.getAllUser().then(r => setAllUser(r.data))
  }, [])
  
  React.useEffect(() => {
    if (page === 'saved') {
      const find = userData?.find(item => item.id === data?.user)
      find && setSavedData(find)
    }
  }, [])
  
  const delPost = () => {
    api.deletePost(access, id).then(r => r && setOpen(false))
  }
  
  const setLike = () => {
    api.setLike(access, {post: id}).then(r => r.data && setLikeState(true))
  }
  
  const setSave = () => {
    api.setSave(access, {post: id}).then(r => r.data && setSaveState(true))
  }
  
  const unSave = () => {
    api.getSaved(access, currentUser.id).then(r => setSaveArr(r.data))
    const find = saveArr?.find(item => item.post === id)
    api.removeSave(access, find?.id).then(r => r && setSaveState(false))
  }
  
  const removeLike = () => {
    const check = liked?.find(item => item.user === currentUser.id)
    check && setLikeState(false)
    api.removeLike(access, check.id).then()
  }
  
  const postComment = () => {
    api.createComment(access, {
      body: commentVal.trim(),
      post: id,
      parent: null,
    }).then(r => r.data && api.getComments(id).then(r => setComments(r.data.reverse())))
  }
  
  return (
    <>
      <div className={c.post_view_back} onClick={() => setOpen(false)}></div>
      <div className={c.post_close} onClick={() => setOpen(false)}>
        <AiOutlineClose/>
      </div>
      <div className={c.post_block}>
        <div className={c.post_content}>
          {
            data?.post_images?.length === 0 ?
              <img src='https://pchelp24.com/wp-content/uploads/images/05(1).png' alt=""/>
              : <img
                src={data?.post_images[0]?.image}
                alt=""
              />
          }
        </div>
        <div className={c.post_info}>
          <div className={c.header}>
            <img src={Array.isArray(userData) ? savedData?.avatar : userData?.avatar} alt=""/>
            <h3>{Array.isArray(userData) ? savedData?.username : userData?.username}</h3>
            <span onClick={() => page === 'profile' && setDots(prev => !prev)}>
              <BsThreeDots/>
            </span>
            {
              dots &&
              <div className={c.dots}>
                <button onClick={delPost}>
                  delete
                </button>
              </div>
            }
          </div>
          <div className={c.post_comment}>
            {
              allUser &&
              comments?.map((item, i) => {
                const user = allUser?.find(user => user.id === item.user)
                return (
                  <div className={c.user_comment} key={i}>
                    <img src={user?.avatar} alt=""/>
                    <h4>{user?.username}</h4>
                    <p>{item.body}</p>
                  </div>
                )
              })
            }
          </div>
          <div className={c.post_btn}>
            <div className={c.buttons}>
              <button
                className={c.like}
                onClick={() => likeState ? removeLike() : setLike()}
              >
                {
                  likeState ? <FcLike/> : <AiOutlineHeart/>
                }
              </button>
              <button className={c.comment_btn}>
                <FiMessageCircle/>
              </button>
              <button className={c.share}>
                <svg aria-label="Поделиться публикацией" className="_ab6-" color="#fafafa" fill="#fafafa" height="24"
                     role="img" viewBox="0 0 24 24" width="24">
                  <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218"
                        y1="3"
                        y2="10.083"></line>
                  <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                           stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
                </svg>
              </button>
            </div>
            <div className={c.save_btn} onClick={() => saveState ? unSave() : setSave()}>
              <button>
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
          <div className={c.comment_input}>
            <textarea
              maxLength={255}
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
      </div>
    </>
  )
    ;
}

export default PostView;