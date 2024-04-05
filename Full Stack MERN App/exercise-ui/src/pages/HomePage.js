import React from 'react';
import ExerciseList from '../components/ExerciseList';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

function HomePage({setExerciseToEdit}) {

    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const onEdit = async exercise => {
        setExerciseToEdit(exercise);
        navigate("/edit");
    }

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`,{method:'DELETE'});
        if(response.status === 204) {
            const newExercises = exercises.filter(e => e._id !== _id);
            setExercises(newExercises);
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`)
        }
    }

    const loadExercises = async () => {
        const response = await fetch(`/exercises`);
        const data = await response.json();
        setExercises(data);
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
    <>
        <div className='home'>
        <table className='collection-container'>
            <thead>
                <tr>
                    <th>Name</th><th>Reps</th><th>Weight</th><th>Unit</th><th>Date</th><th>Edit</th><th>Delete</th>
                </tr>
            </thead>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
        </table>
        </div>
    </> 
    );
}

export default HomePage;