import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {restorePassword} from '../redux/actions';

import ContentTitle from '../layout/ContentTitle';
import ManIcon from '../icons/Man';
import {YellowInput} from '../elements/Inputs';

class ResetPassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
        };

      this.signInYandexEvent = this.signInYandexEvent.bind(this)
      this.registrationYandexEvent = this.registrationYandexEvent.bind(this)
      this.continueWithoutRegistrationYandexEvent = this.continueWithoutRegistrationYandexEvent.bind(this)
    }
    signInYandexEvent() {
//        if (typeof yaCounter51259132 !== 'undefined') yaCounter51259132.reachGoal('V1')
    }
    registrationYandexEvent() {
 //       if (typeof yaCounter51259132 !== 'undefined') yaCounter51259132.reachGoal('V3')
    }
    continueWithoutRegistrationYandexEvent() {
  //      if (typeof yaCounter51259132 !== 'undefined') yaCounter51259132.reachGoal('V4')
    }
    render() {
        if (this.props.user) return <Redirect to="/me" />;

        const pending = this.props.pending;
        return (
            <div className="content content-100">
                <ContentTitle value="Вход" />

                <form onSubmit={event => {
                    event.preventDefault();
                    pending || this.props.onSubmit(this.state.email);
                }}>
                    <div className="white-content">
                        <div className="form login-form">
                            <ManIcon />

                            <YellowInput type="email" placeholder="E-mail" value={this.state.email} autoComplete='false'
                                         onChange={event => this.setState({email: event.target.value})} />

                            <div className="row-button">
                                <input type="submit" value="Восстановить" disabled={pending} />
                            </div>
                        </div>

                        <ul className="login-submenu">
                            <li className="item-4">
                                <Link to="/auth" onClick={this.signInYandexEvent}>Войти</Link>
                            </li>
                            <li className="item-2">
                                <Link to="/reg" onClick={this.registrationYandexEvent}>Регистрация</Link>
                            </li>
                            <li className="item-3">
                                <Link to="/unauth" onClick={this.continueWithoutRegistrationYandexEvent}>Продолжить без регистрации</Link>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        );
    }

}

export default connect(
    state => ({
        pending: state.pending.user,
        user: state.user,
    }),
    dispatch => ({
        onSubmit: email => dispatch(restorePassword(email)),
    })
)(ResetPassword);
