import {motion} from 'framer-motion'
const Classroom = () => {
  return (
    <div className="flex-1 px-2 sm:px-0 w-full">
    <div className="flex justify-between items-center">
      <motion.h3
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-extralight text-white/50"
      >
        Classroom Info
      </motion.h3>
    </div>
      <div className="">
        <div>
                asdajslkj
        </div>
      </div>
  </div>
  )
}

export default Classroom