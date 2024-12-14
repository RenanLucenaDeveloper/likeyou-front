import React from 'react'
import { Link } from 'react-router-dom'
import firstPlaceImg from '@assets/img/first-place-example.avif'
import secondPlaceImg from '@assets/img/second-place-example.webp'
import thirdPlaceImg from '@assets/img/third-place-example.jpg'
import likeIcon from '@assets/icons/like.svg'
import dislikeIcon from '@assets/icons/dislike.svg'
import FilledLikeIcon from '@assets/icons/filled-like.svg'
import FilledDislikeIcon from '@assets/icons/filled-dislike.svg'
import { useNavigate } from "react-router"
import { getLoginInfo } from '../utils/login-info'
import custom_axios from '@axios/AxiosSetup'
import { toast } from 'react-toastify'

const Home = () => {
  const [userInfo, setUserInfo] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [feed, setFeed] = React.useState([])
  const [clientSideFeedbacks, setClientSideFeedbacks] = React.useState([])
  const [givenFeedbacks, setGivenFeedbacks] = React.useState([])
  let navigate = useNavigate();

  // Se tiver logado, retorna as infos do user, se não retorna null
  React.useEffect(() => {
    const loginInfo = getLoginInfo()
    setUserInfo(loginInfo)

    setTimeout(() => {
      getFeed()
    }, 1)
  }, [])

  const getFeed = async () => {    
    try {
      const response = await custom_axios.get(`/users/feed/${userInfo ? userInfo.sub : ''}`)

      const mappedFeedbacks = response.data.map(user => {
        // Se algum user tiver feedback do user logado, adiciona na array
        if(user.givenFeedback) {
          setGivenFeedbacks(() => {
            let actualList = givenFeedbacks
            return [...actualList, {id: user.id, feedback: user.givenFeedback}]
          })

          setClientSideFeedbacks(() => {
            let actualList = clientSideFeedbacks
            return [...actualList, {id: user.id, feedback: user.givenFeedback}]
          })

          user.feedbacks[user.givenFeedback + 's'] = user.feedbacks[user.givenFeedback + 's'] - 1
        }

        return user
      })

      setFeed(mappedFeedbacks)
      console.log(response)
    }
    catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const giveFeedback = async (id, feedback) => {
    if(!userInfo) {
      navigate('/login')
      return
    }
    setLoading(true)
    
    try {
      // Sobe o feedback para a API
      const response = await custom_axios.post(`/feedback/${id}`, {fromUserId: userInfo.sub, feedback})

      // Depois de dar certo, da um feedback visual para o usuário
      setClientSideFeedbacks(() => {
        let actualList = clientSideFeedbacks
        actualList = actualList.filter((feedback) => feedback.id !== id)
        return [...actualList, {id, feedback}]
      })

      setGivenFeedbacks(() => {
        let actualList = givenFeedbacks
        actualList = actualList.filter((feedback) => feedback.id !== id)
        return [...actualList, {id, feedback}]
      })

      setLoading(false)
    }
    catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  const givenDislikes = (id) => {
    const some = clientSideFeedbacks.some((i) => (i.id === id && i.feedback === 'dislike'))
    return some ? 1 : 0
  }

  const givenlikes = (id) => {
    const some = clientSideFeedbacks.some((i) => (i.id === id && i.feedback === 'like'))
    return some ? 1 : 0
  }

  return (
    <section className='fade-in container pt-3 pb-5'>
      <div className="row">
        <div className="col pt-5">
          <h2 className='f-size-14 l-height-20 letter-s-5 fw-400 secondary-text text-center mb-3'>
            Mais votados
          </h2>

          <div className='most-voted'>
            <div className="first">
              <img src={firstPlaceImg} alt="Primeiro lugar" width="100%" className="d-block"/>
            </div>
            <div className="second">
              <img src={secondPlaceImg} alt="Segundo lugar" width="100%" className="d-block"/>
            </div>
            <div className="third">
              <img src={thirdPlaceImg} alt="Terceiro lugar" width="100%" className="d-block"/>
            </div>

            <div className="more">+2</div>
          </div>
        </div>
      </div>

      <ul className="row py-5">
        {feed.length ? 

         feed.map((feedUser) => (
          <li className="fade-in col-12 col-lg-6 pt-3" key={feedUser.id}>
            <div className='main-card h-100 p-4'>
              <div className="profile-img-container mx-auto mt-2">
                <img src={feedUser.profileImage} alt="Imagem de perfil" width="100%" className="d-block"/>
              </div>

              <p className='f-size-18 l-height-26 fw-600 letter-s-1 primary-text text-center mb-1 pt-3'>
                {feedUser.name}
              </p>
              <p className='f-size-16 l-height-24 fw-400 letter-s-1 secondary-text text-center'>
                {feedUser.description ? feedUser.description : <span>&nbsp;</span>}
              </p>

              <div className="d-flex align-items-center mx-auto rate-btns-container text-decoration-none mb-2">
                <button
                  onClick={() => giveFeedback(feedUser.id, 'dislike')}
                  disabled={loading}
                  className={`w-100 dislike-btn d-flex align-items-center gap-2 ${givenDislikes(feedUser.id) ? 'active' : ''}`}>
                    <img src={givenDislikes(feedUser.id) ? FilledDislikeIcon : dislikeIcon} alt="Não gostei" width="20px" className="d-block"/>
                    {feedUser.feedbacks.dislikes + (givenDislikes(feedUser.id))}
                </button>

                <button
                  onClick={() => giveFeedback(feedUser.id, 'like')}
                  disabled={loading}
                  className={`w-100 like-btn d-flex align-items-center justify-content-end gap-2 ${givenlikes(feedUser.id) ? 'active' : ''}`}>
                    {feedUser.feedbacks.likes + (givenlikes(feedUser.id))}
                    <img src={givenlikes(feedUser.id) ? FilledLikeIcon : likeIcon} alt="Gostei" width="20px" className="d-block"/>
                </button>
              </div>
            </div>
          </li>
        ))
        
         :

          <li className='fade-in w-100'>
            <p className='f-size-16 l-height-24 fw-400 letter-s-1 primary-text w-100 text-center'>Carregando...</p>
          </li>
        }
      </ul>
    </section>
  )
}

export default Home
