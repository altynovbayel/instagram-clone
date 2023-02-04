import React from 'react';
import c from './ModalWindowSubs.module.scss'
import {AiOutlineClose} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

function ModalWindowSubs({setState, arr, title}) {
  const navigate = useNavigate()
  return (
    <div className={c.modal}>
      <div className={c.modal_header}>
        <h3>{title}</h3>
        <button onClick={() => setState(false)}>
          <AiOutlineClose/>
        </button>
      </div>
      <div className={c.modal_content}>
        {
          arr?.map((item, id) => (
            <div
              className={c.user}
              key={id}
              onClick={() => navigate(`/user/${item.id}`)}
            >
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

export default ModalWindowSubs;