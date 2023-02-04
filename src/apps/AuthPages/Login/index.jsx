import React from 'react';
import c from "./Login.module.scss";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {api} from "../../../config/api";

function Login() {
  const [errorMessage, setErrorMessage] = React.useState(null)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: "onChange",
  })
  
  const handleRegister = data => {
    if(data){
      api.getToken(data).then(r => {
        localStorage.setItem('username', data.username)
        localStorage.setItem('accessToken', r.data.access)
        localStorage.setItem('refreshToken', r.data.refresh)
        r.data && navigate('/')
      }).catch(err => err && setErrorMessage(err.response.data.detail))
    }
  }
  
  return (
    <div className={c.login}>
      <div className={c.block}>
        <div className={c.block_header}>
          <img src="/images/Instagram_logo.svg.png" alt="" />
        </div>
        <div className={c.block_form}>
          {
            errorMessage && <span className={c.err_message}>{errorMessage}</span>
          }
          <form onSubmit={handleSubmit(data => handleRegister(data))}>
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
            <button disabled={!isValid}>Вход</button>
          </form>
        </div>
      </div>
      <div className={c.footer_block}>
        У вас ещё нет аккаунта?
        <Link to={'/auth/register'}>
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
}

export default Login;