import React from 'react';
import ExerciseRow from './ExerciseRow';
import '../App.css';

function Exercises({exercises, onDelete, onEdit}) {
  return (
    <tbody className="collection-container">
        {exercises.map((exercise, i) => <ExerciseRow exercise={exercise} onDelete={onDelete} onEdit={onEdit}
          key={i} />)}
    </tbody>
  );
}
  
export default Exercises;