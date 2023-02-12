import {Component} from "react";
import "./SceneStyle.css";
import BicycleComponent from "../animation/BicycleComponent";
import ExerciseBikeComponent from "../animation/ExerciseBikeComponent";
import GearTable from "../geartable/GearTable";
import GraphicsComponent from "../graphics/GraphicsComponent";
import PhysicsCore from "../../physics/PhysicsCore";

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
        this.props = props;

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
            <div className="page">

                <div className="title">
                   Описание

                    <button onClick={this.startBicycleSimulation}> Начать </button>
                </div>

                <div className="bicycle-scene-container">
                    <BicycleComponent animationSpeed={this.state.bicycleWlist[this.state.bicycleWlist.length - 1]}/>
                    <div style={{width: "100%", height: "24rem"}}>
                        <GraphicsComponent x={this.state.Tlist} x_label_name={"t, сек"} y={this.state.bicycleWlist} y_label_name={"W, обороты/сек"} result_label_name={""}/>
                    </div>

                </div>

                <div className="bicycle-data">
                    Bicycle data
                </div>

                <div className="exercise-scene-container">
                    <ExerciseBikeComponent/>
                    <GraphicsComponent x={this.state.Tlist} x_label_name={"t, сек"} y={this.state.bicycleWlist} y_label_name={"W, обороты/сек"} result_label_name={""}/>
                </div>

                <div className="exercise-data">
                    Excercise bike data
                </div>


                <div className="table-container">
                    <GearTable tableData={[[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],]} onChange={(x,y,n) => {}}/>
                </div>

            </div>
        );
    }
}