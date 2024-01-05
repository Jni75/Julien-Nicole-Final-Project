import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import { useCurrentWallet } from "@mysten/dapp-kit"
import { useDevHubContext } from "@/contexts/DevHubContext"

export const AddCardButton = () => {
    const { showCreateCardModal } = useDevHubContext()
    const { isDisconnected } = useCurrentWallet()

    const handleClick = () => showCreateCardModal()

    return (
        <button className="btn btn-sm btn-outline btn-success uppercase" onClick={handleClick} disabled={isDisconnected}><FontAwesomeIcon icon={faAdd} /> Add</button>
    )
}