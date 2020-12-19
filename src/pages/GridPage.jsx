import React from 'react';
import {connect} from 'react-redux';
import ContentTitle from '../layout/ContentTitle';
import {MediumHourGlass} from '../elements/Loaders';
import debounce from 'lodash/debounce';

import { Button } from '@material-ui/core';
import DataGrid  from '../elements/MaterialUI/DataGrid';

class GridPage extends React.Component {
    constructor(props) {
        super(props);
    }

    

    componentDidMount() {
    }
    render() {
        return (
            <div className="content content-924">
                <ContentTitle className="booking-title">
                    Grid Table Material UI 2
                </ContentTitle>
                <div style={{ height : '70vh'}}>
                    <DataGrid/>
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
)(GridPage);
