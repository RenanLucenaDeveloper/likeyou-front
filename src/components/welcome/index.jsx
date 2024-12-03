import { useState } from "react";

import personImage from "./assets/img/person.svg";

import "./styles/global.scss";
import "./styles/styles.scss";

export function Welcome() {
  const [activeButton, setActiveButton] = useState(0);

  const handleMouseEnter = (index) => {
    setActiveButton(index);
  };

  return (
    <main className="container__main">
      <img src={personImage} alt="Smile face" />

      <div className="container__content">
        <h1>Entre e comece a avaliar!</h1>
        <p>
          Crie sua conta ou faça login para começar a avaliar as pessoas ao seu redor. Compartilhe suas opiniões e descubra o que outros
          pensam sobre você!
        </p>
      </div>

      <div className="container__btns">
        {["Entrar", "Cadastrar"].map((text, index) => (
          <button key={index} className={`btn ${activeButton === index ? "active" : ""}`} onMouseEnter={() => handleMouseEnter(index)}>
            {text}
          </button>
        ))}
      </div>
    </main>
  );
}
