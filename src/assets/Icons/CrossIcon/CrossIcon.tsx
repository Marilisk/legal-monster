export interface IIconProps {
    color?: string
    size?: string
    rotate?: string
    cb?: () => void
}

export const CrossIcon = ({ color = '#69BFAF', size = '20px', rotate }: IIconProps) => {

    return <div style={{ transform: `rotate(${rotate}deg)` }} >
        <svg xmlns="http://www.w3.org/2000/svg" fill={color} height={size} viewBox="0 96 960 960" width={size}>
            <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
        </svg>
    </div>
}