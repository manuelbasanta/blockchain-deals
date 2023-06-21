"use client";

import { useContext, useEffect, useState } from "react";
import { useAccount, useNetwork } from "wagmi";
import { PublicClientContext } from "../../providers/WalletProvider/PublicClientContext";
import { parseAbiItem } from "viem";
import Button from "../../ui/Button/Button";
import Loader from "../../ui/Loader/Loader";
import Link from "next/link";
import { ethers } from "ethers";
import moment from "moment";
import { CHAIN_DATA } from "../../../services/getDeal/networkTypes";

const Profile = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const publicClient = useContext(PublicClientContext);
  const publicClientInstance = publicClient({chainId: chain.id});
  const [selectedRole, setSelectedRole] = useState('buyer');
  const [results, setResults] = useState({
    buyer: {
      loaded: false,
      data: []
    },
    seller: {
      loaded: false,
      data: []
    }
  });
  
  const roles = ['buyer', 'seller'];

  // TODO: se ejecuta dos veces getLogs en el primer render

  const getLogs = () => {
    publicClientInstance.getLogs({
      address: CHAIN_DATA[chain.id].contract_address,
      event: parseAbiItem('event DealCreated(uint256 id, address indexed buyer, address indexed seller, uint256 creationTime, uint256 value)'),
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

  useEffect(() => {
    if(!results[selectedRole].loaded) getLogs();
  }, [selectedRole, results]);

  useEffect(() => {
    setResults({
      buyer: {
        loaded: false,
        data: []
      },
      seller: {
        loaded: false,
        data: []
      }
    });
  }, [address, chain]);

  const renderResults = (items) => {
    if(items.results.length === 0) return <div className="text-sm p-2">No Deals as {selectedRole}</div>
    const elements = items.results.map(result => {
      const {id, dealType, value, creationTime} = result.args;
      const ethValue = ethers.formatEther(value);

      return (
        <Link key={`${dealType}-${id}`} href={`/deal/${id}?network=${chain.id}`}>
          <div className="text-sm rounded-t flex mb-2 p-2 borde border-b justify-between border-gray-400 hover:bg-green-200">
            <div className="font-semibold">#{String(result.args.id)}<div className="font-light text-xs mt-1">Created: <span className="text-xs font-bold">{moment.unix(Number(creationTime)).format('dddd MMMM DD YYYY')}</span></div></div>
            <div className="ml-20 font-semibold flex flex-col items-end justify-between">
              <div>
                {ethValue}
                <span className="ml-1">{CHAIN_DATA[chain.id].nativeCurrency}</span>
              </div>
              <div className="text-xs font-light">Network: <span className="font-bold">{CHAIN_DATA[chain.id].label}</span></div>
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
          <div className="max-w-xs text-sm mt-2 text-gray-600 mb-8 break-words">Deals for address <span className="font-bold">{address}</span> in  <span className="font-bold">{CHAIN_DATA[chain.id].label}</span> network.</div>
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