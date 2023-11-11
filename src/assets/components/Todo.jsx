// import { useState } from 'react';
import { useState } from 'react'

import { MdOutlineLibraryAdd } from 'react-icons/md'
import { MdOutlineLibraryAddCheck } from 'react-icons/md'
import { BiSolidEdit } from 'react-icons/bi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import {FiEdit} from 'react-icons/fi'
import './Todo.css';

function Todo() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0)

  const handle = (e) => {
    e.preventDefault();
  }

  const addTodo = () => {
    if (todo !== '') {
      setTodos([...todos, { list: todo, id: Date.now(), status: false }])
      setTodo('')
      console.log(todos);
    }
    if (editId) {
      const editTodo = todos.find((todo) => todo.id === editId)
      const updateTodo = todos.map((to) => to.id === editTodo.id
      ? (to={id: to.id, list : todo}) : (to={id:to.id, list :to.list}))
    setTodos(updateTodo);
    setEditId(0);
    setTodo('');
    }
  }

  const onDelete = (id) => {
    console.log('id is ', id)
    setTodos(todos.filter((to) => to.id !== id)

    )
  }

  const onComplete = (id) => {
    console.log('id is', id)
    let complete = todos.map((list) => {
      if (list.id === id) {
        return ({ ...list, status: !list.status })
      }
      return list
    })
    setTodos(complete)
  }

  const onEdit = (id) => {
    // console.log('id is', id)
    const editTodo = todos.find((to) => to.id === id)
    setTodo(editTodo.list)
    setEditId(editTodo.id)
  }

  return (

    <div className='container'>
      <h2>TODO APP</h2>

      <form className='form-group' onSubmit={handle}>
        <input type="text" value={todo} placeholder='Enter the task...' onChange={(event) => setTodo(event.target.value)} />
        <button onClick={addTodo}>{editId ? <FiEdit/> : <MdOutlineLibraryAdd />}</button>
      </form>
      <div className='list'>
        <ul>
          {
            todos.map((task) => (
              <li key={task.id} className='list-items'>

                <span>
                  <MdOutlineLibraryAddCheck className='list-item-icons' id='complete' title='Complete' onClick={() => onComplete(task.id)} />
                </span>

                <div className='list-item-list' id={task.status ? 'special' : ''}> {task.list} </div>
                <span>  <BiSolidEdit className='list-item-icons' id='edit' title='Edit' onClick={() => onEdit(task.id)} />
                  <RiDeleteBin5Line className='list-item-icons' id='delete' title='Delete' onClick={() => onDelete(task.id)} />
                </span>

              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Todo