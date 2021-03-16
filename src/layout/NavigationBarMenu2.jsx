import ReactDOM from 'react-dom'
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const containerStyle = { height: '65px' };

class NavigationBarMenu2 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            popup: false
        };
        this.onChangePopup = this.onChangePopup.bind(this);
        this.onChangeToogle = this.onChangeToogle.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
    
    onChangePopup( value) {
      if( this.state.popup != value) { 
          console.log('onChangePopup Value=', value);
          this.setState({ popup: value })
      }    
    }
    onChangeToogle(value) {
        this.setState({ popup: !this.state.popup })
    }
    
    render() {
        console.log('render  state.popup=', this.state.popup);

        return (
            <div style={containerStyle}>
                    {
                        this.props.user && (
                            <div className="nav"  style={{ zIndex:'20'}} key={1}>
                                <div className="container">
                                    <ul className="navbar_menu">
                                        <li><Link to="/">Главная</Link></li>
                                        <li><Link to="/clients">Ларав_Клиенты </Link></li>
                                        <li><Link to="/huki">Хуки</Link></li>
                                        <li><Link to="/huki_redux">Хуки+Redux</Link></li>
                                        <li><Link to="/huki_redux2">Хуки+Redux2</Link></li>
                                        <li><Link to="/websocket">WebSocket</Link></li>
                                        <li><a href="#">Тестовые</a>
                                            <ul>
                                                <li><Link to="/treepage_c">Деревья Custom</Link></li>
                                                <li><Link to="/treepage_m">Деревья Multi</Link></li>
                                                <li><Link to="/treepage_ctrl">Деревья контролируемые</Link></li>
                                                <li><a href="#">Заказы</a></li>
                                                <li><a href="#">Задания</a></li>
                                                <li><a href="#">Перевозки</a></li>
                                            </ul>
                                        </li>
                                        {this.props.user.is_admin && <li><Link to="/testapi">Администратор</Link></li>}
                                        <li><a href="#">О нас</a></li>
                                    </ul>
                                </div>
                            </div>
                        )
                    }
            </div>
        );
    }

}

export default connect(
    state => ({
        user: state.user,
    })
)(NavigationBarMenu2);
