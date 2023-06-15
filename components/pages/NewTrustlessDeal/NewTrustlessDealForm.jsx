"use client";

import { useState } from "react";
import { ethers } from "ethers";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import Selector from "../../ui/Selector/Selector";
import { blockchainDealsABI } from '../../../contracts/blockchainDealsABI';
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { useRouter } from 'next/navigation'
import Loader from "../../ui/Loader/Loader";

const NewTrustlessDealForm = () => {
    const router = useRouter();
    let contractInterface = new ethers.Interface(blockchainDealsABI);
    const { data, write } = useContractWrite({
        address: process.env.contractAddress,
        abi: blockchainDealsABI,
        functionName: 'createTrustlessDeal',
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
        handleBeneficiearyChange(beneficiaryData.value, true);
        handleBeneficiaryDepositChange(beneficiaryDepositData.value, true);
        handleCreatorDepositChange(creatorDepositData.value, true);
        if(
            transactionData.isValid &&
            beneficiaryData.isValid &&
            beneficiaryDepositData.isValid &&
            creatorDepositData.isValid &&
            beneficiaryData.isValid
        ) {
            createDeal();
        }
    }

    const createDeal = async () => {
        const creatorDepositValue = ethers.parseUnits(creatorDepositData.value, 'ether');
        const beneficiaryDepositValue = ethers.parseUnits(beneficiaryDepositData.value, 'ether');
        const value =  ethers.parseUnits(transactionData.value, 'ether');
        try {
            write({
                args: [value, beneficiaryData.value, beneficiaryDepositValue, creatorDepositValue],
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
            isValid: Number(value) > Number(transactionData.value)
        });
    }

    // Beneficiary
    const [beneficiaryData, setBeneficiaryData] = useState({
        value: '',
        touched: false,
        isValid: false
    });

    const handleBeneficiearyChange = (value, touched) => {
        setBeneficiaryData({
            value, 
            touched,
            isValid: ethers.isAddress(value)
        });
    }

    return (
        <div className="flex flex-col gap-6 relative">
            <div className={`transition-all ease-in duration-500 w-full h-full bg-white/50 backdrop-blur absolute rounded flex flex-col justify-center items-center outline outline-8 outline-green-300 ${isLoading ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}>
                <p className="font-bold text-center">Waiting for transaction. This may take a few seconds</p>
                <Loader />
            </div>
            <Input label="Value" data={transactionData} validationText="The value should be grater than 0" handleChange={handleValueChange} placeholder="Value of the transaction in ETH" type="number" />
            <Input label="Beneficiary" data={beneficiaryData} validationText="Invalid Etheteum address" handleChange={handleBeneficiearyChange} placeholder="Beneficiary's Ethereum address" type="text" />
            <Input label="Beneficiary's deposit" data={beneficiaryDepositData} validationText="The value should be grater than 0" handleChange={handleBeneficiaryDepositChange} placeholder="The beneficiary's deposit in ETH" type="number" info="The  beneficiary's deposit should be significant so that he/she provides the service or goods. We recommend setting it to 30% of the value." />
            <Input label="Your deposit" data={creatorDepositData} validationText="Your deposit should be grater than the value" handleChange={handleCreatorDepositChange} placeholder="Your deposit in ETH" type="number" info="We recommend to set a deposit that is at least 110% of the value (i.e. if the value is .15 ETH the deposit should be .165 ETH). This way the beneficiary can rest asured you will keep your part of the deal." />
            <div className="flex">
                <Button label="Create Trustless Deal" onClick={handleFormSubmit} type="primary" />
            </div>
        </div>
    );
}

export default NewTrustlessDealForm;