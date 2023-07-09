import Link from "next/link";
import { pt_serif } from "../../../fonts/fonts";

const About = () => {
    return (
        <div className="w-full justify-between gap-5 text-base">
            <h2 className="text-5xl font-bold mb-5">About <span className={pt_serif.className}>Blockchain Deals</span></h2>
            <p className="mb-10">
                Blockchain Deals are Double Deposit Escrows, two persons can agree to exchange good or services for a certain amount of cryptocurrency 
                and trust that each other will keep their part of the deal simply because that is their best interest.
            </p>
            <div className="text-xl font-bold">
                What is an Escrow?
            </div>
            <p className="mb-5">
                An escrow is a contractual arrangement in which a third party (the stakeholder or escrow agent) receives and disburses money or property 
                for the primary transacting parties, with the disbursement dependent on conditions agreed to by the transacting parties. <span className=" text-blue-600 underline-offset-4 underline"><a href="https://en.wikipedia.org/wiki/Escrow" target="_blank" >Wikipedia</a></span>
            </p>
            <div className="text-xl font-bold">
                What is a Blockchain Escrow?
            </div>
            <p className="mb-5">
                In a blockchain escrow the third party is replaced by a smart contract. You don&apos;t need to trust anyone but the code deployed to the 
                blockchain, which is inmutable and available for everyone to see.
            </p>
            <div className="text-xl font-bold">
                How can I trust the other party will be honest? Why would I be honest?
            </div>
            <p className="mb-5">
                That is when deposits become important. When the parties involved have something to loose if they do not respect the deal then they won&apos;t 
                act in a dishonest way.
            </p>
            <div className="text-xl font-bold" id="deposits">
                Deposits
            </div>
            <p className="mb-5">
                In Double Deposit Escrows both paries have to deposit cryptocurrency as collateral, once the deal is done they get the deposit back. The purpose 
                of the deposits is only to keep the deal fair, no one will gain the deposits, not the buyer, not the seller, not even the smart contract. The 
                parties can agree on any amount as deposit for the buyer and seller, but this amounts should be high enough in relation to the value of the good 
                or service exchanged so that it makes sense to keep your part of the deal.
            </p>
        </div>
    );
}

export default About;