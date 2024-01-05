import { DEVHUB_ADDRESS, DEVHUB_OBJECT_TABLE_ADDRESS } from "@/constants"
import { DevCardType, DevHubType } from "@/types"
import { SuiRpcMethodName, useSuiClientQuery } from "@mysten/dapp-kit"
import { useEffect, useState } from "react"

type SuiDevHubResponse = {
    data: DevHubType
}

type SuiDevCardResponse = {
    data: {
        content: {
            fields: DevCardType
        }
    }
}

export const useDevHub = () => {
    const [devHub, setDevHub] = useState<DevHubType>()
    const { data, refetch, isRefetching } = useSuiClientQuery<SuiRpcMethodName, SuiDevHubResponse>("getObject", {
        id: DEVHUB_ADDRESS,
        options: {
            showContent: true
        }
    })

    useEffect(() => {
        if (data?.data) {
            setDevHub(data.data)
        }
    }, [data?.data])

    return {
        devHub,
        refetchDevHub: refetch
    }
}

export const useDevHubObjectTable = () => {
    const [cardsId, setCardsId] = useState<string[]>()
    const { data, refetch } = useSuiClientQuery("getDynamicFields", {
        parentId: DEVHUB_OBJECT_TABLE_ADDRESS
    })

    useEffect(() => {
        if (data?.data) {
            setCardsId(data.data.map(x => x.objectId))
        }
    }, [data?.data])

    return {
        cardsId,
        refetchObjectTable: refetch
    }
}

export const useDevHubCards = (ids: string[]) => {
    const [cards, setCards] = useState<DevCardType[]>()
    const { data } = useSuiClientQuery<"multiGetObjects", SuiDevCardResponse[]>("multiGetObjects", {
        ids,
        options: {
            showContent: true,
            showDisplay: true
        }
    })

    useEffect(() => {
        if (data) {
            setCards(data.map(x => x.data.content.fields))
        }
    }, [data])

    return {
        cards
    }
}