import useModal from "@/hooks/useModal"
import FooterLoginSignup from "@/commonUI/FooterLoginSignup"
function Login() {

    const { setModalState } = useModal()
    return (
        <>
            <div
                className="bg-transparent px-4 pb-4 pt-5 sm:p-6 sm:pb-4"
            >
                <button style={{ background: 'rgb(46, 46, 46)' }} className=" absolute right-5 rounded-full w-10 h-10 text-white text-2xl"><i className="fas fa-times"></i></button>

                <div className="sm:flex sm:items-center flex-col ">

                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3 className="font-black text-white text-center mt-16 mb-5 text-4xl"
                            id="modal-title">
                            Đăng nhập vào TikTok
                        </h3>

                    </div>
                    <div onClick={() => setModalState('childLogin')} className="mt-2 text-center text-sm text-white py-3 w-[90%] relative cursor-pointer" style={{ background: 'rgb(46, 46, 46)' }}>
                        <i className="far fa-user absolute left-5 top-1/3"></i>
                        <p> Số điện thoại / Email / TikTok ID</p>
                    </div>
                </div>
            </div>
            <FooterLoginSignup
                textA="Bạn không có tài khoản?"
                textB="Đăng ký"
            />
        </>
    )
}

export default Login