import mongoose from 'mongoose';


const assignmentSchema = new mongoose.Schema({
    assignmentName: {type: String, required: true},
    dueDate: {type: Date, required: true},
    assignedDate: {type: Date, required: true},
    studentIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true}],
    teacherId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    classroomId: {type: mongoose.Schema.Types.ObjectId, ref: 'classroom', required: true},
    maxGrade: {type: Number, required: false}
});

export default mongoose.model('assignment', assignmentSchema);