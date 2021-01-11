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
                                        <li><Link to="/template">Шаблон</Link></li>
                                        <li><a href="#">Водитель</a></li>
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
{/*
                                        <li onMouseOver={() => this.onChangePopup(true)}
                                            onMouseOut={() => this.onChangePopup(false)}
                                        >
                                            <a href="#">Отчеты2</a>
                                        </li>
*/}                                        
                                        <li onClick = {() => this.onChangeToogle()}>
                                            <div>
                                              <a href="#">Отчеты2</a>
                                                {
                                                    this.props.user && this.state.popup && (
                                                        <div style={{
                                                            position: "absolute",
                                                            left: '20px',
                                                            top: '20px',
                                                            width: '300px',
                                                            height: '300px',
                                                            backgroundColor: 'blue',
                                                            zIndex: '21'
                                                        }}
                                                        >
                                                            <span>Укажите примечание</span>
                                                        </div>
                                                    )
                                                }
                                            </div>  
                                        </li>
                                        {this.props.user.is_admin && <li><Link to="/testapi">Администратор</Link></li>}
                                        <li><a href="#">О нас</a></li>
                                    </ul>
                                </div>
                            </div>
                        )
                    }
                    {
                        this.props.user && this.state.popup && (
                            <div style={{
                                position:"absolute",
                                left:'500px',
                                top: '200px',
                                width: '300px',
                                height:'300px',
                                backgroundColor:'green',
                                zIndex:15
                          }}
                            >
                                <span>Укажите примечание</span>
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
