import { FC } from "react"


interface IDateRangeIconProps {
    cb?: () => void
    fill?: string
    size?: string
}

export const DateRangeIcon: FC<IDateRangeIconProps> = ({ cb, fill = '#C8CACA', size = '20px' }: IDateRangeIconProps) => {
    return <div>
        <svg onClick={cb} fill={fill} xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} >
            <path d="M306-394q-17 0-28.5-11.5T266-434q0-17 11.5-28.5T306-474q17 0 28.5 11.5T346-434q0 17-11.5 28.5T306-394Zm177 0q-17 0-28.5-11.5T443-434q0-17 11.5-28.5T483-474q17 0 28.5 11.5T523-434q0 17-11.5 28.5T483-394Zm170 0q-17 0-28.5-11.5T613-434q0-17 11.5-28.5T653-474q17 0 28.5 11.5T693-434q0 17-11.5 28.5T653-394ZM180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z" />
        </svg>
    </div>
}