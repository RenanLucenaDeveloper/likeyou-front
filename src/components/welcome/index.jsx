import { FaArrowRight } from "react-icons/fa";

import SmileLikeYou from "./assets/img/smile-likeyou.png";

import "./styles/global.scss";
import "./styles/styles.scss";

export function Welcome() {
  return (
    <div className="container__main">
      <div className="container__content">
        <img src={SmileLikeYou} alt="" />
        <div className="title__actions">
          <div className="content__title">
            <h1>Vamos nos conectar em uma plataforma</h1>
          </div>

          <button className="btn__connect">
            Conectar <FaArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
