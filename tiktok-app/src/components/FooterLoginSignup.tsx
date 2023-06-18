import React from "react"
import useModal from "@/hooks/useModal"

interface IFooterLoginSignup {
    textA: string,
    textB: string
}
const FooterLoginSignup: React.FC<IFooterLoginSignup> = ({ textA, textB }) => {

    const { setModalState } = useModal()

    const onChangeMode = (condition: string) => {
        setModalState(condition)
    }
    return (
        <section>
            <div className="text-xs text-zinc-400 text-center py-4" style={{ background: 'rgb(18, 18, 18)' }}>
                <p>Bằng cách tiếp tục, bạn đồng ý với <span className="text-white">Điều khoản Sử dụng</span> của TikTok và</p>
                <p> xác nhận rằng bạn đã đọc hiểu <span className="text-white">Chính sách Quyền riêng tư</span>  của TikTok.</p>
            </div>
            <div
                className="bg-gray-50 px-4 py-3 text-center"
                style={{ background: 'rgb(37, 37, 37)' }}
            >
                <p
                    className="font-semibold text-white">
                    {textA}
                    <span onClick={() => onChangeMode(textB === 'Đăng ký' ? 'signup' : 'login')} className="text-rose-600 font-bold ms-1 hover:decoration-current hover:underline cursor-pointer" >{textB}</span>
                </p>
            </div>
        </section>
    )
}

export default FooterLoginSignup