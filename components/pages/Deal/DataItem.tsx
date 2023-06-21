import classNames from "classnames";
import { STATE } from "../../../services/getDeal/dealTypes";
import Image from "next/image";

const DataItemnew = ({label, data, lastItem = false, type = 'regular', icon = null}) => {
    const stateClassName = classNames(
        'font-semibold py-1 px-2 overflow-hidden text-ellipsis text-right flex',
        { 'text-green-700': data === STATE.COMPLETED || data === STATE.CONFIRMED},
        { 'text-red-500': data === STATE.CANCELLED_BY_CREATOR},
        { 'text-blue-600': data === STATE.PENDING_SELLER_DEPOSIT || data === STATE.PENDING_BUYER_DEPOSIT},
    );

    return (
        <div key={label} className={`flex items-center justify-between p-2 whitespace-nowrap ${lastItem ? '' : 'border-b'}`}>
            <div className="mr-10 font-light  text-gray-900">
                {label}
            </div>
            <div
                title={data}
                className={stateClassName}
            >
                {data}
                {icon && (
                    <Image
                        className="ml-2"
                        src={icon}
                        alt={data}
                        height="12"
                        width="12"
                    />
                )}
            </div>
        </div>
    )
}

export default DataItemnew;