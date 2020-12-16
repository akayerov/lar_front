import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logOut} from '../redux/actions';
// новый правиьно работающий на сервере logout
import { logout1 } from '../redux/actions';

const ProfileBar = props => (
    <ul className="login-menu">
        {
            props.user ?
                (
                    [
                        <li className="profile" key="1">
                            <Link to="/me">{props.user.name} {props.user.surname}</Link>
                        </li>,
                        <li key="2">
                            <a onClick={()=>props.makeLogout(props.token)} style={{cursor: 'pointer'}}>Выход</a>
                        </li>
                    ]
                )
                : <li className="login" data-id="2"><Link to="/auth">Вход</Link></li>
        }

        {
            !props.user &&
            <li className="reg" data-id="3"><Link to="/reg">Регистрация</Link></li>
        }
    </ul>
);

export default connect(
    state => ({
       token: state.token,
       user: state.user,
    }),
    dispatch => ({
        logOut: () => dispatch(logOut()),
        makeLogout: (token) => dispatch(logout1(token)),

    })
)(ProfileBar);
