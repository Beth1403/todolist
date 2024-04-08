import React, { useState } from 'react';
import './AddTodo.css';
import { useAddTaskMutation } from './todosApiSlice';

const AddTodo = () => {
    const [title, setTitle] = useState('');
    const [addTask] = useAddTaskMutation();
    const [description, setDescription] = useState('');



    const handleInputChange = e => {
        setTitle(e.target.value);
    };
    const handleDescriptionChange = e => {
        setDescription(e.target.value);
    };

    const handleAddTodo = async (e) => {
        e.preventDefault();

        if (title.trim() === '') {
            return;
        }

        try {
            await addTask({ title: title, description: description, completed: false }).unwrap();
            setTitle('');
        } catch (error) {

            console.error('Echec d\'ajout de la tâche', error);
        }
    };

    return (
        <form className="add-todo" onSubmit={handleAddTodo}>
            <input
                type="text"
                placeholder="Ajouter un titre"
                value={title}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="Ajouter une description"
                value={description}
                onChange={handleDescriptionChange}
            />
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default AddTodo;
