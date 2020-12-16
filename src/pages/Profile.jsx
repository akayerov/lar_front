import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {updateUser} from '../redux/actions';

import ContentTitle from '../layout/ContentTitle';
import SexPicker from '../elements/SexPicker';
import {WhiteInput} from '../elements/Inputs';
import moment from "moment";
import {DatePicker} from "../elements/DatePicker";

class DateInput extends React.PureComponent {
    render() {
        return <WhiteInput type="text" placeholder="01.01.1970" label="Дата рождения" name="birth_date"
                           value={this.props.value}
                           onClick={this.props.onClick} onChange={this.props.onChange} />
    }
}

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            old_password: '',
            new_password: '',
            new_password_confirm: '',
            changePasswordPending: false,
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.canChangePassword = this.canChangePassword.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.onSexChange = this.onSexChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!nextProps.pending) this.setState({user: nextProps.user});
    }

    isValid() {
        const user = this.state.user;
        return (
            user.name && user.name.length > 0 &&
            user.surname && user.surname.length > 0 &&
            user.phone && user.phone.length > 5 && user.phone.length < 12 &&
            user.country && user.country.length > 0 &&
            moment.isMoment(user.birth_date) && user.birth_date.isValid()
        );
    }

    onInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [name]: value,
            }
        }))
    }

    onSexChange(sex) {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                sex,
            }
        }))
    }

    onPhoneChange(event) {
        const value = event.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                phone: value.replace(/\D*/g, ''),
            }
        }))
    }

    canChangePassword() {
        return (
            !this.state.changePasswordPending &&
            this.state.old_password.length > 5 && this.state.new_password.length > 5 &&
            this.state.new_password === this.state.new_password_confirm
        );
    }

    changePassword(event) {
        event.preventDefault();
        if (!this.canChangePassword) return;

        this.setState({changePasswordPending: true});

        fetch(`/api/client/password`, {
            method: 'POST',
            'credentials': 'include',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                old_password: this.state.old_password,
                new_password: this.state.new_password,
            })
        })
            .then(r => r.json())
            .then(data => {
                this.setState({changePasswordPending: false});

                if (!data.error) {
                    this.setState({old_password: '', new_password: '', new_password_confirm: ''});
                    window.toast.success('Пароль изменён');
                } else {
                    if (data.error.code == 1) {
                        this.setState({old_password: ''});
                        window.toast.error('Неверный старый пароль');
                    } else if (data.error.code == 2) {
                        this.setState({new_password: '', new_password_confirm: ''});
                        window.toast.error('Новый пароль некорректен');
                    } else {
                        throw new Error();
                    }
                }
            })
            .catch(() => {
                this.setState({changePasswordPending: false});
                window.toast.error('Произошла ошибка, повторите позднее');
            });
    }

    render() {
        const user = this.state.user;
        const pending = this.props.pending;
        const onSubmit = pending || !this.isValid()
            ? () => {
            }
            : event => {
                event.preventDefault();
                this.props.onSubmit(this.state.user)
            };

        if (!this.props.token || !this.props.user) return <Redirect to="/auth" />;

        return (
            <div className="content content-924">
                <ContentTitle>{this.props.user.name} {this.props.user.surname}</ContentTitle>

                <form onSubmit={onSubmit}>
                    <SexPicker name="sex" value={user.sex} onChange={this.onSexChange} />
                    <div className="white-content reg-form-step-2" style={{paddingBottom: '20px'}}>
                        <div className="form login-form white-input-form">
                            <WhiteInput type="email" value={user.email || ''} label="E-mail" name="email" disabled />

                            <WhiteInput type="text" value={user.surname || ''} label="Фамилия" name="surname"
                                        onChange={this.onInputChange} />
                            <WhiteInput type="text" value={user.name || ''} label="Имя" name="name"
                                        onChange={this.onInputChange} />
                            <WhiteInput type="text" value={user.middle_name || ''} label="Отчество" name="middle_name"
                                        onChange={this.onInputChange} />

                            <DatePicker customInput={<DateInput />} selected={user.birth_date}
                                        onChange={date => this.setState(prevState => ({
                                            user: {
                                                ...prevState.user,
                                                birth_date: date
                                            }
                                        }))} showYearDropdown showMonthDropdown dropdownMode="select" />

                            <WhiteInput type="text" value={user.phone || ''} label="Телефон" name="phone"
                                        placeholder="79609966699"
                                        onChange={this.onPhoneChange} />

                            <WhiteInput type="text" label="Страна" name="country"
                                        value={user.country || ''} onChange={this.onInputChange} />

                            <WhiteInput type="text" label="Город" name="city"
                                        value={user.city || ''} onChange={this.onInputChange} />

                            <div className="rem">&nbsp;</div>
                            <div className="row-button">
                                <input type="submit" value="Обновить" disabled={pending || !this.isValid()} />
                            </div>
                        </div>
                    </div>
                </form>

                <form method="post" onSubmit={this.changePassword}>
                    <div className="white-content reg-form-step-2">
                        <div className="form login-form white-input-form">
                            <WhiteInput type="password" label="Старый пароль"
                                        value={this.state.old_password || ''} onChange={e => this.setState({old_password: e.target.value})} />
                            <WhiteInput type="password" label="Новый пароль"
                                        value={this.state.new_password || ''} onChange={e => this.setState({new_password: e.target.value})} />
                            <WhiteInput type="password" label="Подтвердите новый пароль"
                                        value={this.state.new_password_confirm || ''} onChange={e => this.setState({new_password_confirm: e.target.value})} />

                            <div className="rem">&nbsp;</div>
                            <div className="row-button">
                                <input type="submit" value="Изменить пароль" disabled={!this.canChangePassword()} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

Profile.defaultProps = {
    user: {
        sex: true,
        email: '',
        name: '',
        surname: '',
        middle_name: '',
        country: '',
        city: '',
        height: null,
        weight: null,
        birth_date: moment(),
        phone: '',
    }
};

export default connect(
    state => ({
        token: state.token,
        user: state.user ? {...state.user, birth_date: moment(state.user.birth_date)} : Profile.defaultProps.user,
        pending: state.pending.user,
    }),
    dispatch => ({
        onSubmit: ({email, ...data}) => {
            dispatch(updateUser({
                ...data,
                birth_date: data.birth_date.format('YYYY-MM-DD'),
            }));
        }
    })
)(Profile)
