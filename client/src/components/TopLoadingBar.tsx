import LoadingBar from 'react-top-loading-bar'
import { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'

const TopLoadingBar = () => {
    const {progress, setProgress} = useContext(GlobalContext);
  return (
    <>
        <LoadingBar
            color='#f11946'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
        />        
    </>
  )
}

export default TopLoadingBar