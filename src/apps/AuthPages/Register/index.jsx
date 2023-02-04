import React from 'react';
import c from './Register.module.scss'
import {useForm} from "react-hook-form";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {api} from "../../../config/api";
import {Link, useNavigate} from "react-router-dom";

function Register() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    // reset,
  } = useForm({
    mode: "onChange",
  })
  
  const handleRegister = data => {
    const postData = {
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      bio: "",
      email: '',
      avatar: null,
      password: data.password,
      password_repeat: data.password_repeat,
    }
    
    if (postData) {
      api.usersCreate(postData).then(r => {
        localStorage.setItem('user', JSON.stringify(r.data))
      })
      api.getToken({username: data.username, password: data.password})
        .then(r => {
          r && navigate('/')
          localStorage.setItem('accessToken', r.data.access)
          localStorage.setItem('refreshToken', r.data.refresh)
        })
    }
  }

  return (
    <div className={c.register}>
      <div className={c.block}>
        <div className={c.block_header}>
          <img src="/images/Instagram_logo.svg.png" alt=""/>
          <p>
            Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей.
          </p>
        </div>
        <div className={c.block_form}>
          <form onSubmit={handleSubmit(data => handleRegister(data))}>
            <div className={c.form_input}>
              {
                errors.first_name && <span className={c.error_icon}><AiOutlineCloseCircle/></span>
              }
              <input
                type="text"
                placeholder={'Имя'}
                {...register('first_name', {required: '⚠ Обязательное поле'})}
              />
            </div>
            <div className={c.form_input}>
              {
                errors.last_name && <span className={c.error_icon}><AiOutlineCloseCircle/></span>
              }
              <input
                type="text"
                placeholder={'Фамилия'}
                {...register('last_name', {required: '⚠ Обязательное поле'})}
              />
            </div>
            <div className={c.form_input}>
              {
                errors.username && <span className={c.error_icon}><AiOutlineCloseCircle/></span>
              }
              <input
                type="text"
                placeholder={'Имя пользователя'}
                {...register('username', {required: '⚠ Обязательное поле'})}
              />
            </div>
            {/*<div className={c.form_input}>*/}
            {/*  {*/}
            {/*    errors.avatar && <span className={c.error_icon}><AiOutlineCloseCircle/></span>*/}
            {/*  }*/}
            {/*  <p className={c.avatar_text}>*/}
            {/*    выберите аватарку*/}
            {/*  </p>*/}
            {/*  <input*/}
            {/*    className={c.input_file}*/}
            {/*    type="file"*/}
            {/*    onInput={(e) => {*/}
            {/*      console.log(e)*/}
            {/*      setAvatarFile(e.target.files[0])*/}
            {/*    }}*/}
            {/*    {...register('avatar', {required: '⚠ Обязательное поле'})}*/}
            {/*  />*/}
            {/*  */}
            {/*</div>*/}
            <div className={c.form_input}>
              {
                errors.password && <span className={c.error_icon}><AiOutlineCloseCircle/></span>
              }
              <input
                type="password"
                placeholder={'Пароль'}
                {...register('password', {required: '⚠ Обязательное поле'})}
              />
            </div>
            <div className={c.form_input}>
              {
                errors.password_repeat && <span className={c.error_icon}><AiOutlineCloseCircle/></span>
              }
              <input
                type="password"
                placeholder={'Повторите пароль'}
                {...register('password_repeat', {required: '⚠ Обязательное поле'})}
              />
            </div>
            <button disabled={!isValid}>Регистрация</button>
          </form>
        </div>
      </div>
      <div className={c.footer_block}>
        Есть аккаунт?
        <Link to={'/auth/login'}>
          Вход
        </Link>
      </div>
    </div>
  );
}

export default Register;