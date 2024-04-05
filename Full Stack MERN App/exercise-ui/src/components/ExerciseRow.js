import React from 'react';
import '../App.css';
import {MdEdit} from 'react-icons/md'
import {MdDeleteForever} from 'react-icons/md';

function Item({exercise, onDelete, onEdit}) {
  return (
    <tr>
      <td className="collection-item">{exercise.name}</td>
      <td className="collection-item">{exercise.reps}</td>
      <td className="collection-item">{exercise.weight}</td>
      <td className="collection-item">{exercise.unit}</td>
      <td className="collection-item">{exercise.date}</td>
      <td className="collection-item"><MdEdit onClick={()=>onEdit(exercise)}/></td>
      <td className="collection-item"><MdDeleteForever onClick={()=>onDelete(exercise._id)}/></td>
    </tr>
  );
}

export default Item;