'use client'
import { CONTRACT_ADDRESS, NETWORK } from "@/constants";
import { SuiClient, SuiEvent, SuiHTTPTransport, getFullnodeUrl } from "@mysten/sui.js/client";

export const useSuiEvents = () => {

    const subscribe = (onMessage: (event: SuiEvent) => void) => {
        const client = new SuiClient({
            transport: new SuiHTTPTransport({
                url: getFullnodeUrl(NETWORK),
                WebSocketConstructor: window.WebSocket,
            }),
        })

        return client.subscribeEvent({
            filter: {
                Package: CONTRACT_ADDRESS
            },
            onMessage: onMessage
        })
    }

    return {
        subscribe
    }
}