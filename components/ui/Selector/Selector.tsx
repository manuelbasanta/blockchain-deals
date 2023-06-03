const Selector = ({ value, label, items, onSelect }) => {
    return (
        <div>
            <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
            <div className="mt-2">
                <select value={value} onChange={(event) => onSelect(event.target.value)} id={label} name={label} autoComplete={label} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-300">
                    {items.map(item =>  <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
            </div>
        </div>
    )
}

export default Selector;