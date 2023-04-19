import React, { useMemo, useState } from 'react'
import styles from './Select.module.sass'
import _uniqueId from 'lodash/uniqueId'
import _debounce from 'lodash/debounce'

interface ISelectProps {
    id?: string
    name?: string
    label?: string
    onChange?: ({value, name}: {value: string, name: string}) => void
    debounce?: number
    value?: string
    children?: React.ReactNode,
    defaultValue?: string
}

interface ISelect extends React.FC<ISelectProps> {
    Item: React.FC<ISelectItemProps>
}

const Select: ISelect = ({
    id,
    name,
    label,
    onChange = () => {},
    debounce = 0,
    value,
    children,
    defaultValue = 'Select'
}) => {
    const [_id] = useState(id || _uniqueId(`select-`))

    const handleChange = useMemo(() => _debounce((e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value, name } = e.target
        onChange({ value, name })
    }, debounce), [debounce, onChange])

    return (
        <div className={styles.root}>
            {label && <label htmlFor={_id}>{label}</label>}
            <select name={name} id={id} onChange={handleChange} defaultValue={value}>
                {defaultValue && <option disabled value=''>{defaultValue}</option>}
                {children}
            </select>
        </div>
    )
}

interface ISelectItemProps {
    id?: string | undefined
    value?: string
    children?: React.ReactNode
}

const Item: ISelect['Item'] = ({
    value,
    children,
    id
}) => {
    
    return (
        <option className={styles.item} value={value} id={id}>
            {children}
        </option>
    )
}

Select.Item = Item

export default Select