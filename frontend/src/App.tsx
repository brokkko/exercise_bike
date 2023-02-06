import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import BicycleComponent from "./components/animation/BicycleComponent";
import ExerciseBikeComponent from "./components/animation/ExerciseBikeComponent";
import SceneComponent from "./components/scenecomponent/SceneComponent";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <SceneComponent/>
    </div>
  )
}

export default App
