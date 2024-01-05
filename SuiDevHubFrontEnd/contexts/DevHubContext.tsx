'use client'
import { Spinner } from "@/components/Spinner"
import { useDevHub, useDevHubObjectTable } from "@/hooks/useDevHub"
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import { DevHubCardContextProvider } from "./DevHubCardContext"
import { useSuiEvents } from "@/hooks/useSuiEvents"
import { SuiEvent } from "@mysten/sui.js/client"
import { CreateCardModal } from "@/components/CreateCardModal"
import { DevCardType } from "@/types"
import { EditCardModal } from "@/components/EditCardModal"

type DevHubContext = {
    counter: number
    showCreateCardModal: () => void
    hideCreateCardModal: () => void
    showEditCardModal: (card: DevCardType) => void
    hideEditCardModal: () => void
}

const DevHubContext = createContext<DevHubContext>(undefined as unknown as DevHubContext)

export const useDevHubContext = () => useContext(DevHubContext)

export const DevHubContextProvider = ({ children }: PropsWithChildren) => {
    const { devHub, refetchDevHub } = useDevHub()
    const { cardsId, refetchObjectTable } = useDevHubObjectTable()
    const { subscribe } = useSuiEvents()
    const [init, setInit] = useState(false)
    const [createCardModalVisible, setCreateCardModalVisible] = useState(false)
    const [currentEditCard, setCurrentEditCard] = useState<DevCardType | undefined>()

    const refresh = async () => {
        await refetchDevHub()
        await refetchObjectTable()
    }

    const handleMessage = (event: SuiEvent) => {
        console.debug('event', event)
        refresh()
    }

    useEffect(() => {
        const handle = setTimeout(() => {
            if (!init) {
                subscribe(handleMessage)
                setInit(true)
            }
        }, 200)

        return () => {
            clearTimeout(handle)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [init])

    useEffect(() => {
        console.debug('devHub', devHub)
    }, [devHub])

    const showCreateCardModal = () => setCreateCardModalVisible(true)
    const hideCreateCardModal = () => setCreateCardModalVisible(false)

    const showEditCardModal = (card: DevCardType) => setCurrentEditCard(card)
    const hideEditCardModal = () => setCurrentEditCard(undefined)

    if (!devHub || !cardsId) return <Spinner />

    return (
        <DevHubContext.Provider value={{ counter: parseInt(devHub.content.fields.counter), showCreateCardModal, hideCreateCardModal, showEditCardModal, hideEditCardModal }}>
            {createCardModalVisible && <CreateCardModal />}
            <DevHubCardContextProvider cardsId={cardsId}>
                {currentEditCard && <EditCardModal card={currentEditCard} />}
                {children}
            </DevHubCardContextProvider>
        </DevHubContext.Provider>
    )
}