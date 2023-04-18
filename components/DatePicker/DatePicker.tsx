import React from 'react'
import styles from './DatePicker.module.sass'
import _DatePicker from 'react-datepicker'

interface IDatePickerProps {
    value: Date
    onChange: (date: Date) => void
}

const DatePicker: React.FC<IDatePickerProps> = ({
    value = new Date(),
    onChange
}) => {

    return (
        <div className={styles.root}>
            <_DatePicker selected={value} onChange={date => onChange(date)} />
        </div>
    )
}

export default DatePicker