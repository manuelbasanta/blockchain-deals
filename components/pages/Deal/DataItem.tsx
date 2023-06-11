import classNames from "classnames";
import { STATE } from "../../../services/getDeal/dealTypes";

const DataItem = ({item, lastItem, isExpired}) => {
    const [label, data] = item;
    const stateClassName = classNames(
        'font-semibold py-1 px-2 overflow-hidden text-ellipsis text-right',
        { 'text-green-700': data === STATE.COMPLETED || data === STATE.VALUE_CLAIMED},
        { 'text-red-500': data !== STATE.COMPLETED && data !== STATE.VALUE_CLAIMED && isExpired && lastItem},
        { 'text-blue-600': data === STATE.PENDING_APPROVAL && !isExpired },
    );
    return (
        <div key={label} className={`flex items-center justify-between p-2 whitespace-nowrap ${ !lastItem ? 'border-b border-gray-300' : ''}`}>
            <div className="mr-10 font-medium  text-gray-900">
                {label}
            </div>
            <div
                title={data}
                className={stateClassName}
            >
                {data !== STATE.COMPLETED && data !== STATE.VALUE_CLAIMED && isExpired && lastItem ? 'Expired' : data}
            </div>
        </div>
    )
}

export default DataItem;