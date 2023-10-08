import { ReactNode, createContext, useContext, useState } from "react";

export type TodosProvidersProps={
    children:ReactNode
}


export type Todo={
    id:String;
    task:String;
    completed:boolean;
    createdAt:Date;

}
export type TodosContext={
    todos:Todo[]
    handleAddTodo:(task:String)=>void;
    toggleTodo:(id:String)=>void; 
    handleDelete:(id:String)=>void;
}

export const todosContext=createContext<TodosContext| null>(null)
export const TodosProvider=({children}:TodosProvidersProps)=>{
    const[todos,setTodos]=useState<Todo[]>(()=>{
        try {
            const newTodos=localStorage.getItem("todos")|| "[]"
            return JSON.parse(newTodos) as Todo[]
            
        } catch (error) {
            return []
            
        }
    })

    const handleAddTodo=(task:String)=>{
        setTodos((prev)=>{
            const newTodos:Todo[]=[
                {
                    id:Math.random().toString(),
                    task:task,
                    completed:false,
                    createdAt:new Date()

                },
                ...prev 
            ] 
            localStorage.setItem("todos",JSON.stringify(newTodos))   
            
            return newTodos
            

        })

    }

    const toggleTodo=(id:String)=>{
        setTodos((prev)=>{
            let newTodos=prev.map((todo)=>{
                if(todo.id===id)
                {
                    return {...todo,completed:!todo.completed}

                }
                return todo
            })
            localStorage.setItem("todos",JSON.stringify(newTodos))  
            return newTodos
        })
    }
    const handleDelete=(id:String)=>{
        setTodos((prev)=>{
            let newTodos=prev.filter((filterTodo)=>filterTodo.id!=id)
            localStorage.setItem("todos",JSON.stringify(newTodos))   
            return newTodos
        })

    }

    return <todosContext.Provider value={{todos,handleAddTodo,toggleTodo,handleDelete}}>
        {children}
    </todosContext.Provider>
}

export const useTodos=()=>{
    const todosConsumer=useContext(todosContext)
    if(!todosConsumer){
        throw new Error("useTodos use outside of Provider")
    }
    return todosConsumer
}