import React from 'react';
import ContentTitle from '../layout/ContentTitle';
import {Link} from 'react-router-dom'

class WithoutReg extends React.Component {

  constructor (props) {
    super(props);

//    this.signInYandexEvent = this.signInYandexEvent.bind(this)
    this.registrationYandexEvent = this.registrationYandexEvent.bind(this)
    this.continueWithoutRegistrationYandexEvent = this.continueWithoutRegistrationYandexEvent.bind(this)
  }

  signInYandexEvent() {
//    if (typeof yaCounter51259132 !== 'undefined') yaCounter51259132.reachGoal('V1')
  }
  registrationYandexEvent() {
//    if (typeof yaCounter51259132 !== 'undefined') yaCounter51259132.reachGoal('V3')
  }
  continueWithoutRegistrationYandexEvent() {
//    if (typeof yaCounter51259132 !== 'undefined') yaCounter51259132.reachGoal('V4')
  }
  render () {
    return (
      <div className="content content-100">
        <ContentTitle>Вход без регистрации</ContentTitle>

        <div className="dear-visitor-wrapper without-reg">
          <div className="dear-visitor">
            <div className="title">
              Не авторизованным клиентами доступен ограниченный список услуг <br/>
              и не действует накопительная скидка
            </div>
            <p>
              Для получения полного перечня услуг, а также скидок и участия в программе лояльности <br/>
              пройдите, пожалуйста, регистрацию или авторизуйтесь
            </p>
          </div>
        </div>
        <form>
          <div className="white-content reg-form">
            <div className="form login-form">
              <div className="row-button">
                <Link to="/activity" className="button">Всё равно продолжить</Link>
              </div>
            </div>
            <ul className="login-submenu two-items">
              <li className="item-4">
                <Link to="/auth" onClick={this.signInYandexEvent}>Войти</Link>
              </li>
              <li className="item-2">
                <Link to="/reg" onClick={this.registrationYandexEvent}>Регистрация</Link>
              </li>
            </ul>
          </div>
        </form>
      </div>
    )
  }
}

export default (WithoutReg);
