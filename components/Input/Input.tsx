'use client'

import React, { useMemo, useState } from 'react'
import styles from './Input.module.sass'
import _uniqueId from 'lodash/uniqueId'
import _debounce from 'lodash/debounce'

interface IInput {
    id?: string
    name?: string
    label?: string
    type?: string
    onChange?: ({value, name} : {value: string, name: string}) => void
    debounce?: number
    value?: string
}

const Input: React.FC<IInput> = ({
    id,
    name,
    label,
    type = 'text',
    onChange = () => {},
    debounce = 0,
    value
}) => {
    const [_type, setType] = useState(type)
    const [_id] = useState(id || _uniqueId(`input-${type}-`))

    const handleChange = useMemo(() => _debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        onChange({value, name})
    }, debounce), [debounce, onChange])

    return (
        <div className={styles.root}>
            {label && <label htmlFor={id}>{label}</label>}
            <input id={id} name={name} defaultValue={value} onChange={handleChange} type={_type} />
        </div>
    )
}

export default Input