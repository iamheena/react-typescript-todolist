import AddTodos from "./components/addtodos"
import NavBar from "./components/navbar"
import TodoData from "./components/todoData"
import "./App.css"

const App = () => {
  return (
    <main>
      <h1>TODO REACT + TYPESCRIPT</h1>
      <NavBar/>
      <AddTodos/>
      <TodoData/>
    </main>
  )
}

export default App