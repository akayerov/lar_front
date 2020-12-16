import React from 'react';
import PropTypes from 'prop-types';
import {CSSTransitionGroup} from 'react-transition-group';
import {Route, Redirect, withRouter} from 'react-router';

        {/*<CSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeaveTimeout={200}>*/}
const UnauthenticatedRoute = ({component: Component, ...rest}) => {
    return (
            <Route {...rest} render={
                props => !rest.auth ? <Component {...props} /> : <Redirect to={rest.fallback || props.location} />
            } />
    );
};
        {/*</CSSTransitionGroup>*/}

UnauthenticatedRoute.propTypes = {
    auth: PropTypes.bool,
    path: PropTypes.string,
//    component: PropTypes.func.isRequired,
//    component: PropTypes.object.isRequired,
    fallback: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

// export default withRouter(UnauthenticatedRoute);
export default UnauthenticatedRoute;
