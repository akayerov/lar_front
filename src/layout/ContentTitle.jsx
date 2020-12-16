import React from 'react';
import PropTypes from 'prop-types';

import {Spinner} from '../elements/Loaders';

const titleStyle = {float: 'left'};
const spinnerLoadingStyle = {float: 'right', width: '30px'};

const ContentTitle = ({loading, ...props}) => (
    <div className="main-title">
        <h2 className={props.className} style={titleStyle}>{props.children || props.value}</h2>
        {loading && <Spinner style={spinnerLoadingStyle} />}
    </div>
);

ContentTitle.propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
    loading: PropTypes.bool,
};

ContentTitle.defaultProps = {
    loading: false,
};

export default ContentTitle;
