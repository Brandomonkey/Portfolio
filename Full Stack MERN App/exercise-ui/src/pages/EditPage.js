import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function EditPage({exerciseToEdit}) {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);
    const navigate = useNavigate();

    const editExercise = async (e) => {
        e.preventDefault();
        const newExercise = {name,reps,weight,unit,date};
        const response = await fetch(`/exercises/${exerciseToEdit._id}`,{
            method:'PUT', 
            body:JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(response.status === 200){
            alert("Exercise Edited Successfully!");
        } else{
            alert("Failed to edit the exercise.");
        }
        navigate("/");
    }

    return (
    <>
        <div className="update">
            <h2> Edit Exercise </h2>
            <form>
                <input type="text" value={name} onChange={e=>setName(e.target.value)}/><br/>
                <input type="number" value={reps} onChange={e=>setReps(e.target.value)}/><br/>
                <input type="number" value={weight} onChange={e=>setWeight(e.target.value)}/><br/>
                <select defaultValue={unit} onChange={e=>setUnit(e.target.value)}><br/>
                    <option value="0">Select Unit...</option>
                    <option value="lbs">lbs</option>
                    <option value="kgs">kgs</option>
                </select><br/>
                <input type="text" value={date} onChange={e=>setDate(e.target.value)}/><br/><br/>
                <button onClick={editExercise}>Edit Exercise</button>
            </form>
        </div>
    </> 
    );
}

export default EditPage;