import { pt_serif } from "../../../fonts/fonts";

const About = () => {
    return (
        <div className="w-full flex justify-between gap-10 flex-col md:flex-row text-base">
            <h2 className="text-5xl text-center font-bold">About <span className={pt_serif.className}>Blockchain Deals</span></h2>
        </div>
    );
}

export default About;