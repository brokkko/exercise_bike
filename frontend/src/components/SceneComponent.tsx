import {Component} from "react";
import "../styles/SceneStyle.css";
import BicycleComponent from "./BicycleComponent";
import ExerciseBikeComponent from "./ExerciseBikeComponent";
import GearTable from "./geartable/GearTable";

export default class SceneComponent extends Component {
    render() {
        return (
            <>
                <div className="scene">
                    {/*<div className="left-scene-container">*/}
                    {/*    <BicycleComponent/>*/}
                    {/*</div>*/}
                    {/*<div className="right-scene-container">*/}
                    {/*    <ExerciseBikeComponent/>*/}
                    {/*    */}
                    {/*</div>*/}
                    <GearTable tableData={[[123,1,1,1,1,1,1,1,1,1],[123,1,1,1,1,1,1,1,1,1],[123,1,1,1,1,1,1,1,1,1],[123,1,1,1,1,1,1,1,1,1],]} onChange={(x,y,n) => {}}/>

                </div>
            </>
        );
    }
}