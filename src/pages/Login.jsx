import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {logIn} from '../redux/actions';

import ContentTitle from '../layout/ContentTitle';
import ManIcon from '../icons/Man';
import LockIcon from '../icons/Lock';
import {GrayInput, YellowInput} from '../elements/Inputs';



class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }


    render() {
        if (this.props.user) return <Redirect to="/me" />;

        const pending = this.props.pending;
        return (
            <div className="content content-100">
                <ContentTitle value="Вход" />

                <form onSubmit={event => {
                    event.preventDefault();
                    pending || this.props.onSubmit(this.state.email, this.state.password);
                }}>
                    <div className="white-content">
                        <div className="form login-form">
                            <ManIcon />

                            <YellowInput type="email" placeholder="E-mail" value={this.state.email} autoComplete='false'
                                         onChange={event => this.setState({email: event.target.value})} />

                            <GrayInput type="password" placeholder="Пароль" value={this.state.password} autoComplete='false'
                                       onChange={event => this.setState({password: event.target.value})}>
                                <LockIcon />
                            </GrayInput>

                            <div className="row-button">
{/*                              <input type="submit" value="Войти" disabled={pending} />  */}
                                <input type="submit" value="Войти" />  
                            </div>
                        </div>

                        <ul className="login-submenu">
                            <li className="item-1">
                                <Link to="/restore" onClick={()=> console.log('restore')}>Забыли пароль?</Link>
                            </li>
                            <li className="item-2">
                                <Link to="/reg" onClick={() => console.log('registration')}>Регистрация</Link>
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
        onSubmit: (email, password) => dispatch(logIn(email, password))
    })
)(Login);
