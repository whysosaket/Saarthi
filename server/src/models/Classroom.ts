import mongoose from 'mongoose';


const classroomSchema = new mongoose.Schema({
    className: {type: String, required: true},
    teacherId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    studentIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true}],
    classRoomId: {type: String, required: true},
    assignments: [{type: mongoose.Schema.Types.ObjectId, ref: 'assignment', required: false}],
    subject: {type: String, required: true},
    description: {type: String, required: false}
});

export default mongoose.model('classroom', classroomSchema);