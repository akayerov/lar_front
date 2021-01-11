import React from 'react';
import {connect} from 'react-redux';
import ContentTitle from '../layout/ContentTitle';
import {MediumHourGlass} from '../elements/Loaders';
import debounce from 'lodash/debounce';

import { Button } from '@material-ui/core';
import TreeGrid  from '../elements/MaterialUI/Tree/TreeCustom';

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
                    Tree Page Material UI
                </ContentTitle>
                <div style={{ height : '70vh'}}>
                    <TreeGrid/>
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
