import React from 'react'
import home from '@assets/icons/home.svg'
import addCircle from '@assets/icons/add-circle.svg'
import search from '@assets/icons/search.svg'
import accountCircle from '@assets/icons/account-circle.svg'
import { Link } from 'react-router-dom'

const Toolbar = () => {
  return (
    <nav className='toolbar'>
      <ul>
        <li>
          <Link to="/home" title='Home'>
            <img src={home} alt="Home" width="24px" className="d-block"/>
          </Link>
        </li>
        <li>
          <Link to="/add" title='Adicionar postagem'>
            <img src={addCircle} alt="Adicionar" width="24px" className="d-block"/>
          </Link>
        </li>
        <li>
          <Link to="/search" title='Pesquisar'>
            <img src={search} alt="Pesquisar" width="24px" className="d-block"/>
          </Link>
        </li>
        <li>
          <Link to="/Welcome" title='Meu Perfil'>
            <img src={accountCircle} alt="Meu Perfil" width="24px" className="d-block"/>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Toolbar
