import React from 'react';
import ModalWrapper from './ModalWrapper';
import ButtonsBlock from './ButtonsBlock';
import { Input } from '../elements/Inputs';

const EditDirectory = props => (
    <ModalWrapper title={`Переименовать справочник`}>
        <div className="one-col row-332">
            <Input containerClass="row" placeholder='Название справочника' defaultValue={props.data.itemTitle} onChange={props.data.onChangeTitle} />
            <ButtonsBlock>
                <span className="button yellow" onClick={() => {props.data.onRenameDirectory(); props.close()}}>Сохранить</span>
                <span className="button" onClick={props.close}>Отмена</span>
            </ButtonsBlock>
        </div>
    </ModalWrapper>
)

export default EditDirectory;