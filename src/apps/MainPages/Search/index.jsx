import React from 'react';
import c from './Search.module.scss'
import {BiSearch} from "react-icons/bi";
import {api} from "../../../config/api";
import {useNavigate} from "react-router-dom";

function SearchUsers() {
  const [users, setUsers] = React.useState(null)
  const [inputVal, setInputVal] = React.useState('')
  const [filteredUsers, setFilteredUsers] = React.useState(null)
  const navigate = useNavigate()
  
  React.useEffect(() => {
    api.getAllUser().then(r => r && setUsers(r.data))
  }, [])
  
  React.useEffect(() => {
      if(users){
        const filteredData = users.filter(item => item.username.toLowerCase().includes(inputVal.toLowerCase().trim()))
        filteredData && setFilteredUsers(filteredData)
      }
      inputVal.length === 0 && setInputVal('+')
  }, [inputVal])
  
  return (
    <div className={c.search}>
      <div className={c.search_block}>
        <div className={c.search_input}>
          <BiSearch/>
          <input
            type="text"
            placeholder={'username'}
            onChange={e => setInputVal(e.target.value)}/>
        </div>
      </div>
      <div className={c.users_block}>
        {
          filteredUsers &&
          filteredUsers.map((item, id) => (
            <div className={c.user} key={id} onClick={() => navigate(`/user/${item.id}`)}>
              <div className={c.user_avatar}>
                {
                  item.avatar ? <img src={item.avatar} alt="" /> : <img src="https://www.transparentpng.com/thumb/user/blue-male-user-profile-transparent-png-2lbgMx.png" alt="" />
                }
              </div>
              <div>
                <p>
                  {item.username}
                </p>
                <span>
                  {item.bio}
                </span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default SearchUsers;