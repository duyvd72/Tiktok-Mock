

function Chat() {
    return (
        <main className='w-[90%] h-[90%] my-auto flex box shadow-lg p-0.5 rounded-lg' style={{ background: 'rgb(248, 248, 248)' }}>
            <article className=' w-1/4 flex flex-col bg-white rounded-lg'>
                <div className='flex items-center justify-between p-3'>
                    <p className='font-bold text-xl ps-2'>Tin nhắn</p>
                    <p className='text-2xl'>
                        <i className="fas fa-cog "></i>
                    </p>
                </div>
                <div className='bg-slate-700 flex-1'>
                    hi
                </div>
            </article>
            <article className='w-3/4 bg-white rounded-lg ms-5 flex flex-col'>
                <div className='p-5 border-b-2'>title</div>
                <div className='flex-1 border-b-2 '>message</div>
                <div className="bg-white py-3 flex ps-3">
                    <input placeholder="gửi tin nhắn..." className="bg-gray-200 p-2 ps-3 rounded-md w-full outline-none " />
                    <button className="text-2xl mx-5 ">
                        <i className="fas fa-paper-plane text-red-600"></i>
                    </button>
                </div>
            </article>
        </main>
    )
}

export default Chat