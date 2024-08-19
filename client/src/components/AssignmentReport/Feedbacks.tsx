import {motion} from 'framer-motion'

const Feedbacks = (props: {feedbacks: any}) => {
  return (
    <motion.div
    initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
     className="w-4/5 bg-white/5 rounded-xl mt-8 md:mt-0 px-8 md:p-8 mx-auto">
        <div className="text-white text-3xl font-semibold">
          {/* {assignment.assignmentName} */} Feedbacks
        </div>
        <div className="text-white  text-sm font-extralight my-3 md:p-4 rounded md:h-52 overflow-y-scroll">
            {
                props.feedbacks.map((feedback: any, index: number) => {
                    return (
                        <motion.div
                        initial={{opacity: 0.0, x: 50+index*20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.3, delay: index*0.1}}
                        key={index} className="flex justify-between  items-center mb-4 bg-white/10 px-4 p-2 md:p-4 rounded-3xl">
                            <p>{feedback}</p>
                        </motion.div>
                    )
                }
            )
            }
        </div>
    </motion.div>
  )
}

export default Feedbacks