import React, {Component} from "react";

import gear12 from "../../assets/gears/Vector12.svg"
import gear14 from "../../assets/gears/Vector14.svg"
import gear16 from "../../assets/gears/Vector16.svg"
import gear18 from "../../assets/gears/Vector18.svg"
import gear21 from "../../assets/gears/Vector21.svg"
import gear24 from "../../assets/gears/Vector24.svg"
import gear34 from "../../assets/gears/Vector34.svg"
import gear44 from "../../assets/gears/Vector44.svg"



import "./GearTable.css";

type Props = {
    tableData: number[][]
    onChange: (arr: number[][]) => void
}

enum HighlightType {
    NONE,
    COLORED,
    SEMI_COLORED
}

type CellData = {
    x: number,
    y: number,
    value: number
    highlighted: HighlightType
}

type State = {
    cells: CellData[][]
}

export default class GearTable extends Component {

    public props: Props;

    public state: State;

    constructor(props: Props) {
        super(props);
        this.props = props;

        this.state = {
            cells: [[]]
        }

    }

    componentDidMount() {

        let cells: CellData[][] = []

        for (let x in this.props.tableData) {
            cells.push([])
            for (let y in this.props.tableData[x]) {
                cells[x].push({x: +x, y: +y, value: +this.props.tableData[x][y], highlighted: HighlightType.NONE})
            }
        }

        this.setState({
            cells: cells
        })

        // this.props.onChange(this.get2dArray())

    }

    private get2dArray = () => {
        let array2 = this.state.cells.map((row) => {
            return row.map((cell) => {
                return cell.value
            })
        })
        return array2;
    }

    forall = (apply: (cell: CellData) => void) => {
        for (let x in this.state.cells) {
            for (let y in this.state.cells[x]) {
                apply(this.state.cells[x][y])
            }
        }
    }

    highlightCell = (x: number, y: number) => {

        this.forall((cell) => {
            cell.highlighted = HighlightType.NONE
        })

        let cells = this.state.cells;

        for (let x_i in cells) {
            cells[x_i][y].highlighted = HighlightType.SEMI_COLORED
        }
        for (let y_i in cells[x]) {
            cells[x][y_i].highlighted = HighlightType.SEMI_COLORED
        }

        cells[x][y].highlighted = HighlightType.COLORED

        this.setState({
            cells: cells
        })
    }

    private getHighlightedStyle(highlighted: HighlightType) {
        if (highlighted === HighlightType.COLORED) {
            return "highlighted-colored"
        }
        if (highlighted === HighlightType.SEMI_COLORED) {
            return "highlighted-semi-colored"
        }
        return ""
    }

    render() {

        let cells = [];

        for (let row in this.state.cells) {
            for (let cellData in this.state.cells[row]) {

                cells.push(
                    <input
                        onChange={(e) => {
                            let tableData = this.state.cells
                            tableData[row][cellData].value = +e.target.value // TODO: validation
                            this.setState({
                                cells: tableData
                            })

                        }}
                        onFocus={(e) => {
                            this.highlightCell(+row, +cellData)
                        }}

                        onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    this.props.onChange(this.get2dArray())
                                }
                            }
                        }

                        onBlur={(e) => {
                                this.props.onChange(this.get2dArray())
                            }
                        }

                        value={this.state.cells[row][cellData].value}
                        className={this.getHighlightedStyle(this.state.cells[row][cellData].highlighted) + " cell"}
                    />)
            }
        }

        let topgears = [
            <img src={gear44}/>,
            <img src={gear34}/>,
            <img src={gear24}/>,
        ].reverse()

        let topgearsN = [
            24, 34 , 44
        ]

        let leftgearsN = [
            12,14,16,18,21,24
        ]

        let leftgears = [
            <img src={gear12}/>,
            <img src={gear14}/>,
            <img src={gear16}/>,
            <img src={gear18}/>,
            <img src={gear21}/>,
            <img src={gear24}/>,
        ]

        let topPanel = [];  // panels vise-versa
        for (let cell in this.state.cells) {
            topPanel.push(<div style={{transform: "scale(0.7)", position: "relative"}} className="top-panel-cell" >{topgears[+cell]} <p style={{position: "absolute"}}> {topgearsN[+cell]} </p></div>)
        }

        let leftPanel = [];
        for (let cell in this.state.cells[0]) {
            leftPanel.push(<div style={{transform: "scale(0.7)", position: "relative"}} className="left-panel-cell">{leftgears[+cell]}  <p style={{position: "absolute"}}> {leftgearsN[+cell]} </p></div>)
        }

        for (let x in this.state.cells) {
            for (let y in this.state.cells[x]) {
                if (this.state.cells[x][y].highlighted == HighlightType.COLORED) {
                    leftPanel[y] = <div style={{transform: "scale(0.7)", position: "relative"}} className="left-panel-cell highlighted-colored">{leftgears[+y]}  <p style={{position: "absolute"}}> {leftgearsN[+y]} </p></div>
                    topPanel[x] = <div style={{transform: "scale(0.7)", position: "relative"}} className="top-panel-cell highlighted-colored">{topgears[+x]} <p style={{position: "absolute"}}> {topgearsN[+x]} </p></div>
                }
            }
        }

        return (
            <div style={{position: "relative", transform: "translateX(-24px)"}}>
                <div className="outer">
                    <div className="top">
                        {topPanel}
                    </div>
                    <div className="left">
                        {leftPanel}
                    </div>
                </div>

                <div style={{gridTemplateColumns: `repeat(${this.props.tableData[0].length}, 45px)`}} className="table">
                    {cells}
                </div>
            </div>

        )
    }

}
