import React from 'react'
import logoWithText from '@assets/logo/logo-with-text.png'
import { useForm } from 'react-hook-form'
import Input from '../Form/Input'
import { Link } from 'react-router-dom'
import likeIcon from '@assets/icons/like.svg'
import dislikeIcon from '@assets/icons/dislike.svg'
import accountCircle from '@assets/icons/account-circle.svg'
import { useNavigate } from "react-router";
import custom_axios from '@axios/AxiosSetup'
import { toast } from 'react-toastify'
import { getLoginInfo } from '../../utils/login-info'


const FinishRegister = () => {
    const { register, handleSubmit, watch, setError, formState: { errors, isSubmitting } } = useForm()
    const [userInfo, setUserInfo] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const shortDescription = watch("shortDescription");
    let navigate = useNavigate();
  
    // Se tiver logado, retorna as infos do user, se não retorna null
    React.useEffect(() => {
    const loginInfo = getLoginInfo()
    setUserInfo(loginInfo)
    }, [])

    const onSubmit = async (data) => {
      try {
        const response = await custom_axios.put(`/users/${userInfo.sub}`, data)
        navigate('/change-profile-picture')
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
                <div className='w-fit-content d-block'>
                  <img src={logoWithText} alt="Logo Likeyou" width="55px" className="d-block"/>
                </div>
              </div>
          </div>
  
          <div className="row justify-content-center">
              <form 
                onSubmit={handleSubmit(onSubmit)}  
                className="col-11 col-md-9 col-lg-8 col-xl-7 col-xxl-6 clear-card px-4 py-4 px-md-5"
                >
                  <h2 className="f-size-18 fw-700 primary-text mt-3 mb-3">Criar conta</h2>

                  {/* Descrição curta */}
                  <Input
                    id="shortDescription" label="Descrição curta" placeholder="Exemplo: Ator e artista" type="text"
                    register={register} 
                    required={{
                      required: "Preencha uma descrição"
                    }}
                    maxLength="30"
                  />
                  {errors.shortDescription && (
                    <span className='input-error-text'>{errors.shortDescription.message}</span>
                  )}

                  <p className='fw-400 primary-text f-size-14 pt-4 mb-0'>
                    Resultado
                  </p>

                 {userInfo &&
                    <div className="row">
                        <div className="fade-in col-12 col-lg-6 pt-3">
                            <div className='main-card h-100 p-4'>
                                <div className="profile-img-container mx-auto mt-2">
                                    <img src={userInfo.profileImage ? userInfo.profileImage : accountCircle} alt="Imagem de perfil" width="100%" className="d-block"/>
                                </div>
    
                                <p className='f-size-18 l-height-26 fw-600 letter-s-1 primary-text text-center mb-1 pt-3'>
                                {userInfo.username}
                                </p>
                                <p className='f-size-16 l-height-24 fw-400 letter-s-1 secondary-text text-center'>
                                {shortDescription ? shortDescription : <span>&nbsp;</span>}
                                </p>
    
                                <div className="d-flex align-items-center mx-auto rate-btns-container text-decoration-none mb-2">
                                    <button
                                        type='button'
                                        className={`w-100 dislike-btn d-flex align-items-center gap-2`}>
                                        <img src={dislikeIcon} alt="Não gostei" width="20px" className="d-block"/>
                                        100
                                    </button>
        
                                    <button
                                        type='button'
                                        className={`w-100 like-btn d-flex align-items-center justify-content-end gap-2`}>
                                        100
                                        <img src={likeIcon} alt="Gostei" width="20px" className="d-block"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> 
                  }

  
                  <button 
                    disabled={isSubmitting} 
                    className={`brand-btn-blue mt-5 w-100 ${isSubmitting ? 'loading' : ''}`} 
                    type="submit">
                      Entrar
                  </button>
                  {errors.root && <span className='input-error-text'>{errors.root.message}</span>}
              </form>
          </div>
      </div>
    )
}

export default FinishRegister
