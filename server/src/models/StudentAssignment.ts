import mongoose from 'mongoose';


const studentAssignmentSchema = new mongoose.Schema({
    assignment: {type: mongoose.Schema.Types.ObjectId, ref: 'assignment', required: true},
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    classRoomId: {type: mongoose.Schema.Types.ObjectId, ref: 'classroom', required: true},
    grade: {type: Number, required: false, default: 0},
    submittedDate: {type: Date, required: false, default: Date.now()},
    plagarism: {type: Boolean, required: false, default: false},
    status: {type: String, required: false, default: 'pending'},
    feedback: {type: [String], required: false},
    answer: {type: String, required: true},
    plagarismChance: {type: Number, required: false, default: 0},
    aiProbability: {type: Number, required: false, default: 0},
    dispute: {type: Boolean, required: false, default: false},
    disputeMessage: {type: String, required: false},
});

export default mongoose.model('studentAssignment', studentAssignmentSchema);