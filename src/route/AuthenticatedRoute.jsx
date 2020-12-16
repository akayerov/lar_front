import React from 'react';
import PropTypes from 'prop-types';
import {CSSTransitionGroup} from 'react-transition-group';
import {Route, Redirect, withRouter} from 'react-router';

    {/*<CSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeaveTimeout={200}>*/}
const AuthenticatedRoute = ({component: Component, ...rest}) => (
        <Route {...rest} render={
            props => rest.auth ? <Component {...props} /> : <Redirect to={rest.fallback || props.location} />
        } />
);
    // </CSSTransitionGroup>

AuthenticatedRoute.propTypes = {
    auth: PropTypes.bool,
    path: PropTypes.string,
    component: PropTypes.func.isRequired,
    fallback: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

// export default withRouter(AuthenticatedRoute);
export default AuthenticatedRoute;
