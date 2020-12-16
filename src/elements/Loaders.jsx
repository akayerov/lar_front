import React from 'react';

const containerStyle = {textAlign: 'center'};
const smallStyles = {width: '30px', margin: '10px'};
const mediumStyles = {width: '60px', margin: '20px'};

export const HourGlass = props => (
    <div style={containerStyle}>
        <img src="/img/loader.svg" alt="Загрузка..." {...props} />
    </div>
);

export const SmallHourGlass = props => <HourGlass {...props} style={smallStyles} />;
export const MediumHourGlass = props => <HourGlass {...props} style={mediumStyles} />;

export const Spinner = props => (
    <img src="/img/spinner.svg" {...props} alt="Загрузка..." />
);
