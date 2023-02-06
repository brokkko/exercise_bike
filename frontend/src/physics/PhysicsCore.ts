import InputModel from "./InputModel";
import w1 from "./functions/w1(t)";

export default class PhysicsCore{
    private inputModel: InputModel;

    private selectedNi: number;
    private selectedNiIndex: number;
    private t: number;
    private u: number;
    private subscriber: (W: number, V: number, F: number) => void;

    private intervalId: ReturnType<typeof setInterval> | undefined;


    constructor() {
        this.inputModel = {
            kd: 1,
            l: 1,
            ni: [0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1.0, 1.05, 1.1, 1.15, 1.2, 1.3, 1.35, 1.4, 1.5], // gears
            w: w1
        };

        this.subscriber = (v1,v2,v3) => {};
        this.t = 0;
        this.u = this.calculateU()
        this.selectedNi = this.inputModel.ni[0];
        this.selectedNiIndex = 0;
    }

    private makeArr(startValue: number, stopValue: number, cardinality: number) {
        var arr = [];
        var step = (stopValue - startValue) / (cardinality - 1);
        for (let i = 0; i < cardinality; i++) {
            arr.push(startValue + (step * i));
        }
        return arr;
    }

    private calculateU(): number {
        return 2*Math.PI * this.inputModel.l * this.inputModel.w(this.t)
    }

    private update(): void {
        this.u = this.calculateU()
    }

    private step(): void {
        this.t += 0.01;
        this.update();
    }

    public run(): void {

        let tLimit = 1.7;
        let niMapping = this.makeArr(0, tLimit, this.inputModel.ni.length);
        niMapping = niMapping.reverse();


        this.intervalId = setInterval(() => {

            if (this.t > niMapping[niMapping.length-1]){
                niMapping.pop();
                this.selectedNiIndex++;
                this.selectedNi = this.inputModel.ni[this.selectedNiIndex];
            }

            if (this.t > tLimit){
                  this.stop();
            }
            this.step();
            if (this.subscriber){
                this.subscriber(this.getW(), this.getV(), this.getF())
            }

        }, 300)
    }

    public subscribe(subscriber: (W: number, V: number, F: number) => void): void {
        this.subscriber = subscriber;
    }

    public stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.t = 0;
        this.update();
    }

    //----------------- Getters -----------------//

    public getW(): number {
        return this.inputModel.w(this.t);
    }

    public getV(): number {
        return this.u * this.selectedNi;
    }

    public getF(): number {
        return this.inputModel.kd * this.selectedNi * this.selectedNi * this.u;
    }


}