import React from 'react';
import ReactDatePicker from 'react-datepicker';

//export const DatePicker = props => <ReactDatePicker dateFormat="DD.MM.YYYY" {...props} locale="ru-ru" />;
export const DatePicker = props => <ReactDatePicker dateFormat="dd.MM.YYYY" {...props} locale="ru-ru" />;

class StaticSpan extends React.PureComponent {
    render() {
        const value = this.props.value || this.props.staticValue || 'дата';
        return <span onClick={this.props.onClick}>{value}</span>
    }
}

export const StaticDatePicker = ({staticValue, ...props}) => <DatePicker {...props} customInput={<StaticSpan staticValue={staticValue} />} />;

export default DatePicker;
