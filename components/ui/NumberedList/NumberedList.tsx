const NumberedList = ({items}) => {
    return (
        <div className="mt-5">
            {items.map((item, index) => {
                return (
                    <div key={item} className="text-sm text-left relative pb-5 flex leading-6 after:content-[''] after:bg-green-300 after:w-[1px]  after:absolute after:top-0 after:left-[12px] after:bottom-0 after:-z-10 last:after:content-none">
                        <div className="rounded-xl  min-w-[24px] min-h-[24px] h-[24px] bg-green-300 flex justify-center items-center mr-2">{index + 1}</div>
                        {item}
                    </div>
                );
            })}
        </div>
    )
}

export default NumberedList;