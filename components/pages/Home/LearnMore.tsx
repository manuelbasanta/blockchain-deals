/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import NumberedList from "../../ui/NumberedList/NumberedList";
import Button from "../../ui/Button/Button";
import { pt_serif } from "../../../fonts/fonts";

const LearnMore = () => {
    return (
        <>
            <div className={`flex flex-col md:flex-row items-center justify-between w-full gap-10 text-lg pt-[100px] mb-20 md:mb-48`} id="learn-more">
                <div>
                    <p className="text-5xl md:text-7xl font-bold">What's a Blockchain Escrow Deal?</p>
                </div>
                <div>
                    If you need to exchange goods or services with someone you do not know you usually need a third party to act as an intermediary, keeping custody of the good or service until the deal is completed.
                    The problem is: why would I trust this third party?
                    <span className="mt-2 block">
                        The good news is: with the <span className="font-semibold">blockchain you don't have to!</span>
                    </span>
                    <span className="my-5 block font-semibold text-gree text-green-700">
                        Simply trust the code deployed to the Blockchain.
                    </span>
                    A Blockchain Escrow Deal replaces the third party with a Smart Contract that will always follow the rules and make the Deal worth of trust.
                    <span className="mt-10 flex justify-center">
                        <Image
                            src="/imgs/contract.png"
                            alt="Smart contract"
                            width="400"
                            height="100"
                        />
                    </span>
                </div>
            </div>
            <div className={`flex flex-col-reverse md:flex-row items-center justify-between w-full gap-10 text-lg`}>
                <div>
                    <NumberedList
                        items={[
                            'Connect your wallet and create a Deal, you can choose the blockchain network and your role: Buyer or Seller.',
                            'The buyer will store the value of the good or service and a deposit, the seller will make a deposit too.',
                            'Let the counterpart know you\'ve creted the Deal sot that they can confirm it!',
                            'Once it\'s confirmed it\'s time to complete the deal, the seller get\'s the deposit and the value back, the buyer get\'s the deposit back as well.',
                            'That is all.'
                        ]}

                    />
                </div>
                <div>
                    <p className="text-5xl md:text-7xl font-bold text-right">So, how does the Deal work?</p>
                </div>
            </div>
            <div className={`flex flex-col md:flex-row items-center justify-between w-full gap-10 text-lg pt-16 md:pt-[100px]  mb-14 md:mb-40`} id="learn-more">
                <div>
                    <p className="text-4xl md:text-7xl font-bold">Why should I use <span className={pt_serif.className}>Blockchain Deals</span>?</p>
                </div>
                <div className="rounded border border-gray-900 p-8">
                    <div className="text-sm font-light">Just a few</div>
                    <div className="font-semibold mb-3">Reasons why you should:</div>
                    <ul>
                        <li><span className="font-semibold">Easy to use UI.</span> fill up the form and everything's ready, we'll guide you through the whole thing.</li>
                        <li><span className="font-semibold">One stop destination for all your deals.</span> Connect your wallet and see all your Deals on your profile page.</li>
                        <li>Minumun <span className="font-semibold">0.1%</span> service fee on the value of the Deal.</li>
                        <li><span className="font-semibold">Multi-chain support</span>, Ethereum, Polygon, testnets, you decide which gas fees to pay!</li>
                    </ul>
                    <div className="flex gap-5 justify-center mt-5">
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
            </div>
            <div className="flex flex-col items-center border border-gray-900 rounded p-8 bg-green-300 w-full">
                <p className="text-4xl font-semibold mb-1">Are you ready to see it for yourself?</p>
                <p className="mb-5 font-light">You can try a testnet:</p>
                <Button label="Create a new Deal" href="/new" type="info"/>
            </div>
        </>
)
}

export default LearnMore;
