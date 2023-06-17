"use client";

import { useState } from "react";
import { ethers } from "ethers";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import { blockchainDealsABI } from '../../../contracts/blockchainDealsABI';
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { useRouter } from 'next/navigation'
import Loader from "../../ui/Loader/Loader";

const NewSellerTrustlessDealForm = () => {
    const router = useRouter();
    const { address } = useAccount();
    const [error, setError] = useState(null);
    let contractInterface = new ethers.Interface(blockchainDealsABI);
    const { data, write, isLoading: isLoadingWrite, isSuccess } = useContractWrite({
        address: process.env.contractAddress,
        abi: blockchainDealsABI,
        functionName: 'createTrustlessDealAsSeller',
        onError(error) {
            setError(error.cause.shortMessage);
        },      
    });

    const { isLoading } = useWaitForTransaction({
        hash: data?.hash,
        onSettled(data, error) {
            if(!error) {
                const parsedLogs = contractInterface.parseLog(data.logs[0]);
                router.push(`/deal/trustless/${Number(parsedLogs.args[1])}`);
            }
        }
    })

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleValueChange(transactionData.value, true);
        handleBeneficiearyChange(buyerData.value, true);
        handleBuyerDepositChange(buyerDepositData.value, true);
        handleCreatorDepositChange(creatorDepositData.value, true);
        if(
            transactionData.isValid &&
            buyerData.isValid &&
            buyerDepositData.isValid &&
            creatorDepositData.isValid &&
            buyerData.isValid
        ) {
            createDeal();
        }
    }

    const createDeal = async () => {
        const creatorDepositValue = ethers.parseUnits(creatorDepositData.value, 'ether');
        const buyerDepositValue = ethers.parseUnits(buyerDepositData.value, 'ether');
        const value =  ethers.parseUnits(transactionData.value, 'ether');
        try {
            write({
                args: [value, buyerData.value, creatorDepositValue, buyerDepositValue],
                value: value + creatorDepositValue,
            })
        } catch (error) {
            console.log(error);
        }
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

    // Buyer's deposit
    const [buyerDepositData, setBuyerDepositData] = useState({
        value: '',
        touched: false,
        isValid: false
    });

    const handleBuyerDepositChange = (value, touched) => {
        setBuyerDepositData({
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

    const handleBeneficiearyChange = (value, touched) => {
        setBuyerData({
            value, 
            touched,
            isValid: ethers.isAddress(value) && value !== address
        });
    }

    return (
        <div className="flex flex-col gap-6 relative">
            <div className={`transition-all ease-in duration-500 w-full h-full bg-white/50 backdrop-blur absolute rounded flex flex-col justify-center items-center outline outline-8 outline-green-300 ${isLoading ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}>
                <p className="font-bold text-center">Waiting for transaction. This may take a few seconds</p>
                <Loader />
            </div>
            <Input label="Value" data={transactionData} validationText="The value should be grater than 0" handleChange={handleValueChange} placeholder="Value of the transaction in ETH" type="number" />
            <Input label="Buyer's address" data={buyerData} validationText="Invalid Etheteum address" handleChange={handleBeneficiearyChange} placeholder="Buyer's Ethereum address" type="text" />
            <Input label="Buyer's deposit" data={buyerDepositData} validationText="The value should be grater than 0" handleChange={handleBuyerDepositChange} placeholder="The buyer's deposit in ETH" type="number" info="The  buyer's deposit should be significant so that he/she provides the service or goods. We recommend setting it to 30% of the value." />
            <Input label="Your deposit" data={creatorDepositData} validationText="Your deposit has to be grater than 0." handleChange={handleCreatorDepositChange} placeholder="Your deposit in ETH" type="number" info="We recommend to set a deposit that is at least 110% of the value (i.e. if the value is .15 ETH the deposit should be .165 ETH). This way the buyer can rest asured you will keep your part of the deal." />
            <div className="flex">
                <Button label="Create Trustless Deal" onClick={handleFormSubmit} type="primary" />
            </div>
            {(error && !isLoadingWrite && !isSuccess) && <div className="text-red-700 rounded p-2 bg-red-100 font-semibold text-sm border border-red-700">{error}</div>}
        </div>
    );
}

export default NewSellerTrustlessDealForm;