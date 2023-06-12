"use client";
import { useState } from "react";
import { ethers } from "ethers";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import Selector from "../../ui/Selector/Selector";
import { blockchainDealABI } from '../../../contracts/blockchainDealABI';
import { EXPIRATION_VALUES, ONE_DAY } from "../NewDeal/expiration";
import { useContractEvent, useContractWrite, useWaitForTransaction } from "wagmi";
import { useRouter } from 'next/navigation'
import Loader from "../../ui/Loader/Loader";

const NewArbitrerDealForm = () => {
    const router = useRouter();
    let contractInterface = new ethers.Interface(blockchainDealABI);
    const { data, write } = useContractWrite({
        address: process.env.sepoliaContractAddress,
        abi: blockchainDealABI,
        functionName: 'createArbitrerDeal',
    });
/* 
    useContractEvent({
        address: process.env.sepoliaContractAddress,
        abi: blockchainDealABI,
        eventName: 'DealCreated',
        listener(log) {
          console.log(log)
        },
      }) */

    const { isLoading } = useWaitForTransaction({
        hash: data?.hash,
        onSettled(data, error) {
            if(!error) {
                const parsedLogs = contractInterface.parseLog(data.logs[0]);
                router.push(`/deal/${Number(parsedLogs.args[1])}`);
            }
        }
    })

    const handleFormSubmit = (event): void => {
        event.preventDefault();
        handleValueChange(transactionData.value, true);
        handleArbitrerChange(arbitrerData.value, true);
        handleBuyerChange(buyerData.value, true);
        if(
            transactionData.isValid,
            arbitrerData.isValid,
            buyerData.isValid
        ) {
            createDeal();
        }
    }

    const createDeal = async () => {
       const value =  ethers.parseUnits(transactionData.value, 'ether');
       try {
        write({
            args: [value, arbitrerData.value, buyerData.value, expirationDate],
            value,
        })
       } catch (error) {
            console.log(error);
       }
    }

    // Expiration 
    const [expirationDate, setExpirationDate] = useState(ONE_DAY);

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
        <div className="flex flex-col gap-6 relative">
            <div className={`transition-all ease-in duration-500 w-full h-full bg-white/50 backdrop-blur absolute rounded flex flex-col justify-center items-center outline outline-8 outline-green-300 ${isLoading ? 'opacity-100 z-2' : 'opacity-0 -z-10'}`}>
                <p className="font-bold text-center">Waiting for transaction. This may take a few seconds</p>
                <Loader />
            </div>
            <Input data={transactionData} validationText="The value should be grater than 0" handleChange={handleValueChange} label="Value" placeholder="Value of the transaction in ETH" type="number" />
            <Input data={arbitrerData} validationText="Invalid Etheteum address"  handleChange={handleArbitrerChange} label="Arbitrer" placeholder="Arbitrer's Ethereum address" type="text" info="This should be someone you and the beneficiary trust"/>
            <Input data={buyerData} validationText="Invalid Etheteum address" handleChange={handleBuyerChange} label="Buyer / Beneficiary" placeholder="Buyer's / Beneficiary's Ethereum address" type="text" />
            <Selector value={expirationDate} label="Expires in" items={EXPIRATION_VALUES} onSelect={(selected) => setExpirationDate(selected)}/>
            <div className="flex">
                <Button label="Create Arbitrer Deal" onClick={handleFormSubmit} type="primary" />
            </div>
        </div>
    );
}

export default NewArbitrerDealForm;