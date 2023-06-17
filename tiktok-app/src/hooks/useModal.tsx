import { useContext } from "react"
import { WrapperContext } from "@/context/WrapperApp"
function useModal() {

    const { modalState, setModalState, modalIsOpen, setModalIsOpen } = useContext(WrapperContext)

    return {
        modalState,
        setModalState,
        modalIsOpen,
        setModalIsOpen
    }
}

export default useModal