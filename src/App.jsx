import { TaskForm } from "./components/TaskForm"
import { TaskList } from "./components/TaskList"
import './App.css'
import { useEffect, useState } from "react"


function App() {
  
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState({})
  const [isModify, setIsModify] = useState(false);

  const changeIsUpdate = (isUpdated) => {
    setIsModify(isUpdated);
  };



  const getTask = async () => {
    try {
        const tasks = await (await fetch('https://o6cllc8dxf.execute-api.us-east-1.amazonaws.com/Prod/list')).json()
        return tasks
    }catch(error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getTask().then(response =>  {
        setTasks(response)
    }).catch(error => {
        console.log(error, 'ERROR')
    })
  }, [isModify])

  useEffect(() => {
    //console.log('selectedTask', selectedTask)
  }, [selectedTask])


  const showTask = (task) => {
    setSelectedTask(task)
    console.log(selectedTask)
  }

  return (
    <div className="conatiner">
      <TaskForm selectedTask={selectedTask} setIsUpdated={changeIsUpdate} isUpdated={isModify}/>
      <TaskList tasks={tasks}  setSelectedTask={setSelectedTask} setIsUpdated={changeIsUpdate} isUpdated={isModify}/>
    </div>
  )
}

export default App
