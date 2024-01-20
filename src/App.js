import './App.css';
import Board from './Components/Board/Board';
import { reducer } from './Reducer/Reducer'
import { useReducer } from 'react'
import { initGameState } from './Constant';
import AppContext from './Contexts/Context'
import Control from './Components/Control/Control';
import TakeBack from './Components/Control/bits/TakeBack';
import MovesList from './Components/Control/bits/MoveList';

function App() {

    //appstate it hold the value and dispatch used to send action to reducer
    const [appState, dispatch ] = useReducer(reducer,initGameState);

    const providerState = {
        appState,
        dispatch
    }

    return (
        <AppContext.Provider value={providerState} >
            <div className="App">
                <Board/>
                <Control>
                    <MovesList/>
                    <TakeBack/>
                </Control>
            </div>
        </AppContext.Provider>
    ); 
}

export default App;