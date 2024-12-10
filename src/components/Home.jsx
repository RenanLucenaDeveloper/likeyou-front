import React from 'react'
import { Link } from 'react-router-dom'
import firstPlaceImg from '@assets/img/first-place-example.avif'
import secondPlaceImg from '@assets/img/second-place-example.webp'
import thirdPlaceImg from '@assets/img/third-place-example.jpg'
import willSmithImg from '@assets/img/will-smith-example.webp'
import likeIcon from '@assets/icons/like.svg'
import dislikeIcon from '@assets/icons/dislike.svg'

const Home = () => {
  return (
    <section className='fade-in container'>
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

      <div className="row pt-5">
        <div className="col pt-3">
          <div className='main-card p-4'>
            <div className="profile-img-container mx-auto mt-2">
              <img src={willSmithImg} alt="Imagem de perfil" width="100%" className="d-block"/>
            </div>

            <p className='f-size-18 l-height-26 fw-600 letter-s-1 primary-text text-center mb-1 pt-3'>
              Willard Carroll Smith
            </p>
            <p className='f-size-16 l-height-24 fw-400 letter-s-1 secondary-text text-center'>
              Ator e Artista
            </p>

            <Link to="/login" className="d-flex align-items-center mx-auto rate-btns-container text-decoration-none mb-2">
              <button
                className='w-100 dislike-btn d-flex align-items-center gap-2'>
                  <img src={dislikeIcon} alt="Não gostei" width="20px" className="d-block"/>
                  30.000
              </button>

              <button
                className='w-100 like-btn d-flex align-items-center justify-content-end gap-2'>
                  30.000
                  <img src={likeIcon} alt="Gostei" width="20px" className="d-block"/>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
