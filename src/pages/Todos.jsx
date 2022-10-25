import React, { useState } from "react";
import AddTodo from "../components/Todos/AddTodo";
import FetchTodos from "../components/Todos/FetchTodos";
import { Helmet } from "react-helmet-async";
const Todos = () => {
  const [add, setAdd] = useState(false);
  const addTodo = () => {
    console.log("inside handle add");
    setAdd((prev) => !prev);
    // setAdd(!add);
  };
  return (
    <section className="p-4 md:p-9">
      <Helmet>
        <title>Todos</title>
      </Helmet>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <h2 className="font-bold text-3xl">Your Todos</h2>
          <button
            className="bg-mainbg rounded-full px-5 py-2 ml-3 text-white"
            onClick={addTodo}
          >
            Add todo
          </button>
        </div>
        {add && <AddTodo />}
      </div>
      {console.log("this is infinte")}
      <FetchTodos />
    </section>
  );
};

export default Todos;