import {Component} from "react";
import "../styles/ExerciseBikeStyle.css";

export default class ExerciseBikeComponent extends Component {
    render() {
        return (
            <>
                {/*<div className="ground-container">*/}
                {/*    <div className="ground ground1"></div>*/}
                {/*    <div className="ground ground2"></div>*/}
                {/*    /!*<div className="ground ground3"></div>*!/*/}
                {/*</div>*/}

                <div className="bicycle-container">
                    {/*Back-wheel Section Start*/}
                    <div className="wheel back-wheel">
                        <div className="tire"></div>
                        <div className="rim"></div>
                        <div className="spokes"></div>
                        <div className="spokes"></div>
                        <div className="spokes"></div>
                        <div className="hub"></div>
                    </div>

                    {/*Back-wheel Section Start*/}
                    <div className="wheel front-wheel">
                        <div className="tire"></div>
                        <div className="rim"></div>
                        <div className="spokes"></div>
                        <div className="spokes"></div>
                        <div className="spokes"></div>
                        <div className="hub"></div>
                    </div>

                    <div className="gear">
                        <div className="gear-red"></div>
                        <div className="tube pedal-tube"></div>
                        <div className="pedal"></div>
                    </div>

                    <div className="tube chain-tube"></div>
                    <div className="tube seat-tube-back"></div>
                    <div className="tube seat-tube-front"></div>
                    <div className="tube seat-tube-post"></div>
                    <div className="tube top-tube"></div>
                    <div className="tube top-handlebar-tube"></div>
                    <div className="tube top-handlebar-tube2"></div>
                    <div className="tube down-tube"></div>
                    <div className="tube head-tube-post"></div>
                    <div className="saddle"></div>
                    <div className="handlebars"></div>

                </div>
            </>
        );
    }
}