import { IIconProps } from "./CrossIcon/CrossIcon"


export const DoneIcon = ({ size = '16px', color = '#69BFAF' }: IIconProps) => {

    return <svg xmlns="http://www.w3.org/2000/svg"
        height={size}
        width={size}
        viewBox="0 -960 960 960"
        fill={color}>
        <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" />
    </svg>
}