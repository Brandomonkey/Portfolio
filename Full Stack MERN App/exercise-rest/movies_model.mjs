import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

const exerciseSchema = mongoose.Schema({
	name: { type: String, required: true },
	reps: { type: Number, required: true },
	weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
* @param {string} name
* Return true if name exists */
function isNameValid(name) {
    if (name || name.length > 0) return true;
    return false;
}

/**
* @param {int} reps 
* Return true if int is greater than 0 */
function isIntValid(num) {
    if (num > 0) return true;
    return false;
}

/**
* @param {string} unit 
* Return true if unit is kgs or lbs */
function isUnitValid(unit) {
    if (unit == "kgs" || unit == "lbs") return true;
    return false;
}

/**
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers */
function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

function validate(name,reps,weight,unit,date){

    let isValid = true;
    if (!name) isValid = false;
    if (!reps) isValid = false;
    if (!weight) isValid = false;
    if (!unit) isValid = false;
    if (!date) isValid = false;

    if(isValid) {
        if(!isNameValid(name) || !isIntValid(reps) || !isIntValid(weight) || !isUnitValid(unit) || !isDateValid(date))
            isValid = false;
    }

    return isValid;
}

const createExercise = async (name, reps, weight, unit, date) => {

    let exercise;
    let isValid = validate(name,reps,weight,unit,date);
    
    if(isValid) {
        exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
        return exercise.save();
    }
    else {
        const Error = {Error: "Invalid request"};
        return Error;
    }
}

const findUsers = async () => {
    const query = Exercise.find();
    return query.exec();
}

const findExerciseById = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}

const updateUser = async (filter, update) => {
    const isValid = validate(update.name,update.reps,update.weight,update.unit,update.date);
    if (!isValid) {
        const Error = {Error: "Invalid request"};
        return Error;
    }
    const result = await Exercise.updateOne(filter, update);
    const query = Exercise.find(filter);
    if (result.matchedCount === 1){
        return query;
    }
    else {
        const Error = {Error: "Not found"};
        return Error;
    }
}

const deleteUsers = async (filter) => {
    const result = await Exercise.deleteMany(filter);
    return result.deletedCount;
}

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

export { createExercise, findUsers, findExerciseById, updateUser, deleteUsers};