import React from 'react'
import logoWithText from '@assets/logo/logo-with-text.png'
import showPassword from '@assets/icons/show-password.svg'
import hidePassword from '@assets/icons/hide-password.svg'
import { useForm } from 'react-hook-form'
import Input from '../form/Input'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router";
import custom_axios from '@axios/AxiosSetup'
import { toast } from 'react-toastify'

const Login = () => {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm()
  const [passwordVisibility, setPasswordVisibility] = React.useState(false)
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await custom_axios.post('/auth/login', data)
      localStorage.setItem("token", response.data.access_token)
      navigate('/')
    }
    catch (error) {
      toast.error(error.response.data.message)
      setError("root", {
        message: error.response.data.message
      })
    }
  }

  return (
    <div className="container fade-in py-5">
        <div className="row justify-content-center">
            <div className="col-11 col-md-9 col-lg-8 col-xl-7 col-xxl-6 clear-card px-4 py-2 px-md-5">
                <img src={logoWithText} alt="Logo Likeyou" width="55px" className="d-block"/>
            </div>
        </div>

        <div className="row justify-content-center">
            <form 
              onSubmit={handleSubmit(onSubmit)}  
              className="col-11 col-md-9 col-lg-8 col-xl-7 col-xxl-6 clear-card px-4 py-4 px-md-5"
              >
                {/* Email */}
                <Input
                  id="email" label="Email" placeholder="email@likeyou.com" type="email"
                  register={register} 
                  required={{
                    required: "Preencha o email",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Email inválido"
                    }
                  }}
                />
                {errors.email && (
                  <span className='input-error-text'>{errors.email.message}</span>
                )}


                {/* Senha */}
                <Input
                  id="password" label="Senha" placeholder="Digite a senha" type={passwordVisibility ? 'text' : 'password'} autoComplete="off"
                  register={register} required={{required: "Preencha a senha"}}
                >
                  <img
                    onClick={() => setPasswordVisibility((prev) => !prev)}
                    src={passwordVisibility ? showPassword : hidePassword}
                    alt={passwordVisibility ? "Esconder Senha" : "Mostrar Senha"}
                    title={passwordVisibility ? "Esconder Senha" : "Mostrar Senha"}
                    className="cursor-pointer" width="24px"
                  />
                </Input>
                {errors.password && (
                  <span className='input-error-text'>{errors.password.message}</span>
                )}

                <button 
                  disabled={isSubmitting} 
                  className={`brand-btn-blue mt-5 w-100 ${isSubmitting ? 'loading' : ''}`} 
                  type="submit">
                    Entrar
                </button>
                {errors.root && <span className='input-error-text'>{errors.root.message}</span>}
            </form>
        </div>

        <div className="row justify-content-center">
            <div className="col-11 col-md-9 col-lg-8 col-xl-7 col-xxl-6 clear-card px-4 px-md-5">
                <div className="d-flex align-items-center gap-3 w-100">
                    <div className="separator bg-support"></div>
                    <p className="f-size-14 fw-500 secondary-text m-0 letter-s-3">OU</p>
                    <div className="separator bg-support"></div>
                </div>

                <Link 
                  to="/forgot-password"
                  className="d-block text-center f-size-14 l-height-18px fw-400 letter-s-3 info-text text-decoration-none hover-underline text-center w-100 pt-4 pb-2">
                    Esqueceu a senha?
                </Link>

                <p className="text-center pt-4 f-size-14 l-height-18px fw-400 primary-text">
                    Não tem uma conta?

                    <Link 
                      to="/register"
                      className="f-size-14 l-height-18px fw-400 info-text text-decoration-none hover-underline ps-1">
                      Cadastre-se
                    </Link>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Login
