import {Component, Suspense} from "react";
import "./SceneStyle.css";
import BicycleComponent from "../animation/BicycleComponent";
import ExerciseBikeComponent from "../animation/ExerciseBikeComponent";
import GearTable from "../geartable/GearTable";
import GraphicsComponent from "../graphics/GraphicsComponent";
import PhysicsCore from "../../physics/PhysicsCore";
import {Level} from "../../Level";

type Props = {
    level: Level
}

type State = {
    Tlist: number[];
    bicycleWlist: number[];
    bicycleFlist: number[];

    tableData: number[][];
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
            bicycleWlist: [],
            bicycleFlist: [],
            tableData: [[]]
        }
    }

    componentDidMount = () => {
        this.loadLevel(this.props.level)
    }

    private loadLevel = (selectedLvl: Level) => {
        switch (selectedLvl) {
            case Level.high_9_11:
                this.setState({
                    tableData: [
                        [1,1,1,1,1,1],
                        [1,1,1,1,1,1],
                        [1,1,1,1,1,1],
                    ]
                })
                break

            case Level.middle_6_8:
                this.setState({
                    tableData: [
                        [1,1,1,1,1,1],
                        [1,1,1,1,1,1],
                        [1,1,1,1,1,1]
                    ]
                })
                break

            case Level.low_1_5:
                this.setState({
                    tableData: [
                        [1,1,1,1],
                        [1,1,1,1],
                        [1,1,1,1]
                    ]
                })
                break

            default:
                throw new Error("Unknown level")

        }
    }

    startBicycleSimulation = () => {

        const subscriber = (W: number, V: number, F: number, t: number) => {

            //round t and W to 2 digits after comma
            t = Math.round(t * 100) / 100;
            W = Math.round(W * 100) / 100;
            F = Math.round(F * 100) / 100;

            this.setState({
                Tlist: [...this.state.Tlist, t],
                bicycleWlist: [...this.state.bicycleWlist, W],
                bicycleFlist: [...this.state.bicycleFlist, F]
            })
        }

        this.bicyclePhysics.subscribe(subscriber);
        this.bicyclePhysics.run();
    }

    tableChange = (x: number, y: number, newValue: number) => {

        let tableData = this.state.tableData
        tableData[x][y] = newValue

        this.setState({
            tableData: tableData
        })
    }

    render() {

        let sum = 0
        this.state.tableData.forEach((row) => {
            row.forEach((value) => {
                sum += value
            })
        })

        return (
            <div className="page" style={{overflow: "hidden"}}>

                <div className="title">
                   Описание
                    <button onClick={this.startBicycleSimulation}> Начать </button>
                </div>

                <div className="bicycle-scene-container">
                    <div className="top-graph" style={{width: "100%", height: "20rem"}}>
                        <GraphicsComponent x={this.state.Tlist} x_label_name={"t, сек"} y={this.state.bicycleFlist}
                                           y_label_name={"F, сила"} result_label_name={""}
                                           max_y={this.state.bicycleFlist[this.state.bicycleFlist.length - 1] > 10 ?
                                               this.state.bicycleFlist[this.state.bicycleFlist.length - 1] : 10}
                                           max_x={1.5}/>
                    </div>
                    <BicycleComponent animationSpeed={this.state.bicycleWlist[this.state.bicycleWlist.length - 1]}/>
                    <div style={{width: "100%", height: "20rem"}}>
                        <GraphicsComponent x={this.state.Tlist} x_label_name={"t, сек"}
                                           y={this.state.bicycleWlist} y_label_name={"W, обороты/сек"} result_label_name={""}
                                           max_y={1.5} max_x={1.5}/>
                    </div>

                </div>

                <div className="bicycle-data">
                    Bicycle data
                </div>

                <div className="exercise-scene-container">
                    <div className="top-graph" style={{width: "100%", height: "20rem"}}>
                        <GraphicsComponent x={this.state.Tlist} x_label_name={"t, сек"} y={this.state.bicycleFlist} y_label_name={"F, сила"} result_label_name={""} />
                    </div>
                    <ExerciseBikeComponent/>
                    <div style={{width: "100%", height: "20rem"}}>
                        <GraphicsComponent x={this.state.Tlist} x_label_name={"t, сек"} y={this.state.bicycleWlist} y_label_name={"W, обороты/сек"} result_label_name={""}/>
                    </div>
                </div>

                <div className="exercise-data">
                    Excercise bike data
                </div>

                <div className="table-container">
                    <GearTable key={sum} tableData={this.state.tableData} onChange={this.tableChange}/>
                </div>

            </div>
        );
    }
}