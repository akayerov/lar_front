import React from 'react';
import {connect} from 'react-redux';
import ContentTitle from '../layout/ContentTitle';
import {MediumHourGlass} from '../elements/Loaders';
import debounce from 'lodash/debounce';

class EmptyComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    

    componentDidMount() {
    }

    render() {
        return (
            <div className="content content-924">
                <ContentTitle className="booking-title">
                    Основной контент
                </ContentTitle>

                <div className="pb-list">
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
    }),
    dispatch => ({
    })
)(EmptyComponent);
