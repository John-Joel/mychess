import { useReducer } from 'react';
import './App.css';
import Board from './components/Board/Board';
import AppContext from './Context/Context';
import { initGameState } from './Constant';
import { reducer } from './Reducer/Reducer';

function App() {
  const [appState, dispatch ] = useReducer(reducer,initGameState);

  const providerState = {
    appState,
    dispatch
  }

  return (
    <AppContext.Provider value={providerState}>
      <div className="App">
      <Board/>
      </div>
    </AppContext.Provider>
   
  );
}

export default App;