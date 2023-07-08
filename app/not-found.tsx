import Image from 'next/image';
import Button from '../components/ui/Button/Button';

const NotFound = () => (
    <div className="grid place-items-center text-center">
        <Image
            className="ml-2"
            src="/icons/not-found.svg"
            alt="Not found icon"
            height="70"
            width="70"
        />
        <h2 className="m-5 text-sm">The content you are looking for does not exist.</h2>
        <Button label="Go back home" href="/" type="primary" />
    </div>
);

export default NotFound;