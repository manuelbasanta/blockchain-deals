"use client";
import { useState } from "react";
import { ethers } from "ethers";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import Selector from "../../ui/Selector/Selector";
import { blockchainDealABI } from '../../../contracts/blockchainDealABI';
import { EXPIRATION_VALUES, ONE_DAY } from "../NewDeal/expiration";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { useRouter } from 'next/navigation'
import Loader from "../../ui/Loader/Loader";

const NewTrustlessDealForm = () => {
    const router = useRouter();
    let contractInterface = new ethers.Interface(blockchainDealABI);
    const { data, write } = useContractWrite({
        address: process.env.sepoliaContractAddress,
        abi: blockchainDealABI,
        functionName: 'createTrustlessDeal',
    });

    const { isLoading } = useWaitForTransaction({
        hash: data?.hash,
        onSettled(data, error) {
            if(!error) {
                const parsedLogs = contractInterface.parseLog(data.logs[0]);
                router.push(`/deal/${Number(parsedLogs.args[1])}`);
            }
        }
    })

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleValueChange(transactionData.value, true);
        handleBuyerChange(buyerData.value, true);
        if(
            transactionData.isValid,
            buyerData.isValid
        ) {
            createDeal();
        }
    }

    const createDeal = async () => {
       const value =  ethers.parseUnits(transactionData.value, 'ether');
       try {
        write({
            args: [value, buyerData.value, expirationDate],
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

    // Beneficiary's deposit
    const [beneficiaryDepositData, setBeneficiaryDepositData] = useState({
        value: '',
        touched: false,
        isValid: false
    });

    const handleBeneficiaryDepositChange = (value, touched) => {
        setBeneficiaryDepositData({
            value, 
            touched,
            isValid: Number(value) > 0
        });
    }

    // Creators's deposit
    const [creatorDepositData, setCreatorDepositData] = useState({
        value: '',
        touched: false,
        isValid: false
    });

    const handleCreatorDepositChange = (value, touched) => {
        setCreatorDepositData({
            value, 
            touched,
            isValid: Number(value) > 0
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
            <Input label="Value" data={transactionData} validationText="The value should be grater than 0" handleChange={handleValueChange} placeholder="Value of the transaction in ETH" type="number" />
            <Input label="Beneficiary" data={buyerData} validationText="Invalid Etheteum address" handleChange={handleBuyerChange} placeholder="Beneficiary's Ethereum address" type="text" />
            <Input label="Beneficiary's deposit" data={beneficiaryDepositData} validationText="The value should be grater than 0" handleChange={handleBeneficiaryDepositChange} placeholder="The beneficiary's deposit in ETH" type="number" info="The  beneficiary's deposit should be significant so that he/she provides the service or goods. We recommend setting it to 20% of the value." />
            <Input label="Your deposit" data={creatorDepositData} validationText="The value should be grater than 0" handleChange={handleCreatorDepositChange} placeholder="Your deposit in ETH" type="number" info="We recommend to set a deposit that is at least 110% of the value (i.e. if the value is .15 ETH the deposit should be .165 ETH). In this way the beneficiary can rest asured you will keep your part of the deal." />
            <Selector value={expirationDate} label="Expires in" items={EXPIRATION_VALUES} onSelect={(selected) => setExpirationDate(selected)}/>
            <div className="flex">
                <Button label="Create Trustless Deal" onClick={handleFormSubmit} type="primary" />
            </div>
        </div>
    );
}

export default NewTrustlessDealForm;