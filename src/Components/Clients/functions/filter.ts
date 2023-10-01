import { IClient } from "../../../types/clientsTypes"

export function filterClients(filters: { [k: string]: any }, clients: IClient[]) {
    const filtersKeys = Object.keys(filters) as Array<keyof typeof filters>
    let res: IClient[] = clients

    filtersKeys.forEach((filterName) => {
        if (filterName === 'excludedPhases' && filters[filterName].length) {
            res = res.filter(client => !filters[filterName].includes(client.phase.number))
        } else if (filterName === 'period') {
            //console.log('filtered by period', 'ЕЩЕ НЕ НАПИСАНО')
            /* res = res.filter(client => {

            }) */
        }
    }
    )
    return res
}