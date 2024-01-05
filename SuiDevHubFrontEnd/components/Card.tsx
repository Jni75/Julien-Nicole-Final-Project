/* eslint-disable @next/next/no-img-element */
import { useDevHubContext } from "@/contexts/DevHubContext"
import { DevCardType } from "@/types"
import { useCurrentWallet } from "@mysten/dapp-kit"

type CardProps = {
    card: DevCardType
}

export const Card = ({ card }: CardProps) => {
    const { currentWallet } = useCurrentWallet()
    const { showEditCardModal } = useDevHubContext()

    const technologies = card.technologies.split(',')

    const imgUrl = card.img_url === 'https://example_url.png' ? "Sui_Logo_White.png" : card.img_url

    const handleEdit = () => showEditCardModal(card)

    return (
        <div className="card w-72 bg-base-300 shadow-xl">
            <figure className="relative p-4">
                <img src={imgUrl} alt={card.name} />
                {currentWallet?.accounts?.some(x => x.address === card.owner) &&
                    <div className="absolute -top-2 -right-2">
                        <div className="btn btn-square btn-primary" onClick={handleEdit}>Edit</div>
                    </div>
                }
                <div className="absolute bottom-0 right-0 flex gap-1">
                    <div className="badge badge-info">{`${card.years_of_exp} years xp`}</div>
                    {card.open_to_work && <div className="badge badge-success min-w-[115px]">Open To Work</div>}
                </div>
            </figure>
            <div className="card-body">
                <h2 className="card-title justify-between">
                    <span className="line-clamp-1">{card.name}</span>
                </h2>
                <span className="text-sm">{card.title}</span>
                {card.description && <p>{card.description}</p>}
                <div className="card-actions justify-start">
                    {technologies.map((item, i) => <div key={i} className="badge badge-outline">{item}</div>)}
                </div>
                <div className="card-actions justify-end">
                    <a href={`mailto:${card.contact}`} target="_blank" className="btn btn-sm btn-outline btn-info">Contact</a>
                    <a href={card.portfolio} target="_blank" className="btn btn-sm btn-outline btn-success">Portfolio</a>
                </div>
            </div>
        </div>
    )
}

export const CardSkeleton = () => {
    return (
        <div className="card w-72 bg-base-300 shadow-xl">
            <figure className="p-4 h-40">
                <div className="skeleton w-full h-full" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    <div className="skeleton w-full h-7"></div>
                </h2>
                <div className="skeleton w-full h-20"></div>
            </div>
        </div>
    )
}