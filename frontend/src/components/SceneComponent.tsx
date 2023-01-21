import {Component} from "react";
import "../styles/SceneStyle.css";
import BicycleComponent from "./BicycleComponent";
import ExerciseBikeComponent from "./ExerciseBikeComponent";

export default class SceneComponent extends Component {
    render() {
        return (
            <>
                <div className="scene">
                    <div className="left-scene-container">
                        <BicycleComponent/>
                    </div>
                    <div className="right-scene-container">
                        <ExerciseBikeComponent/>
                    </div>
                </div>
            </>
        );
    }
}