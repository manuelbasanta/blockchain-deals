"use client";
import { useState } from "react";
import { ethers } from "ethers";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import Selector from "../../ui/Selector/Selector";

const NewArbitrerDeal = () => {

    const handleFormSubmit = (event): void => {
        event.preventDefault();
        handleValueChange(transactionData.value, true);
        handleArbitrerChange(arbitrerData.value, true);
        handleBuyerChange(buyerData.value, true);
        console.log(event);
    }

    // Value
    const [transactionData, setTransactionData] = useState({
        value: '',
        touched: false,
        isValid: false
    });

    const handleValueChange = (value, touched) => {
        setTransactionData({
            value, 
            touched,
            isValid: Number(value) > 0
        });
    }

    // Arbitrer
    const [arbitrerData, setArbitrerData] = useState({
        value: '',
        touched: false,
        isValid: false
    });

    const handleArbitrerChange = (value, touched) => {
        setArbitrerData({
            value, 
            touched,
            isValid: ethers.isAddress(value)
        });
    }

    // Buyer
    const [buyerData, setBuyerData] = useState({
        value: '',
        touched: false,
        isValid: false
    });

    const handleBuyerChange = (value, touched) => {
        setBuyerData({
            value, 
            touched,
            isValid: ethers.isAddress(value)
        });
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-w-full">
            <div className="border border-gray-300 rounded p-5">
                <form className="flex flex-col gap-6">
                    <Input data={transactionData} validationText="The value should be grater than 0" handleChange={handleValueChange} label="Value" placeholder="Value of the transaction in ETH" type="number" />
                    <Input data={arbitrerData} validationText="Invalid Etheteum address"  handleChange={handleArbitrerChange} label="Arbitrer" prefix="0x" placeholder="Arbitrer's Ethereum address" type="text" info="This should be someone you and the beneficiary trust"/>
                    <Input data={buyerData} validationText="Invalid Etheteum address" handleChange={handleBuyerChange} label="Buyer / Beneficiary" prefix="0x" placeholder="Buyer's / Beneficiary's Ethereum address" type="text" />
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