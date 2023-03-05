import InputModel from "./InputModel";
import w1 from "./functions/w1(t)";

export default class PhysicsCore{
    private inputModel: InputModel;

    private selectedNi: number;
    private selectedNiIndex: number;
    private t: number;
    private u: number;
    private subscriber?: (W: number, V: number, F: number, t: number) => void;
    private exerciseSubscriber?: (W: number, V: number, F: number, power: number, t: number) => void;

    private intervalId: ReturnType<typeof setInterval> | undefined;


    constructor(gears: number[]) {
        this.inputModel = {
            kd: 1,
            l: 1.5,
            ni: gears, // gears
            w: w1
        };

        this.subscriber = (v1,v2,v3,v4) => {};
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
        this.t += 0.02;
        this.update();
    }

    public run(): void {

        let tLimit = 1.5;
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
                  return;
            }

            this.step();

            if (this.subscriber){
                this.subscriber(this.getW(), this.getV(), this.getF(), this.getT())
            }
            if (this.exerciseSubscriber){
                this.exerciseSubscriber(this.getW(), this.getVex(), this.getFex(), this.getPowerEx(), this.getT())
            }

        }, 200)
    }

    public subscribe(subscriber: (W: number, V: number, F: number, t: number) => void): void {
        if (this.exerciseSubscriber){
            throw new Error("only one type of subscribers can be present")
        }
        this.subscriber = subscriber;
    }

    public subscribeAsEx(exerciseSubscriber: (W: number, V: number, F: number, power: number, t: number) => void){
        if (this.subscriber){
            throw new Error("only one type of subscribers can be present")
        }
        this.exerciseSubscriber = exerciseSubscriber
    }

    public stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.t = 0;
        this.update();
    }

    //----------------- getters and setters -----------------//

    public setNi(ni: number[]): void {
        this.inputModel.ni = ni;
        this.selectedNi = this.inputModel.ni[0];
        this.selectedNiIndex = 0;
    }

    public getNi(): number[] {
        return this.inputModel.ni;
    }

    public getW(): number {
        return this.inputModel.w(this.t);
    }

    public getV(): number {
        return this.u * this.selectedNi;
    }

    public getVex(): number{
        return this.u * Math.sqrt((2*this.selectedNi) / this.inputModel.kd)
    }

    public getF(): number {
        return this.inputModel.kd * this.selectedNi * this.selectedNi * this.u;
    }

    public getFex(): number{
        return this.selectedNi * this.u
    }

    public getPowerEx(): number{
        return 2 * this.selectedNi * this.u * this.u
    }

    public getT(): number {
        return this.t;
    }


}