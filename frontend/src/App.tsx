import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import BicycleComponent from "./components/BicycleComponent";
import ExerciseBikeComponent from "./components/ExerciseBikeComponent";
import SceneComponent from "./components/SceneComponent";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <SceneComponent/>
    </div>
  )
}

export default App