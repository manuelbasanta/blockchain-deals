"use client";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import Selector from "../../ui/Selector/Selector";
import Title from "../../ui/Title/Title";

const NewArbitrerDeal = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-w-full">
            <div className="border border-gray-300 rounded p-5">
                <form className="flex flex-col gap-8">
                    <Input label="Value" placeholder="Value of the transaction in ETH" type="number" />
                    <Input label="Arbitrer" prefix="0x" placeholder="Arbitrer's Ethereum address" type="text" info="This should be someone you and the beneficiary trust"/>
                    <Input label="Buyer / Beneficiary" prefix="0x" placeholder="Buyer's / Beneficiary's Ethereum address" type="text" />
                    <Selector label="Expires in" items={['1 day', '3 days', '1 week']} onSelect={(selected) => console.log(selected)}/>
                    <div>
                        <Button label="Create Arbitrer Deal" href="/new/arbitrer-deal/#submit" type="primary"/>
                    </div>
                </form>
            </div>
            <div>
                <div className="text-4xl font-bold">The Arbitrer Deal</div>
                <div className="text-lg font-light mt-2 text-gray-600">Choose an arbitrer you trust to approve your deal.</div>
                <div className="text-2xl mt-4 text-gray-900 bg-green-300 p-5 rounded">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit dolore quo vel, saepe eum soluta, vero rerum aliquam veritatis libero nihil quae reprehenderit, aliquid architecto perspiciatis nam ex dolor provident?</div>
            </div>
        </div>
    );
}

export default NewArbitrerDeal;