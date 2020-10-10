// Interpolates a value with bounds 0 to 1 to any other min/max combination
export const interpolateValue = (value: number, from: number, to: number) => {
    const range = to - from
    const factor = range * value

    return Math.round(from + (value * factor))
}
