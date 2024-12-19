import React from 'react'
import arrowLeft from '@assets/icons/arrow-left.svg'
import { useForm } from 'react-hook-form'
import Input from './Form/Input'
import InputWithMask from './Form/InputWithMask'
import { Link } from 'react-router-dom'
import logoutIcon from '@assets/icons/logout.svg'
import editIcon from '@assets/icons/edit.svg'
import likeIcon from '@assets/icons/like.svg'
import dislikeIcon from '@assets/icons/dislike.svg'
import accountCircle from '@assets/icons/account-circle.svg'
import { useNavigate } from "react-router"
import custom_axios from '@axios/AxiosSetup'
import { toast } from 'react-toastify'
import { getLoginInfo } from '../utils/login-info'

const EditProfile = () => {
    const { register, handleSubmit, watch, reset, setError, formState: { errors, isSubmitting } } = useForm()
    const [loginInfo, setLoginInfo] = React.useState(null)
    const [userInfo, setUserInfo] = React.useState(null)
    const name = watch("name");
    const shortDescription = watch("shortDescription");
    let navigate = useNavigate();

    // Se tiver logado, retorna as infos do user, se não retorna null
    React.useEffect(() => {
        const loginInfoResponse = getLoginInfo()
        setLoginInfo(loginInfoResponse)

        getUserInfo(loginInfoResponse)
    }, [])

    const getUserInfo = async (loginInfo) => {
        try {
            const response = await custom_axios.get(`/users/by-id/${loginInfo.sub}`)
            reset({
                name: response.data.name, 
                shortDescription: response.data.shortDescription
            })
            setUserInfo(response.data)
        }
        catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const onSubmit = async (data) => {
        try {
            // limpa os dados
            data.phone = data.phone.replace(/\D/g, '')

            const response = await custom_axios.put(`/users/${loginInfo.sub}`, data)
            
            toast.success('Perfil editado com sucesso!')
            navigate('/')
        }
        catch (error) {
            toast.error(error.response.data.message)
            setError("root", {
            message: error.response.data.message
            })
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
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
                    <h2 className="f-size-18 fw-700 primary-text m-0">Editar Perfil</h2>
                    <div className="d-block ps-3 pe-2"></div>
                </div>
            </div>
    
            {userInfo &&
                <div className="row justify-content-center">
                    <form 
                    onSubmit={handleSubmit(onSubmit)}  
                    className="col-11 col-md-9 col-lg-8 col-xl-7 col-xxl-6 clear-card px-4 py-4 px-md-5"
                    >
                        {/* Nome */}
                        <Input
                        id="name" label="Nome" placeholder="Digite seu nome"
                        defaultValue={userInfo.name}
                        register={register} required={{required: "Preencha o nome"}}
                        />
                        {errors.name && <span className='input-error-text'>{errors.name.message}</span>}


                        {/* Descrição curta */}
                        <Input
                            id="shortDescription" label="Descrição curta" placeholder="Exemplo: Ator e artista" type="text"
                            defaultValue={userInfo.shortDescription}
                            register={register} 
                            required={{
                            required: "Preencha uma descrição"
                            }}
                            maxLength="30"
                        />
                        {errors.shortDescription && (
                            <span className='input-error-text'>{errors.shortDescription.message}</span>
                        )}


                        {/* Email */}
                        <Input
                        id="email" label="Email" placeholder="email@likeyou.com" type="email"
                        defaultValue={userInfo.email}
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
                        defaultValue={userInfo.phone}
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
        
                        <p className='fw-400 primary-text f-size-14 pt-4 mb-0'>
                        Resultado
                        </p>
                    
                        <div className="row">
                            <div className="fade-in col-12 pt-3">
                                <div className='main-card h-100 p-4'>
                                    <Link to={'/change-profile-picture'} className='d-block edit-profile-picture mx-auto'>
                                        <div className="d-block profile-img-container mx-auto mt-2">
                                            <img src={userInfo.profileImage ? userInfo.profileImage : accountCircle} alt="Imagem de perfil" width="100%" className="d-block"/>
                                            <button title='Editar'>
                                                <img src={editIcon} alt="Editar" className='d-block' width="24"/>
                                            </button>
                                        </div>
                                    </Link>
        
                                    <p className='f-size-18 l-height-26 fw-600 letter-s-1 primary-text text-center mb-1 pt-3'>
                                    {name ? name : <span>&nbsp;</span>}
                                    </p>
                                    <p className='f-size-16 l-height-24 fw-400 letter-s-1 secondary-text text-center'>
                                    {shortDescription ? shortDescription : <span>&nbsp;</span>}
                                    </p>
        
                                    <div className="d-flex align-items-center mx-auto rate-btns-container text-decoration-none mb-2">
                                        <button
                                            type='button'
                                            className={`w-100 dislike-btn d-flex align-items-center gap-2`}>
                                            <img src={dislikeIcon} alt="Não gostei" width="20px" className="d-block"/>
                                            0
                                        </button>
            
                                        <button
                                            type='button'
                                            className={`w-100 like-btn d-flex align-items-center justify-content-end gap-2`}>
                                            0
                                            <img src={likeIcon} alt="Gostei" width="20px" className="d-block"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        
    
                        <button 
                        disabled={isSubmitting} 
                        className={`brand-btn-blue mt-5 w-100 ${isSubmitting ? 'loading' : ''}`} 
                        type="submit">
                            Salvar alterações
                        </button>
                        {errors.root && <span className='input-error-text'>{errors.root.message}</span>}

                        <button 
                        className={`brand-btn-blue danger-btn mt-4 w-100`}
                        onClick={logout}
                        type="button">
                            <img src={logoutIcon} alt="" className='me-3' width={18}/>
                            Sair da conta
                        </button>
                    </form>
                </div>
            }
        </div>
      )
}

export default EditProfile
