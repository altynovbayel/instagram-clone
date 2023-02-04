import React from 'react';
import c from './StoriesAdd.module.scss'
import {AiOutlineClose} from "react-icons/ai";
import {api} from "../../../config/api";

function StoriesAdd({setOpen}) {
  const [file, setFile] = React.useState(null)
  const access = localStorage.getItem('accessToken')
  
  const handleAddFile = () => {
    const formData = new FormData()
    formData.append('file', file)
    api.createStories(access, formData).then()
    setOpen(false)
  }
  return (
    <>
      <div className={c.add_background} onClick={() => setOpen(false)}></div>
      <div className={c.add_close} onClick={() => setOpen(false)}>
        <AiOutlineClose/>
      </div>
      <div className={c.add_block}>
        <h3>
          photo or video
        </h3>
        <input type="file" onChange={e => setFile(e.target.files[0])}/>
        <button onClick={handleAddFile}>
          create
        </button>
      </div>
    </>
  );
}

export default StoriesAdd;