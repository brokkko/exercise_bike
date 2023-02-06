import {Component} from "react";
import "../styles/SceneStyle.css";
import BicycleComponent from "./animation/BicycleComponent";
import ExerciseBikeComponent from "./animation/ExerciseBikeComponent";
import GearTable from "./geartable/GearTable";
import GraphicsComponent from "./graphics/GraphicsComponent";
import PhysicsCore from "../physics/PhysicsCore";

type Props = {

}

type State = {
    Tlist: number[];
    bicycleWlist: number[];
}

export default class SceneComponent extends Component {

    state: State;
    props: Props;

    bicyclePhysics: PhysicsCore;
    exerciseBikePhysics: PhysicsCore;

    constructor(props: Props) {
        super(props);

        this.bicyclePhysics = new PhysicsCore();
        this.exerciseBikePhysics = new PhysicsCore();

        this.state = {
            Tlist: [],
            bicycleWlist: []
        }

    }

    startBicycleSimulation = () => {

        const subscriber = (W: number, V: number, F: number, t: number) => {

            //round t and W to 2 digits after comma
            t = Math.round(t * 100) / 100;
            W = Math.round(W * 100) / 100;


            this.setState({
                Tlist: [...this.state.Tlist, t],
                bicycleWlist: [...this.state.bicycleWlist, W]
            })
        }

        this.bicyclePhysics.subscribe(subscriber);
        this.bicyclePhysics.run();

    }

    render() {
        return (
            <>
                <div className="scene">
                    <div className="flex-row">
                        <div className="scene-bicycle-container">
                            <BicycleComponent animationSpeed={this.state.bicycleWlist[this.state.bicycleWlist.length - 1]}/>
                        </div>
                        <div className="bicycle-graphics">
                            <GraphicsComponent x={this.state.Tlist} x_label_name={"t, сек"} y={this.state.bicycleWlist} y_label_name={"W, обороты/сек"} result_label_name={""}/>
                        </div>

                    </div>

                    <button onClick={this.startBicycleSimulation}>
                        start
                    </button>

                    <div className="flex-row">
                        <div className="scene-exercise-bike-container">
                            <ExerciseBikeComponent/>
                        </div>
                        <div className="bicycle-graphics">
                            <GraphicsComponent x={[1, 2, 3]} x_label_name={"x"} y={[1, 2, 3]} y_label_name={"y"} result_label_name={"result"}/>
                        </div>
                    </div>

                </div>

            </>
        );
    }
}