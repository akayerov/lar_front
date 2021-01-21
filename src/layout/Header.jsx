import React from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import {Link} from 'react-router-dom';

import ProfileBar from './ProfileBar';

const Header = props => (
    <div className="header-wrapper">
        {/*<CSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={600}*/}
                            {/*transitionEnterTimeout={600} transitionLeaveTimeout={600}>*/}
            <div className="header fade slow">
                <div className="container">
                    <div className="clearfix">
                        <div>
                            <h1 className="logo">
                                <Link to="/">Здесь логотип приложения</Link>
                            </h1>

                            <ProfileBar />
                        </div>
                    </div>
                </div>
            </div>
        {/*</CSSTransitionGroup>*/}
    </div>
);

export default Header;
