import { useDevHubCards } from "@/hooks/useDevHub"
import { DevCardType } from "@/types"
import { PropsWithChildren, createContext, useContext } from "react"

type DevHubCardContext = {
    cards: DevCardType[]
}

const DevHubCardContext = createContext<DevHubCardContext>(undefined as unknown as DevHubCardContext)

export const useDevHubCardContext = () => useContext(DevHubCardContext)

type DevHubCardContextProviderProps = PropsWithChildren<{
    cardsId: string[]
}>
export const DevHubCardContextProvider = ({ cardsId, children }: DevHubCardContextProviderProps) => {
    const { cards } = useDevHubCards(cardsId)

    return (
        <DevHubCardContext.Provider value={{ cards: cards ?? [] }}>
            {children}
        </DevHubCardContext.Provider>
    )
}