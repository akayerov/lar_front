import React from 'react';
import ModalWrapper from './ModalWrapper';
import ButtonsBlock from './ButtonsBlock';

import { Input, Checkbox } from '../elements/Inputs';

const TemlateReport = props => (
    <ModalWrapper title="Настройки шаблона">
        <div className="one-col row-332">
            <Input containerClass="row"
                name="title"
                placeholder="Название"
                defaultValue={props.data.item.title}
                onChange={props.data.inputChange}
            />

            <Checkbox name="print_fiscal" label="Как ежедневный отчет кассира"
                onChange={props.data.setDailyReport}
                checked={props.data.item.is_daily_report} />

        </div>
        <ButtonsBlock>
            <span className="button yellow" onClick={() => { props.data.onSaveData(); props.close() }}>Сохранить</span>
            <span className="button" onClick={props.close}>Закрыть</span>
        </ButtonsBlock>
    </ModalWrapper>
);

export default TemlateReport;