"use client";

import { useContext, useEffect, useState } from "react";
import { useAccount, useNetwork } from "wagmi";
import { PublicClientContext } from "../../providers/WalletProvider/PublicClientContext";
import { parseAbiItem } from "viem";
import Button from "../../ui/Button/Button";
import Loader from "../../ui/Loader/Loader";
import Link from "next/link";
import { ethers } from "ethers";
import Image from "next/image";

const Profile = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const publicClient = useContext(PublicClientContext);
  const publicClientInstance = publicClient({chainId: chain.id});
  const [selectedRole, setSelectedRole] = useState('creator');
  const [results, setResults] = useState({
    creator: {
      loaded: false,
      data: []
    },
    beneficiary: {
      loaded: false,
      data: []
    },
    arbitrer: {
      loaded: false,
      data: []
    },
  });
  
  const roles = ['creator', 'beneficiary', 'arbitrer'];

  useEffect(() => {
    const getLogs = () => {
      publicClientInstance.getLogs({
        address: process.env.contractAddress,
        event: parseAbiItem('event DealCreated(string dealType, uint256 id, address indexed creator, address indexed beneficiary, address indexed arbitrer, uint256 expirationTime, uint256 value, string state)'),
        args: {
            [selectedRole]: address,
        },
        fromBlock: 'earliest'
      }).then(data => {
        setResults({
          ...results,
          [selectedRole]: {
            loaded: true,
            results: data
          }
        })
      })
    }
    if(!results[selectedRole].loaded) getLogs();

  }, [selectedRole]);

  const renderResults = (items) => {
    if(items.results.length === 0) return <div className="text-sm p-2">No Deals as {selectedRole}</div>
    const elements = items.results.map(result => {
      const {id, dealType, value} = result.args;
      const ethValue = ethers.formatEther(value);

      return (
        <Link key={`${dealType}-${id}`} href={`/deal/${dealType}/${id}`}>
          <div className="text-sm rounded-t flex mb-2 p-2 borde border-b justify-between border-gray-400 hover:bg-green-200">
            <div className="font-semibold">{dealType}-{String(result.args.id)}</div>
            <div className="ml-20 font-semibold flex">
              {ethValue}
              <Image
                className="ml-2"
                src="/icons/ethereum.svg"
                alt="ethereum logo"
                height="10"
                width="10"
              />
            </div>
          </div>
        </Link>
      )
    })

    return elements
  }

  return (
    <div className="w-full">
      <div className="text-4xl font-bold">Address Deals</div>
      <div className="text-base font-light mt-2 text-gray-600 mb-8">Select a role to see all Deals where you take part. <span className="font-bold">Select a Deal to see more information and take action. </span></div>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col gap-2 md:border-r border-gray-400 pb-5 mb-5 md:pr-5">
          <div className="text-sm mb-2">Select your role in the Deal:</div>
          {roles.map(role => (
            <Button key={role} label={role.toLocaleUpperCase()} onClick={() => setSelectedRole(role)} type={selectedRole === role ? 'primary' : 'secondary'} />
          ))}
        </div>
        <div className="md:ml-5 min-w-[40%]">
          <div className="flex justify-between px-2 font-semibold text-sm mb-2">
              <div>Id</div>
              <div>Value</div>
          </div>
          {
            Object.keys(results).map(key => {
              return (
                <div key={key} className={`${key === selectedRole ? 'block' : 'hidden'}`}>
                  {
                    (results && results[key].loaded) ? 
                      renderResults(results[key]) : (
                      <div className="flex">
                        <Loader />
                      </div>
                    )
                  }
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Profile;