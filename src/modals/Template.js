import React from 'react';
import ModalWrapper from './ModalWrapper';
import ButtonsBlock from './ButtonsBlock';

import {Input, Checkbox} from '../elements/Inputs';

const Template = props => (
    <ModalWrapper title="Параметры шаблона">
        <div className="one-col row-332">
            <div className="row">
                <select defaultValue={props.data.formatTemplate ? props.data.formatTemplate : 'A6'} onChange={props.data.onChangeFormat}>
                    <option value="A4">A4</option>
                    <option value="A6">A6</option>
                </select>
                <label className="floating">Формат</label>
            </div>

            <Input containerClass="row" placeholder="Название" defaultValue={props.data.ticket.title} onChange={props.data.onTitleChange} />

            <div className="row">
                <label>Обложка шаблона</label>
                <input type="file" onChange={props.data.onLoadCover} />
            </div>

            <Checkbox name="print_fiscal" 
                defaultChecked={props.data.ticket.print_fiscal} 
                onChange={props.data.onChangeCheckbox} 
                label="Печать фискального чека" />

            <Checkbox name="current_template" 
                defaultChecked={props.data.ticket.current_template} 
                onChange={props.data.onChangeCheckbox} 
                label="Шаблон по умолчанию" />

            {/*<div className="row">
                <select>
                    <option selected disabled>Статус</option>
                    <option>Доступен</option>
                    <option>Не доступен</option>
                </select>
                <label className="floating">Статус</label>
            </div>*/}

            {/* <div className="row small-input">
                <input type="text" placeholder="Ш мм" defaultValue={props.data.ticket.ticket_width} disabled />
                <input type="text" placeholder="Д мм" defaultValue={props.data.ticket.ticket_height} disabled />
                <label>Размер</label>
            </div> */}

            {/*<div className="row small-input">
                <input type="text" placeholder="Д мм" />
                <input type="text" placeholder="Ш мм" />
                <label>Размер контрольного корешка</label>
            </div>*/}

            {/*<div className="row">
                <select>
                    <option selected disabled>Контроль</option>
                    <option>Контроль 1</option>
                    <option>Контроль 2</option>
                </select>
                <label className="floating">Контроль</label>
            </div>*/}

        </div>

        <ButtonsBlock>
            <span className="button yellow" onClick={props.close}>Закрыть</span>
        </ButtonsBlock>
    </ModalWrapper>
);

export default Template;
