"use client";

import moment from "moment";

const TimeDataItem = ({item}) => {
    const [label, data] = item;
    return (
        <div key={label} className={`flex items-center justify-between p-2 whitespace-nowrap`}>
            <div className="mr-10 font-light text-gray-900">
                {label}
            </div>
            <div
                title={data}
                className="font-semibold py-1 px-2 overflow-hidden text-ellipsis text-right"
            >
                {moment.unix(Number(data)).format('dddd MMMM DD YYYY HH:mm:ss')}
            </div>
        </div>
    )
}

export default TimeDataItem;