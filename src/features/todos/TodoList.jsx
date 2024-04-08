import React, { useEffect, useState } from 'react';
import bee from "../../img/bee.png"
import { useGetTasksQuery } from './todosApiSlice';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = () => {
    const { data: todos, isLoading, isError, refetch } = useGetTasksQuery();
    const [message, setMessage] = useState(null);
    console.log(todos);


    // Gestion du chargement et des erreurs
    useEffect(() => {
        if (isError) setMessage("Erreur pendant le chargement");
    }, [isError]);

    useEffect(() => {
        refetch();
    }, []);

    // Trier les tâches de sorte que les tâches non complétées apparaissent en premier
    const sortedTodos = todos?.slice().sort((a, b) => {
        return (a.completed === b.completed) ? 0 : a.completed ? 1 : -1;
    }) || [];

    return (
        <div className="todo-list">
            {message !== null && <p>{message}</p>}
            <header>
            <img src={bee} alt="" />
            <h1>To-Do List</h1>
            </header>
            <ul>
                {sortedTodos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
