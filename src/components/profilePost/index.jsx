import React from 'react';
import c from "./ProfilePost.module.scss"
import {api} from "../../config/api";
import PostView from "../PosView";

function ProfilePost({apiUrl, userData, liked, id, page}) {
  const [data, setData] = React.useState(null)
  const [postOpen, setPostOpen] = React.useState(false)
  
  const getPost = () => {
    setPostOpen(true)
    api.getSinglePost(id).then(r => setData(r.data))
  }
  
  return (
    <>
      {
        postOpen &&
        <PostView
          setOpen={setPostOpen}
          data={data}
          userData={userData}
          liked={liked}
          id={id}
          page={page}
        />
      }
      <div className={c.post_item} onClick={getPost}>
        <img
          src={ apiUrl}
          alt=""
        />
      </div>
    </>
  );
}

export default ProfilePost;