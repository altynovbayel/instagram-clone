import React from 'react';
import c from './StoriesView.module.scss'
import {AiOutlineClose} from "react-icons/ai";

function StoriesView({file, setOpen}) {
  const [type, setType] = React.useState(null)
  
  React.useEffect(() => {
    const fileType = file && [...file].reverse().slice(0, 3).reverse().join('')
    setType(fileType?.toLowerCase())
  }, [])
  
  
  return (
    <div className={c.view}>
      <div className={c.view_background} onClick={() => setOpen(false)}></div>
      <div className={c.close} onClick={() => setOpen(false)}>
        <AiOutlineClose/>
      </div>
      <div className={c.stories}>
        {
          type === 'mp4' ?
            <video src={file} width='100%' height='100%' controls>
            </video> :
            <img src={file} alt=""/>
        }
      </div>
    </div>
  );
}

export default StoriesView;