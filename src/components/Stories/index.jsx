import React from 'react';
import c from './Stories.module.scss'
import {api} from "../../config/api";
import {AiOutlinePlus} from "react-icons/ai";
import StoriesItem from "./StoriesItem";
import StoriesView from "./StoriesView";
import StoriesAdd from "./StoriesAdd";
import {Swiper, SwiperSlide} from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";


function Stories({allUsers}) {
  const [data, setData] = React.useState(null)
  const [storiesView, setStoriesView] = React.useState(false)
  const [storiesCreate, setStoriesCreate] = React.useState(false)
  const [singleStories, setSingleStories] = React.useState(null)
  const access = localStorage.getItem('accessToken')
  
  React.useEffect(() => {
    api.getStories(access).then(r => setData(r.data))
  }, [storiesCreate])
  
  
  return (
    <div className={c.stories}>
      {
        storiesView && <StoriesView {...singleStories} setOpen={setStoriesView} />
      }
      {
        storiesCreate && <StoriesAdd setOpen={setStoriesCreate}/>
      }
      <div className={c.stories_add} onClick={() => setStoriesCreate(true)}>
        <span>
          <img src="https://www.transparentpng.com/thumb/user/blue-male-user-profile-transparent-png-2lbgMx.png"
               alt=""/>
        </span>
        <p>
          <AiOutlinePlus/>
        </p>
      </div>
      {
        data?.length > 4 ?
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode]}
            className={c.mySwiper}
          >
            {
              data?.map((item, i) => (
                <SwiperSlide key={i}>
                  <StoriesItem
                    userId={item.user}
                    key={i}
                    allUsers={allUsers}
                    storiesId={item.id}
                    setOpen={setStoriesView}
                    setSingleStories={setSingleStories}
                  />
                </SwiperSlide>
              ))
      
            }
          </Swiper>
          : data?.map((item, i) => (
            <StoriesItem
              userId={item.user}
              key={i}
              allUsers={allUsers}
              storiesId={item.id}
              setOpen={setStoriesView}
              setSingleStories={setSingleStories}
            />
          ))
      }
    </div>
  );
}

export default Stories;