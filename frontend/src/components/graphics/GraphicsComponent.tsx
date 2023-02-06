import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ScriptableContext
} from "chart.js";
import {Component} from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

type GraphicsProps = {
    x: Array<number>;
    x_label_name: string,
    y: Array<number>;
    y_label_name: string,
    result_label_name: string
}

export default class GraphicsComponent extends Component<GraphicsProps> {

    constructor(props: GraphicsProps) {
        super(props);

    }

    setData = () => {
        return {
            labels: this.props.x,
            datasets: [
                {
                    label: this.props.result_label_name,
                    data: this.props.y,
                    backgroundColor: (context: ScriptableContext<"line">) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 500);
                        gradient.addColorStop(0, "rgba(50,243,250,0)");
                        gradient.addColorStop(1, "rgba(102,139,255,0)");
                        return gradient;
                    },
                    borderColor: "rgb(167,121,185)"
                }
            ]
        };
    };

    setOptions = () => {
        return {
            maintainAspectRatio: true,
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: this.props.x_label_name,
                        color: "rgb(61,29,73)",
                        font: {
                            size: 24,
                            weight: "600"
                        },
                        padding: 20
                    },
                    ticks: {
                        font: {
                            size: 16,
                            weight: "400"
                        },
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: this.props.y_label_name,
                        color: "rgb(61,29,73)",
                        font: {
                            size: 24,
                            weight: "600"
                        },
                        padding: 20
                    },
                    ticks: {
                        font: {
                            size: 16,
                            weight: "400"
                        },
                    }
                }

            },
            elements: {
                line: {
                    tension: 0.35
                },
                point: {
                    radius: 0
                }

            },
            plugins: {
                filler: {
                    propagate: false
                },
                title: {
                    display: true,
                    text: this.props.result_label_name,
                    color: "rgb(61,29,73)",
                    font: {
                        size: 24,
                        weight: "600"
                    },
                    padding: 20
                },
                legend: {
                    display: false
                },

            },
        };
    }

    render() {
        return (
            <>
                <Line data={this.setData()} options={this.setOptions()} />
            </>
        );
    }
}