import mongoose from 'mongoose';


const assignmentSchema = new mongoose.Schema({
    assignmentName: {type: String, required: true},
    description: {type: String, required: false},
    assignmentId: {type: String, required: true},
    dueDate: {type: Date, required: true},
    assignedDate: {type: Date, required: true, default: Date.now()},
    studentIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true}],
    teacherId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    classRoomId: {type: mongoose.Schema.Types.ObjectId, ref: 'classroom', required: true},
    maxGrade: {type: Number, required: false},
    questions: {type: String, required: true},
    classroomName: {type: String, required: true},
    submissions: [{type: mongoose.Schema.Types.ObjectId, ref: 'studentAssignment', required: false}],
});

export default mongoose.model('assignment', assignmentSchema);