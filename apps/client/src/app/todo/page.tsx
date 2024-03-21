import SideBar from "../../components/SideBar";
import TodoList from "../../components/TodoList";


const Todo = () => {
  return (
    <>
      <SideBar />
    <div className="flex">
      <div className="w-1/4">
      </div>
      <div className=" w-3/4 p-4">
        <TodoList />
      </div>
    </div>
    </>
  );
};

export default Todo;
