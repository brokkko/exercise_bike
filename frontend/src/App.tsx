import { useState } from 'react'
import './App.css'
import BicycleComponent from "./components/animation/BicycleComponent";
import ExerciseBikeComponent from "./components/animation/ExerciseBikeComponent";
import SceneComponent from "./components/scenecomponent/SceneComponent";
import {Level} from "./Level";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <SceneComponent level={Level.high_9_11}/>
    </div>
  )
}

export default App
