import React from 'react';
import ModalWrapper from './ModalWrapper';
import ButtonsBlock from './ButtonsBlock';

const DeleteItem = props => (
    <ModalWrapper title="Удаление">
        <p style={{padding: '40px 0 0', textAlign: 'center', fontSize: '20px'}}>Вы уверены?</p>
        <ButtonsBlock>
            <span className="button yellow" onClick={() => {props.data.onDelete(); props.close()}}>Да</span>
            <span className="button" onClick={props.close}>Нет</span>
        </ButtonsBlock>
    </ModalWrapper>
);

export default DeleteItem;
