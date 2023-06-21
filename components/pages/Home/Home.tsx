import Image from "next/image";
import Title from "../../ui/Title/Title";
import Button from "../../ui/Button/Button";
import styles from "./home.module.scss";

const Home = () => (
    <div className={`${styles.header} max-w-2xl flex items-center flex-col justify-center`} >
        <Title title="Easy, safe Blockchain Escrows" subtitle="Exchange goods or sevices safely, with friends or complete extrangers, backed by the blockchain." />
        <div className="flex  gap-3">
            <Button href="/new" label="Start creating" type="primary"/>
            <Button href="#learn-more" label="Learn more" />
        </div>
        <div className="flex gap-5 mt-16">
            <Image
                src="/icons/ethereum.svg"
                alt="ethereum logo"
                height="100"
                width="30"
            />
            <Image
                src="/icons/mumbai.svg"
                alt="ethereum logo"
                height="120"
                width="45"
            />
        </div>
    </div>
)

export default Home;