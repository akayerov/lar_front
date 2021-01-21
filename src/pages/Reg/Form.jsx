import ReactDOM from 'react-dom'
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import InputMask from 'react-input-mask';

import {getCountries, getCities} from '../../api';
import {regUser} from '../../redux/actions';
import SexPicker from '../../elements/SexPicker';
import {GrayInput} from '../../elements/Inputs';
import {DatePicker} from '../../elements/DatePicker';
import moment from 'moment';
import debounce from 'lodash/debounce';
import AutocompleteList from '../../elements/AutocompleteList.jsx';
import ContentTitle from '../../layout/ContentTitle';

const PhoneInput = props => <InputMask {...props} mask="+9 (999) 999 99 99" maskChar="*" />;
const DateMaskedInput = props => <InputMask {...props} mask="99.99.9999" maskChar=" " />;

class DateInput extends React.PureComponent {
    render() {
        return (
            <GrayInput type="text" placeholder="Дата рождения" value={this.props.value} onClick={this.props.onClick}
                       onChange={this.props.onChange} inputComponent={DateMaskedInput} required />
        );
    }
}

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validators = {
    password: {
        isValid: p => p && p.length >= 5,
        error: 'Пароль должен содержать не менее 5 символов',
    },
    name: {
        isValid: p => p && p.length > 0,
        error: 'Не указано Имя',
    },
    surname: {
        isValid: p => p && p.length > 0,
        error: 'Не указана Фамилия',
    },
//    birth_date: {
//        isValid: d => moment.isMoment(d) && d.isValid() && d.isBefore(moment()),
//        error: 'Некорректная дата рождения',
//    },
    phone: {
        isValid: p => p && p.length > 0,
        error: 'Не указан Телефон',
    },
    emailPattern: {
        isValid: e => emailPattern.test(e),
        error: 'Некорректный e-mail',
    },
};

class Form extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            status: null,
            sex: null,
            email: '',
            password: '',
            repeatPassword: '',
            name: '',
            surname: '',
            middle_name: '',
            country: '',
            city: '',
