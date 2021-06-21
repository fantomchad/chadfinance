import tw from "twin.macro"

function Popup({ children, toggle, setToggle, showClosed = false }) {
    return toggle ? (
        <div tw=" flex items-center background-color[rgba(0, 0, 0, 0.3)] height[100%] inset-0 z-30 width[100%]  justify-center fixed overflow-hidden">
            <div tw="relative ">
                {showClosed && <div tw="absolute right-2 top-2 border border-black leading-3 text-center cursor-pointer" onClick={() => setToggle(false)} >X</div>}
                {children}
            </div>
        </div>
    ) : <></>
}

export default Popup
