export default function w1(t: number): number {
    return f(t-0.3) - 0.7
}

function f(t: number): number {
    return t*t + Math.sin(3*t)
}