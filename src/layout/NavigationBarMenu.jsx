import React from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const containerStyle = {height: '65px'};

const NavigationBar = props => (
    <div style={containerStyle}>
        <CSSTransitionGroup transitionName="nav" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
            {
                props.user && (
                    <div className="nav" key={1}>
                        <div className="container">
                            <ul className="navbar_menu">
                                <li><Link to="/">Главная</Link></li> 
                                <li><a href="#">Новости</a></li>
                                <li><Link to="/client">Клиенты</Link></li>
                                <li><a href="#">Водитель</a></li>
                                <li><a href="#">Отчеты</a>
                                    <ul>
                                        <li><a href="#">Заказы</a></li>
                                        <li><a href="#">Задания</a></li>
                                        <li><a href="#">Перевозки</a></li>
                                    </ul>
                                </li>
                                {props.user.is_admin && <li><Link to="/testapi">Администратор</Link></li>} 
                                <li><a href="#">О нас</a></li>
                            </ul>
                        </div>
                    </div>
                )
            }
        </CSSTransitionGroup>
    </div>
);

export default connect(
    state => ({
        user: state.user,
    })
)(NavigationBar);
