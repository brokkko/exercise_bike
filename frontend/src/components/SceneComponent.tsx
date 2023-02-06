import {Component} from "react";
import "../styles/SceneStyle.css";
import BicycleComponent from "./animation/BicycleComponent";
import ExerciseBikeComponent from "./animation/ExerciseBikeComponent";
import GearTable from "./geartable/GearTable";
import GraphicsComponent from "./graphics/GraphicsComponent";

export default class SceneComponent extends Component {
    render() {
        return (
            <>
                <div className="scene">
                    <div className="flex-row">
                        <div className="scene-bicycle-container">
                            <BicycleComponent/>
                        </div>
                        <div className="bicycle-graphics">
                            <GraphicsComponent x={[1, 2, 3]} x_label_name={"x"} y={[1, 2, 3]} y_label_name={"y"} result_label_name={"result"}/>
                        </div>
                    </div>

                    <div className="flex-row">
                        <div className="scene-exercise-bike-container">
                            <ExerciseBikeComponent/>
                        </div>
                        <div className="bicycle-graphics">
                            <GraphicsComponent x={[1, 2, 3]} x_label_name={"x"} y={[1, 2, 3]} y_label_name={"y"} result_label_name={"result"}/>
                        </div>
                    </div>

                    {/*<GearTable tableData={[[123,1,1,1,1,1,1,1,1,1],[123,1,1,1,1,1,1,1,1,1],[123,1,1,1,1,1,1,1,1,1],[123,1,1,1,1,1,1,1,1,1],]} onChange={(x,y,n) => {}}/>*/}


                </div>

            </>
        );
    }
}