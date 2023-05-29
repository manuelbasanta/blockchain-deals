"use client";
import { useState } from "react";
import { ethers } from "ethers";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import Selector from "../../ui/Selector/Selector";

const NewArbitrerDeal = () => {

    const handleFormSubmit = (event): void => {
        event.preventDefault();
        console.log(event);
    }

    // Value
    const [value, setValue] = useState('');
    const [isValueValid, setIsValueValid] = useState(false);

    const handleValueChange = (value) => {
        setValue(value);
        setIsValueValid(Number(value) > 0);
    }

    // Arbitrer
    const [arbitrer, setArbitrer] = useState('');
    const [isArbitrerValid, setIsArbitrerValid] = useState(false);

    const handleArbitrerChange = (value) => {
        setArbitrer(value);
        setIsArbitrerValid(ethers.isAddress(value));
    }

    // Buyer
    const [buyer, setBuyer] = useState('');
    const [isBuyerValid, setIsABuyerValid] = useState(false);

    const handleBuyerChange = (value) => {
        setBuyer(value);
        setIsABuyerValid(ethers.isAddress(value));
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-w-full">
            <div className="border border-gray-300 rounded p-5">
                <form className="flex flex-col gap-6">
                    <Input validationText="The value should be grater than 0" value={value} isValid={isValueValid} handleChange={handleValueChange} label="Value" placeholder="Value of the transaction in ETH" type="number" />
                    <Input validationText="Invalid Etheteum address" value={arbitrer} isValid={isArbitrerValid} handleChange={handleArbitrerChange} label="Arbitrer" prefix="0x" placeholder="Arbitrer's Ethereum address" type="text" info="This should be someone you and the beneficiary trust"/>
                    <Input validationText="Invalid Etheteum address" value={buyer} isValid={isBuyerValid} handleChange={handleBuyerChange} label="Buyer / Beneficiary" prefix="0x" placeholder="Buyer's / Beneficiary's Ethereum address" type="text" />
                    <Selector label="Expires in" items={['1 day', '3 days', '1 week', '3 weeks', '1 month', '3 months', '1 year']} onSelect={(selected) => console.log(selected)}/>
                    <div className="flex">
                        <Button label="Create Arbitrer Deal" onClick={handleFormSubmit} type="primary"/>
                    </div>
                </form>
            </div>
            <div>
                <div className="text-4xl font-bold">The Arbitrer Deal</div>
                <div className="text-lg font-light mt-2 text-gray-600">Choose an arbitrer you trust to approve your deal.</div>
                <div className="text-md mt-4 text-gray-900 rounded">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit dolore quo vel, saepe eum soluta, vero rerum aliquam veritatis libero nihil quae reprehenderit, aliquid architecto perspiciatis nam ex dolor provident?</div>
            </div>
        </div>
    );
}

export default NewArbitrerDeal;