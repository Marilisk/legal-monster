export const getLeftFormCord = (e: React.MouseEvent, windowWidth: number) => {

    let ceilWidth = (e.currentTarget as HTMLElement).offsetWidth // ширина ячейки на кот кликнули
    let clickPlace = e.pageX
    let leftFormCord = (e.currentTarget as HTMLElement).offsetLeft + ceilWidth + 10
    if (windowWidth < 1000 && windowWidth > 756) {
        leftFormCord = windowWidth / 2 - 250
    } if (windowWidth < 757) {
        leftFormCord = 20
    } else if (clickPlace > (windowWidth / 2)) {
        leftFormCord = (e.currentTarget as HTMLElement).offsetLeft - 510
        if (windowWidth < 1100) {
            leftFormCord = (e.currentTarget as HTMLElement).offsetLeft - 410
        } else if (windowWidth < 1200) {
            leftFormCord = (e.currentTarget as HTMLElement).offsetLeft - 460
        }
    }

    return leftFormCord
}


