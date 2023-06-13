import classNames from "classnames";

const Tooltip = ({ children, text, position = 'left'}) => {
    const stateClassName = classNames(
        'absolute text-sm w-60 bg-gray-900 text-white p-2 rounded hidden group-hover:block',
        { 'right-0' : position === 'left'},
        { 'left-0' : position === 'right'},
    )
    return (
        <div className="relative group">
            {children}
            <span className={stateClassName}>{text}</span>
        </div>
    )
}

export default Tooltip;
