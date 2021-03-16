import React from 'react';
import ModalWrapper from './ModalWrapper';
import ButtonsBlock from './ButtonsBlock';

const Confirm = props => (
    <ModalWrapper title={props.data.activity.title || 'Подтверждение операции'}>
        <p style={{padding: '40px 0 0', paddingTop: '0', textAlign: 'center', fontSize: '20px',
            marginLeft: '25px', marginRight: '25px' }}>
            {props.data.activity.text || 'Вы уверены?'}
        </p>

        <ButtonsBlock>
            <span className="button yellow" onClick={() => {props.data.activity.onConfirm(); props.close()}}>Да</span>
            <span className="button" onClick={props.close}>Нет</span>
        </ButtonsBlock>
    </ModalWrapper>
);

export default Confirm;
