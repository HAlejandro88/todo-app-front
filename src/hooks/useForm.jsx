import { useState } from 'react'

export const useForm = (initialState = {}) => {
    
    const [values, setValues] = useState(initialState);

    
    const reset = () => setValues(initialState);

    const handledInputChanged = ({ target }) => {
        
        setValues({
            ...values,
            [target.name]: target.value
        })
    }

    return [ values, handledInputChanged, reset ];
}