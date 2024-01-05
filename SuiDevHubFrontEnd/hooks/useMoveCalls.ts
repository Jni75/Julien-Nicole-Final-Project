"use client"

import { CONTRACT_ADDRESS, DEVHUB_ADDRESS } from '@/constants';
import { useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';

export const useMoveCalls = () => {
    const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();

    const tx = new TransactionBlock(); // Create a transaction block
    const devhubTx = tx.object(DEVHUB_ADDRESS)

    const handleCreateDeveloperCard = async (
        name: string,
        title: string,
        img_Url: string,
        years_of_experience: number,
        technologies: string,
        portfolio: string,
        contact: string) => {
        const [coin] = tx.splitCoins(tx.gas, [1]) // define payment coin

        // Calls the create_card function from the devcard package
        tx.moveCall({
            target: `${CONTRACT_ADDRESS}::devcard::create_card`,
            arguments: [
                tx.pure.string(name), // name
                tx.pure.string(title), // title
                tx.pure.string(img_Url), // img_url 
                tx.pure.u8(years_of_experience), // years_of_experience
                tx.pure.string(technologies), // technologies
                tx.pure.string(portfolio), // portfolio
                tx.pure.string(contact), // contact
                coin, // payment coin
                devhubTx, // devhub obj
            ],
        });

        // Sign and execute the transaction block
        await signAndExecuteTransactionBlock({ transactionBlock: tx });
    }

    const handleUpdateDeveloperCard = async (counter: number, description: string, portfolio: string, open_to_work: boolean) => {
        tx.moveCall({
            target: `${CONTRACT_ADDRESS}::devcard::update_card_description`,
            arguments: [
                devhubTx, // devhub obj
                tx.pure.string(description),
                tx.pure.u64(counter)
            ],
        })

        tx.moveCall({
            target: `${CONTRACT_ADDRESS}::devcard::update_portfolio`,
            arguments: [
                devhubTx, // devhub obj
                tx.pure.string(portfolio),
                tx.pure.u64(counter)
            ],
        })

        if (open_to_work) {
            tx.moveCall({
                target: `${CONTRACT_ADDRESS}::devcard::activate_card`,
                arguments: [
                    devhubTx, // devhub obj
                    tx.pure.u64(counter)
                ],
            })
        } else {
            tx.moveCall({
                target: `${CONTRACT_ADDRESS}::devcard::deactivate_card`,
                arguments: [
                    devhubTx, // devhub obj
                    tx.pure.u64(counter)
                ],
            })
        }

        await signAndExecuteTransactionBlock({ transactionBlock: tx });
    }

    return { handleCreateDeveloperCard, handleUpdateDeveloperCard }
}