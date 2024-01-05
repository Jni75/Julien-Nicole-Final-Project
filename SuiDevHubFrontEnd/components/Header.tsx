"use client"

import { ConnectButton } from "@mysten/dapp-kit"

export const Header = () => {

    return (
        <header className="w-full p-4 flex justify-between">
            <span>DevHub by Jni75</span>
            <ConnectButton />
        </header>
    )
}