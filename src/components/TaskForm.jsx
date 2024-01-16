import React, { useEffect, useState } from 'react'
import {useForm} from '../hooks/useForm'



export const TaskForm = ({selectedTask, setIsUpdated, isUpdated}) => {


    const [formValues, setFormValues] = useState({title: '',
    description: '',
    taskStatus: ['To Do', 'Doing', 'Done'][0]});

    const reset = () => setFormValues({title: '',
    description: '',
    taskStatus: ['To Do', 'Doing', 'Done'][0]});

    const handledInputChanged = ({ target }) => {
        
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(selectedTask.id)
        try {
            if(selectedTask.title) {
                await (await fetch(`https://o6cllc8dxf.execute-api.us-east-1.amazonaws.com/Prod/update/${selectedTask.id}`, {
                    method: 'POST',
                    body: JSON.stringify({title: formValues.title, description: formValues.description, taskStatus: formValues.taskStatus})
                })).json()
                setIsUpdated(!isUpdated);
                reset()
            }
            await (await fetch('https://o6cllc8dxf.execute-api.us-east-1.amazonaws.com/Prod/create', {
                method: 'POST',
                body: JSON.stringify(formValues)
            })).json()
            setIsUpdated(!isUpdated);
            

        } catch(error) {
            throw new Error(error)
        }

        reset()
    }

    const handleSelectChange = (event) => {
        const { value } = event.target;

        formValues.taskStatus = value
        
      };

      useEffect(() => {
        if(selectedTask.title) {
            setFormValues(selectedTask)
        }
        
      }, [selectedTask])


    return (
        <div className="w-full my-10 p-6 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Create or Update your task</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-600 mb-1">Title</label>
              <input type="text" id="title" name="title" className="w-full p-2 border border-gray-300 rounded-md"  onChange={handledInputChanged} value={ formValues.title}/>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-600 mb-1">Description</label>
              <input type="text" id="description" name="description" className="w-full p-2 border border-gray-300 rounded-md" onChange={handledInputChanged} value={formValues.description }/>
            </div>
            <div className="mb-4">
              <label htmlFor="opciones" className="block text-gray-600 mb-1">Status</label>
              <select id="choices" name="choices" className="w-full p-2 border border-gray-300 rounded-md" onChange={handleSelectChange} value={formValues.taskStatus}>
                <option value="To Do">To Do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"> { selectedTask.title ? 'Update' :'Crear' }</button>
          </form>
        </div>
    );
};
