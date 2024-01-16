import { Status } from '../../Constant'
import { useAppContext } from '../../Context/Context'
import { closePopup } from '../../Reducer/Action/popup'
import './Popup.css'
import PromotionBox from './PromotionBox/PromotionBox'

const Popup = () => {
    const {appState,dispatch} = useAppContext()

    if(appState.status === Status.ongoing)
        return null

    const onClosePopup = () => {
         dispatch(closePopup())
    }

    return <div className='popup'>
        <PromotionBox onClosePopup={onClosePopup}/>
    </div>
}

export default Popup