import React from 'react';
import UserNameDisplay from '../features/users/UserNameDisplay';
import AddTodo from '../features/todos/AddTodo';
import TodoList from '../features/todos/TodoList';
import LogoutButton from '../features/users/LogOut';
import bee from '../img/bee.png'

const TodoPage = () => {
    return (
        <div>
            <header>
            <img src={bee} alt="" />
            <h1>Redux To-Do List</h1></header>
            <UserNameDisplay/>
            <div className="logout"><LogoutButton/></div>
            <AddTodo />
            <TodoList />
        </div>
    );
};

export default TodoPage;
