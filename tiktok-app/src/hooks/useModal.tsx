import { useContext } from "react"
import { WrapperContext } from "@/context/WrapperApp"
function useModal() {

    const { modalState, setModalState, modalIsOpen, setModalIsOpen, currentUser, setCurrentUser } = useContext(WrapperContext)

    return {
        modalState,
        setModalState,
        modalIsOpen,
        setModalIsOpen,
        currentUser,
        setCurrentUser,
    }
}

export default useModal