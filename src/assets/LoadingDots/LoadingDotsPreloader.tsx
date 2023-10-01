import { LoadingDots } from './LoadingDots';
import c from './LoadingDots.module.scss';

export const LoadingDotsPreloader = () => {

    return <div className={c.preloaderWrap}>
        <div className={c.container}>
            <LoadingDots />
        </div>
    </div>
}