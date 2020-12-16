import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router';

const AuthenticatedRoute = ({component: Component, ...rest}) => (
    <Route render={
        props => rest.auth ? <Component {...props} /> : <Redirect to={rest.fallback || props.location} />
    } {...rest} />
);

AuthenticatedRoute.propTypes = {
    auth: PropTypes.bool,
    path: PropTypes.string,
    component: PropTypes.func,
    fallback: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default connect(
    state => ({
        auth: !!state.user,
    }),
)(AuthenticatedRoute);
