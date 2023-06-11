"use client";

import { useContext, useEffect, useState } from "react";
import { useAccount, useNetwork } from "wagmi";
import { PublicClientContext } from "../../providers/WalletProvider/PublicClientContext";
import { parseAbiItem } from "viem";
import Button from "../../ui/Button/Button";
import Loader from "../../ui/Loader/Loader";
import Link from "next/link";
import moment from "moment";

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
    },
    arbitrer: {
      loaded: false,
      data: []
    },
  });
  
  const roles = ['buyer', 'seller', 'arbitrer'];

  useEffect(() => {
    const getLogs = () => {
      publicClientInstance.getLogs({
        address: process.env.sepoliaContractAddress,
        event: parseAbiItem('event DealCreated(string dealType, uint256 id, address indexed buyer, address indexed seller, address indexed arbitrer, uint256 expirationTime, uint256 value, string state)'),
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
    if(items.results.length === 0) return <div className="text-sm">No Deals as {selectedRole}</div>
    const elements = items.results.map(result => {
      return (
        <Link key={result.args.id} href={`/deal/${result.args.id}`}>
          <div className="text-sm rounded-t flex mb-2 p-2 borde border-b border-gray-400 hover:bg-green-200">
            <div className="font-bold"><span className="font-light">ID:</span> {String(result.args.id)}</div>
            <div className="ml-20 font-bold"><span className="font-light">Expires:</span> { moment.unix(Number(String(result.args.expirationTime))).format('DD/MM/YYYY HH:mm:ss')}</div>
          </div>
        </Link>
      )
    })

    return elements
  }

  return (
    <div className="w-full">
      <div className="text-4xl font-bold">Address Deals</div>
      <div className="text-lg font-light mt-2 text-gray-600 mb-8">Select a role to see all Deals where you take part. Select a Deal to see more information and take action.</div>
      <div className="flex">
        <div className="flex flex-col gap-2 border-r border-gray-400 pr-5">
          {roles.map(role => (
            <Button key={role} label={role.toLocaleUpperCase()} onClick={() => setSelectedRole(role)} type={selectedRole === role ? 'primary' : 'secondary'} />
          ))}
        </div>
        <div className="ml-5">
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