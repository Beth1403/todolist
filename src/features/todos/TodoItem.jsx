import React, { useState } from 'react';
import './TodoItem.css';
import { useDeleteTaskMutation, useUpdateTaskStatusMutation } from './todosApiSlice';

const TodoItem = ({ todo }) => {
   
    const [deleteTask] = useDeleteTaskMutation();
    const [updateTaskStatus] = useUpdateTaskStatusMutation();
    const [isCompleted, setIsCompleted] = useState(todo.completed);

    const handleToggle = async () => {      
        await updateTaskStatus({ id: todo.id, completed: !todo.completed }).unwrap();
        setIsCompleted(!isCompleted); 
    };

    const handleDelete = async () => {
        try {
            await deleteTask(todo.id).unwrap();
        } catch (error) {
            console.error('Failed to delete the task:', error);
        }
    };

    return (
        <li className="todo-item">
            <div className="todo-header">
                <label className="custom-checkbox">
                    <input type="checkbox" checked={todo.completed} onChange={handleToggle} className="todo-checkbox" />
                    <span className="checkmark"></span>
                </label>
                <h2 className={`todo-title ${todo.completed ? 'completed' : ''}`}>{todo.title}</h2>
                <div className="todo-description-popup">{todo.description}</div>
            </div>
            <div className="todo-footer">
                <button onClick={handleDelete} className="delete-btn">Supprimer</button>
            </div>
        </li>
    );
};

export default TodoItem;

