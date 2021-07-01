
interface PopupProps {
  children: React.ReactNode
  toggle: boolean
  setToggle: Function
  showClosed: boolean
}

const Popup: React.FC<PopupProps> = ({ children, toggle, setToggle, showClosed = false }) => {
  const popupStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    height: "100%",
    width: "100%"
  }
  
  return toggle ? (
    <div className="flex items-center inset-0 z-30 justify-center fixed overflow-hidden" style={popupStyle}>
        <div className="relative ">
            {showClosed && 
              <div 
                className="absolute right-2 top-2 border border-black leading-3 text-center cursor-pointer text-black overflow-hidden" 
                onClick={() => setToggle(false)}>
                X
              </div>
            }
            {children}
        </div>
    </div>
  ) : <></>
}

export default Popup
