import React from 'react';
import c from './UserEdit.module.scss'
import {api} from "../../../config/api";
import {Link} from "react-router-dom";
import {AiOutlineArrowLeft} from "react-icons/ai";
import {useForm} from "react-hook-form";

function UserEdit() {
  const [user, setUser] = React.useState(null)
  const access = localStorage.getItem('accessToken')
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  
  React.useEffect(() => {
    api.getUser(access, currentUser.id).then(r => r.data && setUser(r.data))
  }, [])
  
  const {
    register,
    handleSubmit,
  } = useForm()
  
  const handleEdit = data => {
    api.editUser(access, currentUser.id, data)
      .then(r => r && alert('you edit your profile'))
      .catch(err => alert(err.response.data.username))
  }
  
  const getAvatarFile = (file) => {
    const formData = new FormData()
    formData.append('avatar', file)
    
    if(file){
      api.editUser(access, currentUser.id, formData).then()
    }else{
      alert('Выберите фото!')
    }
  }
  
  
  return (
    <div className={c.user_edit}>
      <div className={c.exit_btn}>
        <Link to={'/profile'}>
          <AiOutlineArrowLeft/>
        </Link>
      </div>
      <div className={c.container}>
        <form className={c.edit_form} onSubmit={handleSubmit(data => handleEdit(data))}>
          <div className={c.inputs}>
            {
              user?.avatar ? <img src={user?.avatar} alt="" /> : <img src="https://www.transparentpng.com/thumb/user/blue-male-user-profile-transparent-png-2lbgMx.png" alt="" />
            }
            <div className={c.avatar_text}>
              <p>
                {user?.username}
              </p>
              <label className={c.avatar_edit_btn}>
                <input
                  type="file"
                  onChange={e => getAvatarFile(e.target.files[0])}
                />
                Изменить фото профиля
              </label>
            </div>
          </div>
          <div className={c.inputs}>
            <h3>
              Имя
            </h3>
            <input
              type="text"
              placeholder={'Имя'}
              {...register('first_name')}
              defaultValue={user?.first_name}
            />
          </div>
          <div className={c.inputs}>
            <h3>
              Имя пользователя
            </h3>
            <input
              type="text"
              placeholder={'Имя пользователя'}
              {...register('username')}
              defaultValue={user?.username}
            />
          </div>
          <div className={c.inputs}>
            <h3>
              О себе
            </h3>
            <textarea
              defaultValue={user?.bio}
              placeholder={'О себе'}
              {...register('bio')}>
            </textarea>
          </div>
          <div className={c.inputs}>
            <h3>
              Эл. адрес
            </h3>
            <input
              type="email"
              placeholder={'Эл. адрес'}
              {...register('email')}
              defaultValue={user?.email}
            />
          </div>
          <div className={c.submit_btn}>
            <button>
              Изменить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserEdit;