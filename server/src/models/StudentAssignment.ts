import mongoose from 'mongoose';


const studentAssignmentSchema = new mongoose.Schema({
    assignment: {type: mongoose.Schema.Types.ObjectId, ref: 'assignment', required: true},
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    classRoomId: {type: mongoose.Schema.Types.ObjectId, ref: 'classroom', required: true},
    grade: {type: Number, required: false},
    submittedDate: {type: Date, required: false, default: Date.now()},
    plagarism: {type: Boolean, required: false},
    similarityIndex: {type: Number, required: false},
    status: {type: String, required: false, default: 'pending'},
    feedback: {type: [String], required: false},
    answer: {type: String, required: true},
    plagarismChance: {type: Number, required: false},
});

export default mongoose.model('studentAssignment', studentAssignmentSchema);