import React from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const containerStyle = {height: '45px'};

const NavigationBar = props => (
    <div style={containerStyle}>
        <CSSTransitionGroup transitionName="nav" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
            {
                props.user && (
                    <div className="nav" key={1}>
                        <div className="container">
                            <ul>
                                <li><Link to="/Client">Клиенты</Link></li>
                                <li><Link to="/ClientCar">Транспорт</Link></li>
                                <li><Link to="/ClientCar">Заказы</Link></li>
                                <li><Link to="/Task">Задания</Link></li>
                                <li><Link to="/Отчеты">Отчеты</Link></li>
                                <li><Link to="/activity">Покупка и бронирование</Link></li>
                                {props.user && <li><Link to="/me/tickets">Мои билеты</Link></li>}
                                {props.user && <li><Link to="/me">Мой профиль</Link></li>}
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
