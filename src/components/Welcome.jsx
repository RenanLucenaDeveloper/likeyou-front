import React from 'react'
import IMG from '@assets/img/person.svg'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <section 
      className='container-fluid min-h-100dvh 
                 d-flex flex-column align-items-center 
                 justify-content-center fade-in py-5'
      >
      <div className="row">
        <div className="col">
          <img src={IMG} alt="Arte Likeyou" width="150px" className="d-block mx-auto"/>

          <h2 
            className='f-size-20 l-height-30 fw-700 primary-text text-center pt-3 mt-5 mb-4'>
            Entre e começe a avaliar!
          </h2>

          <p 
            className='f-size-16 l-height-24 fw-500 primary-text text-center mb-5 pb-2'
            style={{maxWidth: '383px'}}>
            Crie ou entre na sua conta Likeyou para
            avaliar as pessoas ao seu redor. Compartilhe suas 
            opiniões e descubra o que pensam sobre você!
          </p>

          <Link 
            to="/register"
            className="d-block text-center f-size-16 fw-600 letter-s-3 info-text text-decoration-none hover-underline py-4 mt-2">
              Cadastrar
          </Link>

          <Link 
            to="/login"
            className="d-block text-decoration-none mx-auto"
            style={{maxWidth: '383px'}}>
              <button 
                className="brand-btn-blue w-100 py-3 f-size-16"
                type="button">
                  Entrar
              </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Welcome
