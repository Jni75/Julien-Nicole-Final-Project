import { useDevHubCardContext } from "@/contexts/DevHubCardContext"
import { useDevHubContext } from "@/contexts/DevHubContext"
import { useMoveCalls } from "@/hooks/useMoveCalls"
import { DevCardType } from "@/types"
import { useForm } from "react-hook-form"

type EditCardForm = {
    description: string
    portfolio: string
    openToWork: boolean
}

type EditCardModalProps = {
    card: DevCardType
}

export const EditCardModal = ({ card }: EditCardModalProps) => {
    const { hideEditCardModal } = useDevHubContext()
    const { cards } = useDevHubCardContext()
    const { register, handleSubmit, formState: { errors } } = useForm<EditCardForm>({
        defaultValues: {
            description: card.description ?? "",
            portfolio: card.portfolio,
            openToWork: card.open_to_work
        }
    })
    const { handleUpdateDeveloperCard } = useMoveCalls()

    const onSubmit = async (data: EditCardForm) => {
        const counter = cards.indexOf(card) + 1
        await handleUpdateDeveloperCard(counter, data.description, data.portfolio, data.openToWork)
        hideEditCardModal()
    }

    const handleCancel = () => hideEditCardModal()

    return (
        <dialog className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Edit your card</h3>
                <label className="form-control w-full flex gap-1">
                    <div className="label">
                        <span className="label-text">How would you describe yourself?</span>
                    </div>
                    <input type="text" className="input input-bordered w-full" {...register('description', { required: "Fill your description" })} />
                    {errors?.description && <span className="text-error">{errors.description.message}</span>}
                </label>
                <label className="form-control w-full flex gap-1">
                    <div className="label">
                        <span className="label-text">Where can we see your work?</span>
                    </div>
                    <input type="text" className="input input-bordered w-full" {...register('portfolio', { required: "Fill your portolio url" })} />
                    <div className="label">
                        <span className="label-text-alt">Paste an url to your portfolio</span>
                    </div>
                    {errors?.portfolio && <span className="text-error">{errors.portfolio.message}</span>}
                </label>
                <label className="form-control w-full flex gap-1">
                    <div className="label">
                        <span className="label-text">Are you open to work?</span>
                    </div>
                    <input type="checkbox" className="toggle toggle-primary" {...register('openToWork')} />
                </label>
                <div className="modal-action flex gap-1">
                    <button className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Update</button>
                    <button className="btn" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </dialog>
    )
}