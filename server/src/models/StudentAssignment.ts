import mongoose from 'mongoose';


const studentAssignmentSchema = new mongoose.Schema({
    assignment: {type: mongoose.Schema.Types.ObjectId, ref: 'assignment', required: true},
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    grade: {type: Number, required: false},
    submission: {type: String, required: false},
    submittedDate: {type: Date, required: false},
    plagarism: {type: Boolean, required: false},
    similarityIndex: {type: Number, required: false},
    content: {type: String, required: false}
});

export default mongoose.model('studentAssignment', studentAssignmentSchema);