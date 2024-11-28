import React from 'react'
import arrowLeft from '@assets/icons/arrow-left.svg'
import logoWithText from '@assets/logo/logo-with-text.png'
import showPassword from '@assets/icons/show-password.svg'
import hidePassword from '@assets/icons/hide-password.svg'
import { useForm } from 'react-hook-form'
import Input from '../form/Input'
import InputWithMask from '../Form/InputWithMask'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router";

const Register = () => {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm()
  const [passwordVisibility, setPasswordVisibility] = React.useState(false)
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log(data)
      navigate('/login')
    }
    catch (error) {
      setError("root", {
        message: error.message
      })
    }
  }

  return (
    <div className="container fade-in py-5">
        <div className="row justify-content-center">
            <div className="col-11 col-md-9 col-lg-8 col-xl-7 col-xxl-6 clear-card px-4 py-2 px-md-5 d-flex align-items-center justify-content-between gap-4">
                <button
                 onClick={() => navigate(-1)} 
                 className="border-0 shadow-none bg-transparent p-0" 
                 title="Voltar">
                    <img src={arrowLeft} alt="Voltar" width="24px" className="d-block"/>
                </button>
                <img src={logoWithText} alt="Logo Likeyou" width="55px" className="d-block"/>
                <div className="d-block ps-3 pe-2"></div>
            </div>
        </div>

        <div className="row justify-content-center">
            <form 
              onSubmit={handleSubmit(onSubmit)}  
              className="col-11 col-md-9 col-lg-8 col-xl-7 col-xxl-6 clear-card px-4 py-4 px-md-5"
              >
                <h2 className="f-size-18 fw-700 primary-text mt-3 mb-3">Criar conta</h2>

                {/* Nome */}
                <Input
                  id="name" label="Nome" placeholder="Digite seu nome"
                  register={register} required={{required: "Preencha o nome"}}
                />
                {errors.name && <span className='input-error-text'>{errors.name.message}</span>}


                {/* CPF */}
                <InputWithMask
                  id="cpf" mask="999.999.999-99" label="CPF" placeholder="000.000.000-00" type="tel"
                  register={register} required={{
                    required: "Preencha seu CPF",
                    pattern: {
                      value: /\d{3}\.\d{3}\.\d{3}-\d{2}/,
                      message: "CPF inválido"
                    }
                  }}
                />
                {errors.cpf && (
                  <span className='input-error-text'>{errors.cpf.message}</span>
                )}


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


                {/* Celular */}
                <InputWithMask
                  id="phone" mask="(99) 99999-9999" label="Celular" placeholder="(00) 00000-0000" type="tel"
                  register={register}
                  required={{
                    required: "Preencha seu número",
                    pattern: {
                      value: /\(\d{2}\)\s\d{5}-\d{4}/,
                      message: "Número de celular inválido"
                    }
                  }}
                />
                {errors.phone && (
                  <span className='input-error-text'>{errors.phone.message}</span>
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
                    Cadastre-se
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

                <p className="text-center pt-4 f-size-14 l-height-18px fw-400 primary-text">
                    Já tem uma conta?

                    <Link 
                      to="/login"
                      className="f-size-14 l-height-18px fw-400 info-text text-decoration-none hover-underline ps-1">
                      Entrar
                    </Link>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Register