//            birth_date: null,
            birth_date: '',
            phone: '',
            is_admin: false,

            hasMiddleName: true,
            showPasswords: false,
        };

        this.initialBirthDate = moment().year(1991);

        this.onSubmit = this.onSubmit.bind(this);
        this.isValid = this.isValid.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.toggleHasMiddleName = this.toggleHasMiddleName.bind(this);
        this.toggleRoles = this.toggleRoles.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        this.setState({ status: this.props.status });
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node, wrapper) {
        switch (wrapper) {
            case 'country':
                this.wrapperCountryRef = node;
                break;
            case 'city':
            default:
                this.wrapperCityRef = node;
                break;
        }
    }

    isValid() {
        let hasError = false;
        if (this.state.password !== this.state.repeatPassword) {
            window.toast.error('Пароли не совпадают');
            hasError = true;
        }

        for (let name in this.state) {
            if (!validators[name]) continue;
            if (validators[name].isValid(this.state[name])) continue;

            if (validators[name].error) window.toast.error(validators[name].error);
            hasError = true;
        }

        return !hasError;
    }

    onSubmit(event) {
        event.preventDefault();
        if (!this.isValid()) return;
/*
        if (!this.state.countries.find(country => country.title === this.state.country)) {
            window.toast.error('Пожалуйста, укажите страну из списка');
            return;
        }
        if (!this.state.cities.find(city => city.title === this.state.city)) {
            window.toast.error('Пожалуйста, укажите город из списка');
            return;
        }
*/
      
        this.state.birth_date = moment(this.state.birth_date);
        this.props.submit(this.state);
        if (this.props.history) this.props.history.goBack();
    }

    handleChangeName(event) {
        let value = event.target.value.toString().replace(/^\s*/g, '');
        if (value.length) value = value[0].toLocaleUpperCase() + value.slice(1);
        const name = event.target.name;

        this.setState({[name]: value});
    }


    handleClickOutside(e) {
        const hasOwnHandler = e.className === 'autocomplete-item' || e.className === 'autocomplete';
        if (hasOwnHandler) return;

    }

    toggleHasMiddleName() {
        this.setState(prevState => ({
            hasMiddleName: !prevState.hasMiddleName,
            middle_name: !prevState.hasMiddleName ? prevState.middle_name : '',
        }));
    }

    toggleRoles() {
        this.setState(prevState => ({
            is_admin: !prevState.is_admin,
        }));
    }



    toggleShowPasswords() {
        this.setState(prevState => ({
            showPasswords: !prevState.showPasswords,
        }));
    }



    render() {
        const pending = this.props.pending;
        const {hasMiddleName, showPasswords, is_admin } = this.state;

        return (
            <div className="content content-100">
                <ContentTitle className="reg-title">Регистрация</ContentTitle>

                <form onSubmit={this.onSubmit}>
                    <div className="white-content reg-form-step-2">
                        <div className="form login-form">
                            <GrayInput type="email" placeholder="E-mail" required
                                    value={this.state.email} onChange={e => this.setState({email: e.target.value})} />

                            <GrayInput type={showPasswords ? 'text' : 'password'} placeholder="Пароль" required
                                    value={this.state.password}
                                    onChange={e => this.setState({password: e.target.value})}>
                                <a className={`show-password-link ${showPasswords ? 'disabled' : ''}`}
                                style={{left: 263, top: -4}}
                                onClick={this.toggleShowPasswords}>
                                    Показать
                                </a>
                            </GrayInput>
                            <GrayInput type={showPasswords ? 'text' : 'password'} placeholder="Повторить пароль" required
                                    value={this.state.repeatPassword}
                                    onChange={e => this.setState({repeatPassword: e.target.value})} />

                            <GrayInput type="text" placeholder="Фамилия" required value={this.state.surname}
                                    onChange={this.handleChangeName} name="surname" />
                            <GrayInput type="text" placeholder="Имя" required value={this.state.name}
                                    onChange={this.handleChangeName} name="name" />
                            <GrayInput type="text" placeholder="Отчество" value={this.state.middle_name}
                                    onChange={this.handleChangeName} name="middle_name" disabled={!hasMiddleName}
                                    required={hasMiddleName} />
                            <div className="radio" onClick={this.toggleHasMiddleName}
                                style={{padding: 0, marginBottom: 32, marginTop: -10}}>
                                <input type="checkbox" onChange={this.toggleHasMiddleName} checked={!hasMiddleName} />
                                <label style={{fontSize: '1.5rem'}}>Нет отчества</label>
                            </div>

                            <div className="rowmy-date-fix">
{/*
                                <DatePicker customInput={<DateInput />} selected={this.state.birth_date}
                                            onChange={date => this.setState({birth_date: date})} showYearDropdown
                                            showMonthDropdown dropdownMode="select" maxDate={moment()} />
*/}                                             
                                <GrayInput type="date" placeholder="Дата рожденияя" required value={this.state.birth_date}

                                onChange={e => {  
                                                     e.persist();
                                                     console.log('date input=', e);
                                                     this.setState({ birth_date: e.target.value })
                                
                                                  }} name="dateb" />
                            </div>

                            <GrayInput type="text" placeholder="Телефон" inputComponent={PhoneInput} required
                                    value={this.state.phone}
                                    onChange={e => this.setState({phone: e.target.value.replace(/\D*/g, '')})} />

                            <div className="radio" onClick={this.toggleRoles}
                                style={{ padding: 0, marginBottom: 32, marginTop: -10 }}>
                                <input type="checkbox" onChange={this.toggleRoles} checked={is_admin} />
                                <label style={{ fontSize: '1.5rem' }}>Администратор</label>
                            </div>

                            <div className="rem">
                                <img src="img/req.svg" />&nbsp;&nbsp;&nbsp; Поля обязательные для заполнения
                            </div>

                            <div className="row-button">
                                <span className="yellow button" onClick={this.props.onCancel}
                                    style={{margin: '0 2px'}}>Отмена</span>
                                <input type="submit" defaultValue="Регистрация" disabled={pending} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>    
        );
    }

}

Form.propTypes = {
//    onCancel: PropTypes.func.isRequired,
//    status: PropTypes.number.isRequired,
};

export default connect(
    state => ({
        pending: state.pending.user,
    }),
    dispatch => ({
        submit: data => {
            dispatch(regUser({
                ...data,
                birth_date: data.birth_date.format('YYYY-MM-DD'),
            }));
        },
    }),
)(Form);
