import classNames from "classnames";
import { STATE } from "../../../services/getDeal/dealTypes";

const DataItem = ({item, lastItem, isExpired}) => {
    const [label, data] = item;
    const stateExpired = data !== STATE.COMPLETED && data !== STATE.VALUE_CLAIMED && isExpired && lastItem;
    const stateClassName = classNames(
        'font-semibold py-1 px-2 overflow-hidden text-ellipsis text-right',
        { 'text-green-700': data === STATE.COMPLETED || data === STATE.VALUE_CLAIMED || data === STATE.CONFIRMED},
        { 'text-red-500': stateExpired || data === STATE.CANCELLED_BY_CREATOR},
        { 'text-blue-600': (data === STATE.PENDING_APPROVAL || data === STATE.PENDING_BENEFICIARY_DEPOSIT) && !isExpired},
    );

    return (
        <div key={label} className={`flex items-center justify-between p-2 whitespace-nowrap ${ !lastItem ? 'border-b border-gray-300' : ''}`}>
            <div className="mr-10 font-medium  text-gray-900">
                {label}
            </div>
            <div
                title={stateExpired ? 'Expired' : data}
                className={stateClassName}
            >
                {stateExpired ? 'Expired' : data}
            </div>
        </div>
    )
}

export default DataItem;