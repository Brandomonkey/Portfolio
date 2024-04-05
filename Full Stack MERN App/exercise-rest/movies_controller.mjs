import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './movies_model.mjs';

const app = express();

app.use(express.json());

const PORT = process.env.PORT;

app.post("/exercises", asyncHandler(async (req, res) =>{
    const exercise = await exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date);
    if (!exercise.Error)
        res.status(201).json(exercise);
    else
        res.status(400).json(exercise);
}))

app.get("/exercises", asyncHandler(async (req, res) =>{
    const result = await exercises.findUsers();
    res.json(result);
}))

app.get("/exercises/:_id", asyncHandler(async (req, res) =>{
    const exercise = await exercises.findExerciseById({_id:req.params._id});
    if (exercise.length == 1)
        res.json(exercise);
    else 
       res.status(404).json({Error: "Not found"});
}))


app.put("/exercises/:_id", asyncHandler(async (req, res) => {
    const update = { name : req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date};
    const exercise = await exercises.updateUser({_id: req.params._id}, update);
    if (!exercise.Error)
        res.status(200).json(exercise);
    else if (exercise.Error == "Invalid request")
        res.status(400).json(exercise);
    else
        res.status(404).json(exercise);
}))

app.delete("/exercises/:_id", asyncHandler(async (req, res) => {
    const filter = {};
    if (req.params._id !== undefined){
        filter._id = req.params._id;
    }
    const removed = await exercises.deleteUsers(filter);
    if (removed == 0)
        res.status(404).json({Error: "Not found"})
    else
        res.status(204).json({deleteCount: removed});
}))

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});