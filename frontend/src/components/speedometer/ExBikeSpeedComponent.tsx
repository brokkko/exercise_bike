import {Component} from "react";
import "./ExBikeSpeedStyle.css";

type SpeedometerProps = {
    left?: string,
    right?: string,
    speed?: number,
    distance?: number,
    color: string,
    isBlur?: boolean
}

export default class ExBikeSpeedComponent extends Component {
    props: SpeedometerProps;

    constructor(props: SpeedometerProps) {
        super(props);
        this.props = props;
    }
    render() {
        return (
            <>
                <div className="ex-bike-speedometer-container" style={{boxShadow: "0 0 0 1.5rem " + this.props.color}}>
                    <div className={this.props.isBlur ? "ex-bike-speed-box blur-mode" : "ex-bike-speed-box"}>
                        <div className="ex-bike-table">

                        </div>
                    </div>
                    <div className={this.props.isBlur ? "ex-bike-speed-box-2 blur-mode" : "ex-bike-speed-box-2"}>
                        <text className="inbox-title">speed</text>
                        <section style={{fontSize: "56px"}}>
                            {/*  10 curr speed*/} 10
                            <text style={{fontSize: "20px"}}>KM/H</text>
                        </section>
                    </div>
                    <div className={this.props.isBlur ? "ex-bike-speed-box-2 blur-mode" : "ex-bike-speed-box-2"}>
                        <text className="inbox-title">DISTANCE</text>
                        <section style={{fontSize: "56px"}}>
                            {/*  10 curr dist*/} 10
                            <text style={{fontSize: "20px"}}>KM</text>
                        </section>
                    </div>
                </div>
            </>
        );
    }
}