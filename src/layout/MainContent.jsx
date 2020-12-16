import React from 'react';

export const MainContent = props => (
    <div className="content-base">
        <div className="container">
            {props.children}
        </div>
    </div>
);

export default MainContent;
