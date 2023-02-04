import React from 'react';
import c from './StoriesItem.module.scss';
import {api} from "../../../config/api";

function StoriesItem(
  {
    userId,
    allUsers,
    storiesId,
    setOpen,
    setSingleStories
  }) {
  const [userObj, setUserObj] = React.useState(null)
  const access = localStorage.getItem('accessToken')
  React.useEffect(() => {
    const find = allUsers?.find(item2 => item2.id === userId)
    setUserObj(find)
  }, [])
  
  const getStories = (id) => {
    setOpen(true)
    api.getSingleStories(access, id).then(r => setSingleStories(r.data))
  }
  
  return (
    <div className={c.stories_item} onClick={() => getStories(storiesId)}>
      <span>
        <img
          src={userObj?.avatar ? userObj?.avatar : "https://www.transparentpng.com/thumb/user/blue-male-user-profile-transparent-png-2lbgMx.png"}
          alt=""/>
      </span>
      <p>
        {
          userObj?.username.length > 8
            ? userObj?.username.split('').slice(0, 8).join('') + '...'
            : userObj?.username
        }
      </p>
    </div>
  );
}

export default StoriesItem;