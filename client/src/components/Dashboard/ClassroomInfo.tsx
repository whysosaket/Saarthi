

const ClassroomInfo = (props: {classroomInfo: any}) => {
  return (
    <div className='md:w-5/6 bg-white bg-opacity-5 p-6 rounded-xl mx-auto'>
        <div className="">
            <h1 className="font-semibold text-xl">{props.classroomInfo.className} (<span className="inline-block">{ props.classroomInfo.classRoomId }</span>)</h1>
            <hr className="my-4" />
            <div className='flex flex-col mb-4 bg-white/10 p-4 rounded-lg'>
                <h1 className="text-xl font-bold text-blue-500">Teacher Information</h1>
                <h1><span className="font-semibold">Teacher:</span> {props.classroomInfo.teacherId.name}</h1>
                <h1><span className="font-semibold">Teacher Email:</span> {props.classroomInfo.teacherId.email}</h1>
            </div>
            <div className='flex flex-col mb-4 bg-white/10 p-4 rounded-lg'>
                <h1 className="text-xl font-bold text-blue-500">Classroom Information</h1>
                <h1><span className="font-semibold">Subject:</span> {props.classroomInfo.subject}</h1>
                <h1><span className="font-semibold">Description:</span> {props.classroomInfo.description}</h1>
            </div>
            <div className='flex flex-col mb-4 bg-white/10 p-4 rounded-lg'>
                <h1 className="text-xl font-bold text-blue-500">Student Information</h1>
                <h1><span className="font-semibold">Total Students:</span> {props.classroomInfo.studentIds.length}</h1>
                <h1><span className="font-semibold">Grade:</span> 0</h1>
            </div>
        </div>
    </div>
  )
}

export default ClassroomInfo