import { useModalStore } from "../store/modalStore";
import EditTodoModal from "./Modal";
import SingleTodo from "./SingleTodo";

import { useEffect, useState } from "react";

import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../utils/firebase";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const FetchTodos = () => {
  const [todos, setTodos] = useState([]);

  const [userID, setUserID] = useState(null);

  // const fetcher = (url)=>

  // const { todos, error } = useSWR(
  //   "https://api.github.com/repos/vercel/swr",
  //   fetcher
  // );

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserID(uid);
      } else {
      }
    });
    const fetchTodos = async () => {
      if (userID !== null) {
        const q = query(collection(db, userID), orderBy("createdAt", "desc"));

        const getTodos = onSnapshot(q, (querySnapshot) => {
          let todosArray = [];
          querySnapshot.forEach((doc) => {
            // console.log({...doc.data()});
            todosArray.push({ ...doc.data(), id: doc.id });
            console.log("todos array", todosArray);
          });
          setTodos(todosArray);
        });
        return getTodos;
      }
    };

    fetchTodos();
  }, [userID]);

  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const uid = user.uid;
  //       setUserID(uid);
  //     } else {
  //     }
  //   });
  //   const fetchTodos = async () => {
  //     if (userID !== null) {
  //       const q = query(collection(db, userID), orderBy("createdAt", "desc"));

  //       const getTodos = onSnapshot(q, (querySnapshot) => {
  //         let todosArray = [];
  //         querySnapshot.forEach((doc) => {
  //           // console.log({...doc.data()});
  //           todosArray.push({ ...doc.data(), id: doc.id });
  //           console.log("todos array", todosArray);
  //         });
  //         setTodos(todosArray);
  //       });
  //       return getTodos;
  //     }
  //   };

  //   fetchTodos();
  // }, [userID]);
  const [modalData, setModalData] = useState("");
  const [modalId, setModalId] = useState("");
  const openModal = useModalStore((state) => state.openModal);

  const handleModal = (todo, todoId) => {
    openModal();
    setModalData(todo);
    setModalId(todoId);
  };
  let completedTodosArray = [];

  todos.map((todo) => (todo.isCompleted ? completedTodosArray.push(todo) : ""));
  console.log("completedTodosArray", completedTodosArray);
  return (
    <>
      <EditTodoModal userId={userID} todoId={modalId} todo={modalData} />
      {""}
      {todos.length !== 0 ? (
        <div className="mt-10">
          {completedTodosArray.length === todos.length ? null : (
            <h2 className="text-2xl font-bold">Active Todos</h2>
          )}
          {todos.map(
            (todos) =>
              !todos.isCompleted && (
                <SingleTodo
                  key={todos.id}
                  userId={userID}
                  todoId={todos.id}
                  todo={todos.todo}
                  todoIsCompleted={todos.isCompleted}
                  handleModal={handleModal}
                />
              )
          )}

          {completedTodosArray.length === 0 ? (
            ""
          ) : (
            <h2 className="text-2xl font-bold mt-10">Completed Todos</h2>
          )}

          {todos.map(
            (todos) =>
              todos.isCompleted && (
                <SingleTodo
                  key={todos.id}
                  userId={userID}
                  todoId={todos.id}
                  todo={todos.todo}
                  todoIsCompleted={todos.isCompleted}
                  handleModal={handleModal}
                />
              )
          )}
        </div>
      ) : (
        <p className="mt-20 text-center font-bold text-2xl">
          Start adding your todos!! Your added todos will appear here.
        </p>
      )}
    </>
  );
};

export default FetchTodos;
