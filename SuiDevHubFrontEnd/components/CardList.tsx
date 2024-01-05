'use client'

import { DevHubContextProvider, useDevHubContext } from "@/contexts/DevHubContext"
import { Card, CardSkeleton } from "./Card"
import { useDevHubCardContext } from "@/contexts/DevHubCardContext"
import { AddCardButton } from "./AddCardButton"

export const CardList = () => {

    return (
        <DevHubContextProvider>
            <div className="p-2 flex flex-col gap-2">
                <div className="flex  items-center gap-1">
                    <h1 className="text-2xl">Developers list</h1>
                    <AddCardButton />
                </div>
                <CardListWrapper />
            </div>
        </DevHubContextProvider>
    )
}

const CardListWrapper = () => {
    const { counter } = useDevHubContext()

    if (counter === 0) {
        return (
            <div>
                No results
            </div>
        )
    }

    return (
        <div className="flex flex-wrap gap-1 justify-center">
            {[...Array(counter)].map((_, i) => <CardWrapper key={i} index={i} />)}
        </div>
    )
}

type CardWrapperProps = {
    index: number
}

const CardWrapper = ({ index }: CardWrapperProps) => {
    const { cards } = useDevHubCardContext()

    if (cards.length < index || !cards[index]) return <CardSkeleton />

    return <Card card={cards[index]} />
} 