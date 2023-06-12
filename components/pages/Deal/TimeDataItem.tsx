"use client";

import moment from "moment";

const TimeDataItem = ({item, lastItem}) => {
    const [label, data] = item;
    return (
        <div key={label} className={`flex items-center justify-between p-2 whitespace-nowrap ${ !lastItem ? 'border-b border-gray-300' : ''}`}>
            <div className="mr-10 font-medium  text-gray-900">
                {label}
            </div>
            <div
                title={data}
                className="font-semibold py-1 px-2 overflow-hidden text-ellipsis text-right"
            >
                {moment.unix(Number(data)).format('DD/MM/YYYY HH:mm:ss')}
            </div>
        </div>
    )
}

export default TimeDataItem;