import { useState } from 'react'
import styles from './PictureInput.module.sass'
import _uniqueId from 'lodash/uniqueId'

interface IPictureInputProps {
    onChange: (avatar: Blob | MediaSource | string | null) => void
    defaultImage: React.ReactNode
    label: string
    id: string
    name: string
}

const PictureInput: React.FC<IPictureInputProps> = ({
    id,
    label,
    defaultImage,
    onChange,
    name
}) => {
    const [_id, setId] = useState(id || _uniqueId('file-'))
    const [showImg, setShowImg] = useState(null)
    const [active, setActive] = useState(false)

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setActive(true)
    }
    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setActive(false)
    }
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if(e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0]
            console.log(file.type)
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files[0]) {
            setShowImg(URL.createObjectURL(e.target.files[0]))
            onChange(e.target.files[0])
            e.target.value = ''
        }
    }

    const handleRemoveImage = () => {
        setShowImg(null)
        onChange('_delete')
    }

    return (
        <div className={`${styles.root} ${active || showImg ? styles.active : ''}`} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
            <input type='file' id={_id} accept="image/*" onChange={handleChange} />
            <label htmlFor={_id}>
                <div className={styles.header}>
                    <p>Click on me to select picture</p>
                    {showImg && <div onClick={handleRemoveImage} className={styles.remove}>x</div>}
                </div>
                <div className={styles.hidden}>
                    {showImg ? <img src={showImg} alt={name} /> : 'Drop here...'}
                </div>
            </label>
        </div>
    )
}

export default PictureInput