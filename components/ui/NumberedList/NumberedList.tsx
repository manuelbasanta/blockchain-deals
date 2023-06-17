const NumberedList = ({items}) => {
    return (
        <div className="mt-5">
            {items.map((item, index) => {
                return (
                    <div key={item} className="relative pb-5 text-sm flex leading-6 before:content-[''] before:bg-green-300 before:w-[1px]  before:absolute before:top-0 before:left-[12px] before:bottom-0 before:-z-10 last:before:content-none">
                        <div className="text-sm rounded-xl  min-w-[24px] min-h-[24px] h-[24px] bg-green-300 flex text-center justify-center items-center mr-2">{index + 1}</div>
                        {item}
                    </div>
                );
            })}
        </div>
    )
}

export default NumberedList;