import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function CreatePage() {
    const [name, setName] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [unit, setUnit] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate();

    const addExercise = async (e) => {
        e.preventDefault();
        const newExercise = {name,reps,weight,unit,date};
        const response = await fetch('/exercises',{
            method:'POST', 
            body:JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(response.status === 201){
            alert("Exercise Added Successfully!");
        } else{
            alert("Failed to add the exercise.");
        }
        navigate("/");
    }

    return (
    <>
        <div className="update">
            <h2> Create Exercise </h2>
            <form>
                <input type="text" placeholder="Enter name..." value={name} onChange={e=>setName(e.target.value)}/><br/>
                <input type="number" placeholder="Enter reps..." value={reps} onChange={e=>setReps(e.target.value)}/><br/>
                <input type="number" placeholder="Enter weight..." value={weight} onChange={e=>setWeight(e.target.value)}/><br/>
                <select defaultValue={unit} onChange={e=>setUnit(e.target.value)}>
                    <option value="0">Select Unit...</option>
                    <option value="lbs">lbs</option>
                    <option value="kgs">kgs</option>
                </select><br/>
                <input type="text" placeholder="Enter date..." value={date} onChange={e=>setDate(e.target.value)}/><br/><br/>
                <button onClick={addExercise}>Add Exercise</button>
            </form>
        </div>
    </> 
    );
}

export default CreatePage;