import React from 'react';
import ModalWrapper from './ModalWrapper';
import ButtonsBlock from './ButtonsBlock';
import { Input } from '../elements/Inputs';



const MultiEditTicket = props => {
//    console.log('MultiEditTicket props=', props);
    const items = props.data.srcColumn.filter((item) => item.editable);
    let value = 0;
    console.log('MultiEditTicket items=', items);
    return (
    <ModalWrapper title={`Выберите колонку`}>
        <div className="one-col row-332">
            <select name='fields' onChange={()=> console.log('On change') } value={value || 0}>
                <option value={0}>Выбрать поле...</option>
                {
                    items.map(item => {
                        return <option key={item.title} value={item.title}>{item.title}</option>
                    })
                }
            </select>


            <ButtonsBlock>
                <span className="button yellow" onClick={() => {  console.log('MultiEditTicket Ok2'); props.close()}}>Сохранить</span>
                <span className="button" onClick={props.close}>Отмена</span>
            </ButtonsBlock>
        </div>
    </ModalWrapper>
    )
}    

export default MultiEditTicket;