'use client'

import React, { useState } from 'react'
import styles from './PetForm.module.sass'
import { FEPet } from '@/helpers/types'
import { useAppData } from '@/hooks'
import Input from '../Input/Input'
import Select from '../Select/Select'
import { PetType, DOG_BREEDS } from '@/helpers/constants'
import DatePicker from '../DatePicker/DatePicker'
import PictureInput from '../PictureInput/PictureInput'
import api from '@/utils/axios'

const BREEDS = {
    dog: DOG_BREEDS
}

interface IPetForm {
    petData: FEPet | null | undefined
}

const PetForm: React.FC<IPetForm> = ({
    petData
}) => {
    const { userId } = useAppData()
    const [data, setData] = useState(petData || {
        name: '',
        type: '',
        breed: '',
        birthDate: new Date(),
        avatar: null
    })
    const [avatarFile, setAvatarFile] = useState(null)


    const handleChange = ({ value, name } : { value: string, name: string }) => {
        setData(prev => ({ ...prev, [name]: value }))
    }

    const handleSetAvatar = (avatar: Blob | MediaSource | string | null) => {
        setAvatarFile(avatar)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('type', data.type)
            formData.append('breed', data.breed)
            formData.append('birthDate', data.birthDate)
            formData.append('avatar', avatarFile)
            formData.append('owner', userId)
            console.log('lol')
            const res = await api.post('/pets', formData)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <form className={styles.root} onSubmit={handleSubmit}>
            <Input value={data.name} name='name' onChange={handleChange} />
            <Select value={data.type} name='type' onChange={handleChange}>
                {Object.keys(PetType).map(key => <Select.Item key={key} value={PetType[key]}>{key}</Select.Item>)}
            </Select>
            {data.type && <Select value={data.breed} name='breed' onChange={handleChange}>
                {(BREEDS[data.type]).map(key => <Select.Item key={key} value={key}>{key}</Select.Item>)}
            </Select>}
            <DatePicker value={data.birthDate} onChange={value => handleChange({ value, name: 'birthDate' })} />
            <PictureInput onChange={handleSetAvatar} />
            <button type='submit'>Submit</button>
        </form>
    )
}

export default PetForm