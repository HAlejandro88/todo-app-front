

import React, {useEffect, useState} from 'react'

export const TaskList = ({tasks, setSelectedTask, setIsUpdated, isUpdated}) => {

    const [toDoList, setToDoList] = useState([])
    const [taskDoing, setDoing] = useState([])
    const [taskDone, setDone] = useState([])


    const handleDeleteTask = async(id) => {
        //setTasks(tasks.filter(t => t.id !== id))
        const deleteTask = await (await fetch(`https://o6cllc8dxf.execute-api.us-east-1.amazonaws.com/Prod/delete/${id}`)).json()
        console.log(deleteTask)
        setIsUpdated(!isUpdated);
    }


  

  useEffect(() => {
    setToDoList(tasks.filter(t => t.taskStatus === 'To Do'));
    setDoing(tasks.filter(t => t.taskStatus === 'Doing'));
    setDone(tasks.filter(t => t.taskStatus === 'Done'));
  }, [tasks])

  return (
    <div className="w-ful my-10 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Tsks List</h2>
        <div className="flex">
            <div className="flex-1 p-4">
                <h2 className="text-xl font-semibold mb-4">To Do</h2>
                <ul className="list-disc pl-4">
                    {
                        toDoList.map(t => (
                            <div key={t.id} className="bg-white rounded-md p-4 shadow-md mt-3" >
                                <h5 className="text-lg font-semibold mb-2">{t.title}</h5>
                                <p className="text-gray-600 mb-2">{t.description}</p>
                                <div className="flex items-center">
                                    <span className="mr-2">Status:</span>
                                    <span className="px-2 py-1 bg-blue-500 text-white rounded-md">{t.taskStatus}</span>
                                </div>
                                <button className="mt-2 px-2 py-1 bg-blue-700 text-white rounded-md ml-2" onClick={() => setSelectedTask(t)}>Update</button>
                                <button className="mt-2 px-2 py-1 bg-red-500 text-white rounded-md" onClick={() => handleDeleteTask(t.id)}>Eliminar</button>
                            </div>
                        ))
                    }
                </ul>
            </div>

            <div className="flex-1 p-4">
                <h2 className="text-xl font-semibold mb-4">Doing</h2>
                <ul className="list-disc pl-4">
                {
                    taskDoing.map(t => (
                        <div key={t.id} className="bg-white rounded-md p-4 shadow-md mt-3">
                                <h5 className="text-lg font-semibold mb-2">{t.title}</h5>
                                <p className="text-gray-600 mb-2">{t.description}</p>
                                <div className="flex items-center">
                                    <span className="mr-2">Status:</span>
                                    <span className="px-2 py-1 bg-gray-500 text-white rounded-md">{t.taskStatus}</span>
                                </div>
                                <button className="mt-2 px-2 py-1 bg-blue-700 text-white rounded-md ml-2" onClick={() => setSelectedTask(t)}>Update</button>
                                <button className="mt-2 px-2 py-1 bg-red-500 text-white rounded-md" onClick={() => handleDeleteTask(t.id)}>Eliminar</button>
                            </div>
                    ))
                    }
                </ul>
            </div>

            <div className="flex-1 p-4">
                <h2 className="text-xl font-semibold mb-4">Done</h2>
                <ul className="list-disc pl-4">
                    {
                        taskDone.map(t => (
                            <div key={t.id} className="bg-white rounded-md p-4 shadow-md mt-3">
                                <h5 className="text-lg font-semibold mb-2">{t.title}</h5>
                                <p className="text-gray-600 mb-2">{t.description}</p>
                                <div className="flex items-center">
                                    <span className="mr-2">Status:</span>
                                    <span className="px-2 py-1 bg-green-500 text-white rounded-md">{t.taskStatus}</span>
                                </div>
                                <button className="mt-2 px-2 py-1 bg-blue-700 text-white rounded-md ml-2" onClick={() => setSelectedTask(t)}>Update</button>
                                <button className="mt-2 px-2 py-1 bg-red-500 text-white rounded-md" onClick={() => handleDeleteTask(t.id)}>Eliminar</button>
                            </div>
                        ))
                    }
                </ul>
            </div>
        </div>
    </div>
  )
}
