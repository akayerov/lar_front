import React from 'react';
import ModalWrapper from './ModalWrapper';
import ButtonsBlock from './ButtonsBlock';

const EmptyView = props => (
    <ModalWrapper title="Соглашение">
        <ButtonsBlock>
            <span className="button yellow" onClick={props.close}>Закрыть</span>
        </ButtonsBlock>
    </ModalWrapper>
);

export default EmptyView;
