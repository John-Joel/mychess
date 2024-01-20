import React from 'react';
import { Status } from '../../Constant';
import { useAppContext }from '../../Contexts/Context'
import { closePopup } from '../../Reducer/Action/popup';
import PromotionBox from './PromotionBox/PromotionBox'
import './Popup.css'

const Popup = ({children}) => {

    const { appState : {status}, dispatch } = useAppContext();

    const onClosePopup = () => {
        dispatch(closePopup())
    }
    //if status ongoing nothing change but status we show popup
    if (status === Status.ongoing)
        return null

    return <div className="popup">
        {React.Children
            .toArray(children)
            .map (child => React.cloneElement(child, { onClosePopup }))}
    </div>
}

export default Popup