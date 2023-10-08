import { useTodos } from "../store/todos"
import {useSearchParams} from 'react-router-dom'

const TodoData = () => {
    const {todos,toggleTodo,handleDelete}=useTodos()
    const [searchParam]=useSearchParams();
    let todosData=searchParam.get("todos")
    let filterData=todos;
    
    if(todosData==="active"){
        filterData=filterData.filter((task)=>!task.completed)
    }
    if(todosData==="completed"){
        filterData=filterData.filter((task)=>task.completed)

    }
    
  return (
   <ul className="main-task">
    {
        filterData.map((todo)=>{
            return <li>
                <input type="checkbox"  id={`todo-${todo.id}`}  checked={todo.completed} onChange={()=>toggleTodo(todo.id)}/>
                <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
                {
                    todo.completed && (
                        <button type="button" onClick={()=>handleDelete(todo.id)}>Delete</button>
                    )
                }


            </li>

        })
    }
   </ul>
  )
}

export default TodoData