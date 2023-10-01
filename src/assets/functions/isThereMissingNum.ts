export function isThereMissingNum(array: number[]) {

    for (let i=0; i < array.length; i++) {
        if ((array[i + 1] - array[i]) > 1) {
            console.log('MISS', array[i]++)

            return array[i] ++
        }
    }
    return undefined
}