import Image from "next/image";
import Title from "../../ui/Title/Title";
import Button from "../../ui/Button/Button";
import styles from "./home.module.scss";

const Home = () => (
    <div className={`${styles.header} max-w-2xl flex items-center flex-col justify-center`} >
        <Title title="Easy, safe Blockchain Escrows" subtitle="Exchange goods for ETH safely, with friends or complete extrangers, backed by the Ethereum blockchain" />
        <div className="flex  gap-3">
            <Button href="/new" label="Start creating" type="primary"/>
            <Button href="#learn-more" label="Learn more" />
        </div>
        <Image
            className="mt-8"
            src="/icons/ethereum.svg"
            alt="ethereum logo"
            height="110"
            width="70"
        />
    </div>
)

export default Home;