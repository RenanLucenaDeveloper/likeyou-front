import React from 'react'
import AvatarEditor from 'react-avatar-editor'
import arrowLeft from '@assets/icons/arrow-left.svg'
import { useNavigate } from "react-router"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../firebase"
import { getLoginInfo } from '../utils/login-info'
import { toast } from 'react-toastify'
import custom_axios from '@axios/AxiosSetup'

const ChangeProfilePicture = () => {
  const [userInfo, setUserInfo] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  let navigate = useNavigate();
  
  const [image, setImage] = React.useState('')
  const [scale, setScale] = React.useState(100)
  const editor = React.useRef(null);

  // Se tiver logado, retorna as infos do user, se não retorna null
  React.useEffect(() => {
    const loginInfo = getLoginInfo()
    setUserInfo(loginInfo)
  }, [])

  const selectImage = (event) => {
    const file = event.target.files[0]; // Obtém o primeiro arquivo
    if (file) {
      setImage(file);
    } else {
      setImage('');
    }
  };

  const handleScale = (event) => {
    setScale(event.target.value)
  }

  const submit = async () => {
    setLoading(true)
    const canvas = editor.current.getImageScaledToCanvas()

    canvas.toBlob((blob) => {
      submitImageToFirebase(blob)
    }, 'image/jpeg');
  }

  const submitImageToFirebase = async (blob) => {
    console.log(blob)
    const storageRef = ref(storage, `/images${userInfo.sub}`)
    
    try {
      const snapshot = await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(snapshot.ref);
      submitImageUrl(url)
    } catch (error) {
      setLoading(false)
      toast.error('Ocorreu um erro, tente novamente mais tarde')
      console.error('Erro ao fazer upload para o Firebase:', error);
    }
  }

  const submitImageUrl = async(url) => {
    const data = {
      profileImage: url
    }
    try {
      const response = await custom_axios.put(`/users/${userInfo.sub}`, data)
      toast.success("Imagem alterada com sucesso")
      navigate('/')

    } catch (error) {
      setLoading(false)
      toast.error('Ocorreu um erro, tente novamente mais tarde')
      console.error('Erro ao fazer PUT do user na API:', error);
    }
  }

  return (
    <section className='container fade-in py-5'>
        <div className="row mx-auto" style={{maxWidth: '370px'}}>
            <div className="col-12 pb-5 d-flex align-items-center justify-content-between gap-4">
                <button
                 onClick={() => navigate(-1)} 
                 className="border-0 shadow-none bg-transparent p-0" 
                 title="Voltar">
                    <img src={arrowLeft} alt="Voltar" width="20px" className="d-block"/>
                </button>
                <h3 className='w-100 text-center f-size-24 fw-500 m-0'>Perfil</h3>
                <div className="d-block ps-3 pe-2"></div>
            </div>
        </div>

        <div className='row mx-auto' style={{maxWidth: '370px'}}>
            <div className="col">
                { image ?
                    <>
                        <p className='f-size-14 l-height-19 letter-s-3 fw-400 text-secondary mb-2'>
                            Arraste a imagem
                        </p>

                        <AvatarEditor
                            image={image}
                            ref={editor}
                            width={300}
                            height={300}
                            border={20}
                            borderRadius={500}
                            color={[0, 0, 0, 0.8]} // RGBA
                            scale={scale / 100}
                            rotate={0}
                            className='d-block main-card'
                        />

                        <div className='fade-in w-100 px-2 d-flex align-items-center gap-4 pt-4'>
                            <label 
                              htmlFor="scale" 
                              className='fw-500 primary-text f-size-14 text-start text-nowrap'
                              style={{minWidth: '85px'}}>
                                Zoom { scale / 100 }X
                            </label>

                            <input 
                              className='px-0 w-100'
                              type="range" id='scale'
                              min="100" max="200"
                              name='scale'
                              value={scale} 
                              onChange={handleScale} 
                            />
                        </div>

                        <button 
                          disabled={loading} 
                          className={`brand-btn-blue mt-5 w-100 ${loading ? 'loading' : ''}`} 
                          onClick={submit}
                          type="submit">
                            Confirmar
                        </button>
                    </>
                  :
                    <>
                        <div className='fade-in w-100 px-2 pt-4'>
                            <label 
                              htmlFor="image" 
                              className='fw-500 primary-text f-size-20 l-height-30 mb-4'>
                                Selecione uma foto de perfil
                            </label>

                            <input 
                              className='px-0 w-100'
                              type="file" id='image'
                              name='image' accept=".png,.jpeg,.jpg"
                              onChange={selectImage} 
                            />
                        </div>
                    </>
                }
            </div>
        </div>
    </section>
  )
}

export default ChangeProfilePicture
