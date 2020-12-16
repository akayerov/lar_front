import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import YellowManIcon from '../../icons/YellowMan';

const Status = props => (
    <div>
        <div className="dear-visitor-wrapper">
            <div className="dear-visitor">
                <YellowManIcon />

                <h3>Уважаемый посетитель!</h3>
                <p>Укажите, пожалуйста, свой статус для регистрации</p>
            </div>
        </div>

        <div className="white-content reg-form">
            <div className="form">
                <div className="rowmy">
                    <div className="radio" onClick={() => props.onChange(props.statuses.private)}>
                        <input type="radio" value={props.statuses.private}
                               onChange={ () => props.onChange(props.statuses.private)}
                               checked={ props.value === props.statuses.private} />
                        <label>Частное лицо</label>
                    </div>
                    <div className="radio" onClick={() =>  props.onChange(props.statuses.legal)}>
                        <input type="radio" value={props.statuses.legal}
                               onChange={() => props.onChange(props.statuses.legal) }
                               checked={ props.value === props.statuses.legal} />
                        <label>Юридическое лицо</label>
                    </div>
                </div>

                <div className="row-button">
                    <Link to="/auth" className="yellow button">Отмена</Link>
                    <input type="submit" value="Регистрация" onClick={props.onSubmit} />
                </div>
            </div>
        </div>
    </div>
);

Status.propTypes = {
    value: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default Status;
