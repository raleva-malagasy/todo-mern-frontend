import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import { getAllTodo, addTodo, updateTodo, deleteTodo } from "./utils/HandleApi";

function App() {

  const [todo, setTodo] = useState([])
  const [text, setText] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [todoId, setTodoId] = useState("")

  const updateMode = (_id, text) => {
    setIsUpdating(true)
    setText(text)
    setTodoId(_id)
  }

  useEffect(() => {
    getAllTodo(setTodo)
  }, [])
  return (
    <div className='App'>
      <div className="container">
        <h1> Todo App - M.E.R.N Stack</h1>
        <div className="top">
          <input type="text"
            placeholder="Enter todo ..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="add"
            onClick={isUpdating ?
              () => updateTodo(todoId, text, setTodo, setText, setIsUpdating)
              : () => addTodo(text, setText, setTodo)}>
            {isUpdating ? "UPDATE" : "ADD +"}

          </div>

        </div>
        <div className="list">

          {todo.map((item) => <Todo 
            key={item._id} 
            text={item.text}
            updateMode={ () => updateMode(item._id, item.text)}
            deleteTodo={ () => deleteTodo(item._id, setTodo)} />)}

        </div>
      </div>
    </div>
  )
}

export default App
