import mongoose from 'mongoose';


const gradeSchema = new mongoose.Schema({
    grade: {type: Number, required: true},
    classroomId: {type: mongoose.Schema.Types.ObjectId, ref: 'classroom', required: true},
});

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    grades: [gradeSchema],
    studentClassroomIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'classroom', required: false}],
    teacherClassroomIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'classroom', required: false}],
    assignmentIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'assignment', required: false}],
    studentAssignments: [{type: mongoose.Schema.Types.ObjectId, ref: 'studentAssignment', required: false}],
    studentId: {type: String, required: true},
    teacherId: {type: String, required: true}
});

export default mongoose.model('user', userSchema);