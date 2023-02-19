import {Component} from "react";
import Plot from 'react-plotly.js';

type GraphicsProps = {
    x: Array<number>;
    x_label_name: string,
    y: Array<number>,
    y_label_name: string,
    result_label_name: string,
    min_x?: number,
    max_x?: number,
    min_y?: number,
    max_y?: number
}

export default class GraphicsComponent extends Component<GraphicsProps> {

    props: GraphicsProps;

    constructor(props: GraphicsProps) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <Plot
                data={[
                    {
                        x: this.props.x,
                        y: this.props.y,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: "rgb(61,29,73)"},
                    },
                ]}
                layout={{
                    xaxis: {
                        automargin: true,
                        tickangle: 90,
                        title: {
                            text: this.props.x_label_name,
                            standoff: 40
                        },
                        range: [this.props.min_x || 0, this.props.max_x]
                    },
                    yaxis: {
                        automargin: true,
                        tickangle: 90,
                        title: {
                            text: this.props.y_label_name,
                            standoff: 40
                        },
                        range: [this.props.min_y || 0, this.props.max_y]
                    },
                    width: 520,
                    height: 410,
                    title: this.props.result_label_name
                } }
            />
        );
    }
}