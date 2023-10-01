// как это мемоизировать? или пофик? по сути там если уже поменялось то просто всегда возвращается тру
export function spotIfAnyFormFieldChanged(
    initValues: any,
    newValues: any,
    wasAnyFieldChangedFlag: boolean,
    setIfAnyFieldChangedFlag: (arg: boolean) => void
) {
    //console.log('in spotIfAnyFormFieldChanged func')
    if (wasAnyFieldChangedFlag) return true
    const keys = Object.keys(initValues)
    for (let key of keys) {
        if (initValues[key] !== newValues[key]) {
            setIfAnyFieldChangedFlag(true)
            return true
        }
    }
    return wasAnyFieldChangedFlag
}