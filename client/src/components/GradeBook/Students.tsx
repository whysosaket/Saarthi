import { motion } from "framer-motion";
const Students = (props: { classroomInfo: any }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="md:w-4/5 bg-white/5 rounded-xl p-8"
      >
        <div className="text-white text-3xl font-semibold">Students</div>
        <div className="max-h-96 overflow-y-scroll mt-8">
          {props.classroomInfo &&
            props.classroomInfo.studentIds.map(
              (student: any, index: number) => (
                <motion.div
                initial={{opacity: 0.0, x: 50+index*20}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.3, delay: 0.5+index*0.1}}
                key={index} className="my-3 p-4 bg-white/5 rounded-lg">
                  <div className="text-white text-sm font-extralight">
                    <span className="font-semibold mr-3">Name:</span>
                    {student.name}
                  </div>
                  <div className="text-white text-sm font-extralight">
                    <span className="font-semibold mr-3">Email:</span>
                    {student.email}
                  </div>
                </motion.div>
              )
            )}
        </div>
      </motion.div>
    </>
  );
};

export default Students;
