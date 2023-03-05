import {Component} from "react";
import "./BikeSpeedStyle.css";

type SpeedometerProps = {
    left?: string,
    right?: string,
    speed?: number,
    distance?: number,
    color: string
}

export default class BikeSpeedComponent extends Component {
    props: SpeedometerProps;

    constructor(props: SpeedometerProps) {
        super(props);
        this.props = props;
    }
    render() {
        return (
            <>
                <div className="bike-speedometer-container" style={{boxShadow: "0 0 0 1.5rem " + this.props.color}}>
                    <div className="bike-speed-box">
                        <div className="bike-derailleurs bike-left-box">
                            <label
                                className="bike-speed-box-title">
                                Выбранная передача
                            </label>
                            <div className="bike-derailleurs-content">
                                <label>
                                    {this.props.left}
                                </label>
                                <label>
                                    левая
                                </label>
                            </div>
                        </div>
                        <div className="bike-derailleurs bike-right-box">
                            right
                        </div>
                    </div>
                    <div className="bike-speed-box">
                        speed
                    </div>
                    <div className="bike-speed-box">
                        distance
                    </div>
                </div>
            </>
        );
    }
}