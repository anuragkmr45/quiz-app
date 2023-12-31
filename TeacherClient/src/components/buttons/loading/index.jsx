import {Button} from 'react-bootstrap';

function LoadingButton({ isLoading, btnText, btnColor }) {
    // const [isLoading, setLoading] = useState(false);

    // useEffect(() => {
    //     function simulateNetworkRequest() {
    //         return new Promise((resolve) => setTimeout(resolve, 2000));
    //     }

    //     if (isLoading) {
    //         simulateNetworkRequest().then(() => {
    //             setLoading(false);
    //         });
    //     }
    // }, [isLoading]);

    // const handleClick = () => setLoading(true);

    return (
        <Button
            variant={btnColor}
            disabled={isLoading}
            // onClick={!isLoading ? handleClick : null}
        >
            {isLoading ? 'Loading…' : `${btnText}`}
        </Button>
    );
}

export default LoadingButton;