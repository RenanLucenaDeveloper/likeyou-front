import React from 'react'
import { useState } from 'react'
import arrowLeft from '@assets/icons/arrow-left.svg'
import logoWithText from '@assets/logo/logo-with-text.png'
import keyIMG from '@assets/icons/key.svg'
import showPassword from '@assets/icons/show-password.svg'
import hidePassword from '@assets/icons/hide-password.svg'
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  // Inputs
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Esconde / Mostra senhas
  const [passwordVisibility, setPasswordVisibility] = React.useState(false)
  const [repeatVisibility, setRepeatVisibility] = React.useState(false)




  // ENVIO DO EMAIL
  const handleEmailSubmit = (e) => {
    e.preventDefault();

    // Valida email
    if (!isValidEmail(email)) {
      setEmailError(true)
      return;
    }

    setLoading(true)

    setTimeout(() => {
      // Chamada API
      setLoading(false)
      setStep(2);
    }, 1000)
  };

  // VERIFICAÇÃO DO CÓDIGO
  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if(!code.length) return
    
    setLoading(true)

    setTimeout(() => {
      // Chamada API
      setLoading(false)
      setStep(3);
    }, 1000)
  };

  // ALTERAÇÃO DA SENHA
  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    // Verifica senhas
    if (
      !password.length || !confirmPassword.length ||
      password !== confirmPassword
    ) {
      return;
    }

    setLoading(true)

    setTimeout(() => {
      // Chamada API
      navigate('/login')
    }, 1000)
  };

  // VALIDA EMAIL
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <div className="container fade-in-left py-5">
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
        <div className="col-11 col-md-9 col-lg-8 col-xl-7 col-xxl-6 clear-card px-4 py-4 px-md-5">
            <h2 className="f-size-18 fw-700 primary-text mt-3 mb-3">Redefinir senha</h2>

            {/* STEP DE EMAIL */}
            {step === 1 && (
              <form autoComplete="off" className="w-100 fade-in" onSubmit={handleEmailSubmit}>
                <p className="f-size-14 l-height-20px fw-400 primary-text mb-3">
                    Um código será enviado para o seu email para redefinir sua senha
                </p>

                <label htmlFor="email" className="fade-in fw-400 primary-text f-size-14 pt-3 mb-2">Email</label>
                <div className="fade-in input-group-custom pe-3">
                  <input 
                    type="email" value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="autofill-input autofill" placeholder="email@likeyou.com" 
                    id="email" name="email"/>
                </div>
                {emailError && <span className='input-error-text'>Este email é inválido</span>}

                <button 
                  disabled={loading} 
                  className={`brand-btn-blue mt-5 w-100 ${loading ? 'loading' : ''}`} 
                  type="submit">
                    Enviar
                </button>
              </form>
            )}

            {/* STEP DE VERIFICAÇÃO DE CÓDIGO */}
            {step === 2 && (
              <form autoComplete="off" className="w-100 fade-in" onSubmit={handleCodeSubmit}>
                <p className="f-size-14 l-height-20px fw-400 primary-text mb-3">
                    Um código foi enviado para o email <span className="fw-500">{ email }</span>
                </p>

                <label htmlFor="code" className="fade-in fw-400 primary-text f-size-14 pt-3 mb-2">Código de verificação</label>
                <div className="fade-in input-group-custom pe-3">
                    <input type="tel" value={code} 
                    onChange={(e) => setCode(e.target.value)} 
                    className="autofill-input autofill" placeholder="Digite" 
                    id="code" name="code" autoComplete='off'/>

                    <img src={keyIMG} alt="Código" width="24px"/>
                </div>

                <button 
                  disabled={loading || !code.length} 
                  className={`brand-btn-blue mt-5 w-100 ${loading ? 'loading' : ''}`} 
                  type="submit">
                    Enviar
                </button>
              </form>
            )}

            {/* STEP DE SENHA NOVA */}
            {step === 3 && (
              <form autoComplete="off" className="w-100 fade-in" onSubmit={handlePasswordSubmit}>
                <p className="f-size-14 l-height-20px fw-400 primary-text mb-3">
                    Digite abaixo a sua nova senha, não esqueça de mante-la segura
                </p>

                <label htmlFor="password" className="fade-in fw-400 primary-text f-size-14 pt-3 mb-2">Nova senha</label>
                <div className="fade-in input-group-custom pe-3">
                  <input
                    type={passwordVisibility ? 'text' : 'password'} value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    id="password" name="password" placeholder="Digite a senha" 
                    autoComplete="off"
                    />

                  <img
                    onClick={() => setPasswordVisibility((prev) => !prev)}
                    src={passwordVisibility ? showPassword : hidePassword}
                    alt={passwordVisibility ? "Esconder Senha" : "Mostrar Senha"}
                    title={passwordVisibility ? "Esconder Senha" : "Mostrar Senha"}
                    className="cursor-pointer" width="24px"/>
                </div>


                <label htmlFor="repeatPassword" className="fade-in fw-400 primary-text f-size-14 pt-3 mb-2">Confirme a Nova senha</label>
                <div className="fade-in input-group-custom pe-3">
                  <input
                    type={repeatVisibility ? 'text' : 'password'} value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="repeatPassword" name="repeatPassword" placeholder="Confirme a senha" 
                    autoComplete="off"
                    />

                  <img
                    onClick={() => setRepeatVisibility((prev) => !prev)}
                    src={repeatVisibility ? showPassword : hidePassword}
                    alt={repeatVisibility ? "Esconder Senha" : "Mostrar Senha"}
                    title={repeatVisibility ? "Esconder Senha" : "Mostrar Senha"}
                    className="cursor-pointer" width="24px"/>
                </div>
                {password !== confirmPassword && <span className='input-error-text'>As senhas não conferem</span>}

                <button 
                  disabled={loading} 
                  className={`brand-btn-blue mt-5 w-100 ${loading ? 'loading' : ''}`} 
                  type="submit">
                    Enviar
                </button>
              </form>
            )}
            </div>
        </div>
    </div>
  );
}

export default ForgotPassword
