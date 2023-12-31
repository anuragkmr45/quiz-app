import { useEffect } from 'react';

function useSmoothScroll() {
    useEffect(() => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);
}

export default useSmoothScroll;
