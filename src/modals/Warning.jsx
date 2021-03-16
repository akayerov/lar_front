import React from 'react';
import ModalWrapper from './ModalWrapper';
import ButtonsBlock from './ButtonsBlock';

const Warning = props => (
    <ModalWrapper title="Внимание!">
        <div className="one-col row-332">
            <div className="row">
                <p className="warning-message">
 {/*                {props.data.message}  */ }
                </p>
            </div>
        </div>

        <ButtonsBlock>
            <span className="button yellow" onClick={props.close}>Закрыть</span>
        </ButtonsBlock>
    </ModalWrapper>
);

export default Warning;