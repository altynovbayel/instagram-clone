import React from 'react';
import c from './PostCreate.module.scss'
import {api} from "../../../config/api";

function PostCreate() {
  const [title, setTitle] = React.useState('')
  const [image, setImage] = React.useState('')
  const [imageState, setImageState] = React.useState(false)
  const [post, setPost] = React.useState()
  const access = localStorage.getItem('accessToken')
  
  const handleCreate = () => {
    api.createPost(access, {title: title}).then(r => {
      r.data && setImageState(true)
      setPost(r.data)
    })
  }
  
  const uploadImage = () => {
    const formData = new FormData()
    formData.append('file', image)
    console.log({image: image, post: post.id,})
    api.createPostImage(access, {image: formData, post: post.id,}).then()
  }

  
  return (
    <div className={c.create}>
      <h2>Post Create</h2>
      <div className={c.container}>
        {
          imageState === false ?
            <div className={c.create_input}>
              <span>Post title</span>
              <input
                type="text"
                placeholder={'title'}
                onChange={(e) => setTitle(e.target.value)}/>
            </div>
            : <form className={c.create_input}>
              <span>Post image</span>
              <input
                type="file"
                onChange={e => setImage(e.target.files[0])}
              />
            </form>
        }
      </div>
      <div className={c.create_btn}>
        <button onClick={imageState === false ? handleCreate : uploadImage}>
          Create
        </button>
      </div>
    </div>
  );
}

export default PostCreate;