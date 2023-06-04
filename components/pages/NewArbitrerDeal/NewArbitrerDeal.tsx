"use client";
import { useState } from "react";
import { ethers } from "ethers";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import Selector from "../../ui/Selector/Selector";
import abi from '../../../contracts/BlockchainDeal.json';
import { EXPIRATION_VALUES, ONE_DAY } from "../NewDeal/expiration";
import { useContractEvent, useContractWrite, useWaitForTransaction } from "wagmi";
import { useRouter } from 'next/navigation'
import Loader from "../../ui/Loader/Loader";

const NewArbitrerDeal = () => {
    const router = useRouter();
    let contractInterface = new ethers.Interface(abi);
    const { data, write } = useContractWrite({
        address: process.env.sepoliaContractAddress,
        abi,
        functionName: 'createArbitrerDeal',
    });

    useContractEvent({
        address: process.env.sepoliaContractAddress,
        abi,
        eventName: 'DealCreated',
        listener(log) {
          console.log(log)
        },
      })

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
        onSettled(data, error) {
            const parsedLogs = contractInterface.parseLog(data.logs[0]);
            router.push(`/deal/${ Number(parsedLogs.args[1])}`);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-w-full">
            <div>
                <div className="text-4xl font-bold">The Arbitrer Deal</div>
                <div className="text-lg font-light mt-2 text-gray-600">Choose an arbitrer you trust to approve your deal.</div>
                <div className="text-md mt-4 text-gray-900 rounded">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit dolore quo vel, saepe eum soluta, vero rerum aliquam veritatis libero nihil quae reprehenderit, aliquid architecto perspiciatis nam ex dolor provident?</div>
            </div>
            <div className="border border-gray-300 rounded p-5">
                <form className="flex flex-col gap-6 relative">
                    <div className={`transition-all ease-in duration-1000 w-full h-full bg-white/50 backdrop-blur absolute rounded flex flex-col justify-center items-center outline outline-8 outline-green-300 ${isLoading ? 'opacity-100 z-2' : 'opacity-0 -z-10'}`}>
                        <p className="font-bold text-center">Waiting for transaction. This may take a few seconds</p>
                        <Loader />
                    </div>
                    <Input data={transactionData} validationText="The value should be grater than 0" handleChange={handleValueChange} label="Value" placeholder="Value of the transaction in ETH" type="number" />
                    <Input data={arbitrerData} validationText="Invalid Etheteum address"  handleChange={handleArbitrerChange} label="Arbitrer" placeholder="Arbitrer's Ethereum address" type="text" info="This should be someone you and the beneficiary trust"/>
                    <Input data={buyerData} validationText="Invalid Etheteum address" handleChange={handleBuyerChange} label="Buyer / Beneficiary" placeholder="Buyer's / Beneficiary's Ethereum address" type="text" />
                    <Selector value={expirationDate} label="Expires in" items={EXPIRATION_VALUES} onSelect={(selected) => setExpirationDate(selected)}/>
                    <div className="flex">
                        <Button label="Create Arbitrer Deal" onClick={handleFormSubmit} type="primary"/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewArbitrerDeal;