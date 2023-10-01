import { IIconProps } from "./CrossIcon/CrossIcon"


export const PriorityIcon = ({ size = '16px', color = '#69BFAF' }: IIconProps) => {

    return <svg xmlns="http://www.w3.org/2000/svg"
        height={size}
        width={size}
        viewBox="0 -960 960 960"
        fill={color}>
        <path d="M120-160v-60h480v60H120Zm519.894-290Q561-450 505.5-505.606t-55.5-134.5Q450-719 505.606-774.5t134.5-55.5Q719-830 774.5-774.394t55.5 134.5Q830-561 774.394-505.5t-134.5 55.5ZM120-500v-60h262q5.32 16.323 12.16 31.161Q401-514 409-500H120Zm0 170v-60h419q13.8 6.364 29.4 10.682Q584-375 600-373v43H120Zm500-270h40v-160h-40v160Zm20 80q8 0 14-6t6-14q0-8-6-14t-14-6q-8 0-14 6t-6 14q0 8 6 14t14 6Z" />
    </svg>
}