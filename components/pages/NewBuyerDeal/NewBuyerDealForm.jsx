"use client";

import { useState } from "react";
import { ethers } from "ethers";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import { blockchainDealsABI } from '../../../contracts/blockchainDealsABI';
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { useRouter } from 'next/navigation'
import Loader from "../../ui/Loader/Loader";
import { CHAIN_DATA, NETWORK_SELECTOR_ITEMS } from "../../../services/getDeal/networkTypes";
import Selector from "../../ui/Selector/Selector";

const NewBuyerDealForm = () => {
    const router = useRouter();
    const { address } = useAccount();
    const [error, setError] = useState(null);
    const [selectedChain, setSelectedChain] = useState(11155111);
    let contractInterface = new ethers.Interface(blockchainDealsABI);
    const { data, write, isLoading: isLoadingWrite, isSuccess } = useContractWrite({
        address: CHAIN_DATA[selectedChain].contract_address,
        abi: blockchainDealsABI,
        functionName: 'createDealAsBuyer',
        onError(error) {
            if(error.name === 'ChainMismatchError') {
                setError('Chain mismatch error: selected network has to be the same as the wallet selected network.');
            } else {
                setError(error.cause.shortMessage);
            }
        },
        chainId: CHAIN_DATA[selectedChain].id
    });

    const { isLoading } = useWaitForTransaction({
        hash: data?.hash,
        onSettled(data, error) {
            if(!error) {
                let parsedLogs;
                if(data.logs.length === 1) {
                    parsedLogs = contractInterface.parseLog(data.logs[0]);
                } else {
                    parsedLogs = contractInterface.parseLog(data.logs[1]);
                }
                console.log(parsedLogs)
                router.push(`/deal/${Number(parsedLogs.args[0])}?network=${selectedChain}`);
            } else {
                console.log(error)
            }
        }
    })

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleValueChange(transactionData.value, true);
        handleBeneficiearyChange(sellerData.value, true);
        handleSellerDepositChange(sellerDepositData.value, true);
        handleCreatorDepositChange(creatorDepositData.value, true);
        if(
            transactionData.isValid &&
            sellerData.isValid &&
            sellerDepositData.isValid &&
            creatorDepositData.isValid &&
            sellerData.isValid
        ) {
            createDeal();
        }
    }

    const createDeal = async () => {
        const creatorDepositValue = ethers.parseUnits(creatorDepositData.value, 'ether');
        const sellerDepositValue = ethers.parseUnits(sellerDepositData.value, 'ether');
        const value =  ethers.parseUnits(transactionData.value, 'ether');
        try {
            write({
                args: [value, sellerData.value, sellerDepositValue, creatorDepositValue],
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

    // Seller's deposit
    const [sellerDepositData, setSellerDepositData] = useState({
        value: '',
        touched: false,
        isValid: false
    });

    const handleSellerDepositChange = (value, touched) => {
        setSellerDepositData({
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

    // Seller
    const [sellerData, setSellerData] = useState({
        value: '',
        touched: false,
        isValid: false
    });

    const handleBeneficiearyChange = (value, touched) => {
        setSellerData({
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
            <Input label="Value" data={transactionData} validationText="The value should be grater than 0" handleChange={handleValueChange} placeholder={`Value of the transaction in ${CHAIN_DATA[selectedChain].nativeCurrency}`} type="number" />
            <Input label="Seller's address" data={sellerData} validationText="Invalid Etheteum address" handleChange={handleBeneficiearyChange} placeholder="Seller's Ethereum address" type="text" />
            <Input label="Seller's deposit" data={sellerDepositData} validationText="The value should be grater than 0" handleChange={handleSellerDepositChange} placeholder={`The seller's deposit in ${CHAIN_DATA[selectedChain].nativeCurrency}`} type="number" info="The  seller's deposit should be significant so that he/she provides the service or goods. We recommend setting it to 30% of the value." />
            <Input label="Your deposit" data={creatorDepositData} validationText="Your deposit has to be grater than the value." handleChange={handleCreatorDepositChange} placeholder={`Your deposit in ${CHAIN_DATA[selectedChain].nativeCurrency}`} type="number" info="We recommend to set a deposit that is at least 110% of the value (i.e. if the value is .15 ETH the deposit should be .165 ETH). This way the seller can rest asured you will keep your part of the deal." />
            <Selector value={selectedChain}  label="Select Network"  items={NETWORK_SELECTOR_ITEMS} onSelect={setSelectedChain} />
            <div className="flex">
                <Button label="Create Trustless Deal" onClick={handleFormSubmit} type="primary" />
            </div>
            {(error && !isLoadingWrite && !isSuccess) && <div className="text-red-700 rounded p-2 bg-red-100 font-semibold text-sm border border-red-700">{error}</div>}
        </div>
    );
}

export default NewBuyerDealForm;