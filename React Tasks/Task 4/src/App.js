import { useState, useRef } from 'react';
import { AiOutlineClose, AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const inputRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTaskId !== null) {
      
      setTasks(tasks.map(task => 
        task.id === editTaskId ? { ...task, text: input } : task
      ));
      setEditTaskId(null); // Exit edit mode
    } else {
      if ( input !== ''){
        const addTask = {
          id: Math.floor(Math.random() * 1000),
          text: input,
          completed: false
        };
        setTasks([...tasks, addTask]);
      }
  }
  console.log(input)
    setInput("")
  };

  const editContent = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setInput(taskToEdit.text);
      setEditTaskId(id); // Set the task ID to be edited
      inputRef.current.focus(); // Focus on the input field for editing
    }
  };

  const deleteTask = (id) => {
    const filteredTask = tasks.filter(task => task.id !== id);
    setTasks(filteredTask);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const date = new Date();
  const Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const Months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function padNumber(num) {
    return ("0" + num).slice(-2);
  }

  return (
    <div className='app'>
      <h1 className='underline-reveal'> Listify</h1>
      <div className='app'>
        
          <h1 className='body'>{Days[date.getDay()]}</h1>
          <h4 className='task-form .btn'>{Months[date.getMonth()]} {date.getDate()} {date.getFullYear()}</h4>
          <p className='timer-box'>{padNumber(date.getHours())}:{padNumber(date.getMinutes())}:{padNumber(date.getSeconds())}</p>
        </div>
      

      <form onSubmit={handleSubmit} className='task-form'>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder='Enter your Task'
          type='text'
          ref={inputRef}
        />
        <button className='btn'>{editTaskId !== null ? 'Save' : 'Add'}</button>
      </form>

      <div className='task-list'>
        {tasks.map(task => (
          <div className={`task-card ${task.completed ? 'completed' : ''}`} key={task.id} onDoubleClick={() => toggleComplete(task.id)}>
            <p className='task-text'>{task.text}</p>
            <button className='edit-btn' onClick={() => editContent(task.id)}>
              <AiOutlineEdit />
            </button>
            <button className='delete-btn' onClick={() => deleteTask(task.id)}>
              <AiFillDelete />
            </button>
          </div>
        ))}
        <p className='length'>{tasks.length < 1 ? 'All Done! 🎉🥳 No More Tasks... for now! Add one more?' : `Tasks: ${tasks.length}`}</p>
      
      </div>
    </div>
  );
}

export default App;
