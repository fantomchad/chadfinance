import tw from "twin.macro"

function StakeLp({ setToggle }) {
    return (
        <div tw=" flex flex-col px-2 py-4 bg-white space-y-6 opacity-100 border-4 rounded-xl background-color[#004FCE] border-white" >
            <span tw="border-b-2 border-white text-center text-3xl text-white" >Stake LP TOKENS</span>
            <div>
                <div tw="flex items-center rounded px-2 w-full relative bg-white">
                    <input placeholder="FTM-Chad LP" tw=" text-right px-2 appearance-none outline-none  py-2.5" type="text" />
                    <div tw=" cursor-pointer top-1.5 right-2 text-xl border-2 rounded px-2 border-color[#004FCE] hover:(background-color[#004FCE] text-white)">
                        <span>Max</span>
                    </div>
                </div>
                <div tw="text-white text-right mt-2">
                    <span>0</span>
                    <span> FTM-CHAD LP AVAILABLE</span>
                </div>
            </div>
            <div tw="flex items-center justify-center cursor-pointer text-white fill-current hover:text-black">

                <span tw=" text-center text-xl mr-2">Get FTM-CHAD LP</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.4778 0.00707915L13.7143 1.50069C13.3792 1.55216 13.3016 1.78893 13.5408 2.02667L14.7978 3.27372C15.0375 3.51146 15.0375 3.90067 14.7978 4.13792L7.7523 11.1281C7.51258 11.3658 7.51258 11.7555 7.7523 11.9928L11.9117 16.1197C12.1514 16.3574 12.5439 16.3574 12.7836 16.1197L19.8291 9.12955C20.0688 8.8918 20.4612 8.8918 20.701 9.12955L21.9579 10.3766C22.1971 10.6143 22.4354 10.5374 22.4873 10.2045L23.9929 0.518349C24.0443 0.185999 23.8129 -0.0439008 23.4778 0.00707915Z" />
                    <path d="M17.412 19.3716C17.412 20.5539 16.4422 21.5167 15.25 21.5167H4.66551C3.47331 21.5167 2.50353 20.5539 2.50353 19.3716V8.87119C2.50353 7.68787 3.47331 6.72562 4.66551 6.72562H10.5746L13.0782 4.24231H4.66551C2.09278 4.24231 0 6.31827 0 8.87119V19.3716C0 21.924 2.09278 24 4.66551 24H15.25C17.8223 24 19.9155 21.924 19.9155 19.3716V11.0172L17.412 13.501V19.3716Z" />
                </svg>

            </div>
            <div tw="flex justify-around">
                <div tw="bg-white rounded px-6 cursor-pointer hover:(bg-black text-white)" onClick={() => setToggle(false)} >
                    Cancel
                </div>
                <div tw="bg-white rounded px-6 cursor-pointer hover:(bg-black text-white)" onClick={() => setToggle(false)}>
                    Confirm
                </div>
            </div>
        </div>
    )
}

export default StakeLp