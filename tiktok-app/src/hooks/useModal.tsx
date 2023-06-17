import { useContext } from "react"
import { WrapperContext } from "@/context/WrapperApp"
function useModal() {

    const { modalState, setModalState } = useContext(WrapperContext)

    return {
        modalState,
        setModalState
    }
}

export default useModal