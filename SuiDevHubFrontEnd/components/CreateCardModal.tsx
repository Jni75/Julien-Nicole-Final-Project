import { useDevHubContext } from "@/contexts/DevHubContext"
import { useMoveCalls } from "@/hooks/useMoveCalls"
import { useForm } from "react-hook-form"

type CreateCardForm = {
    name: string
    title: string
    imgUrl: string
    yearsXp: number
    technologies: string
    portfolio: string
    contact: string
}

export const CreateCardModal = () => {
    const { hideCreateCardModal } = useDevHubContext()
    const { register, handleSubmit, formState: { errors } } = useForm<CreateCardForm>()
    const { handleCreateDeveloperCard } = useMoveCalls()

    const onSubmit = async (data: CreateCardForm) => {
        await handleCreateDeveloperCard(
            data.name,
            data.title,
            data.imgUrl,
            data.yearsXp,
            data.technologies,
            data.portfolio,
            data.contact
        )
        hideCreateCardModal()
    }

    const handleCancel = () => hideCreateCardModal()

    return (
        <dialog className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Create new card</h3>
                <label className="form-control w-full flex gap-1">
                    <div className="label">
                        <span className="label-text">What is your name?</span>
                    </div>
                    <input type="text" className="input input-bordered w-full" {...register('name', { required: "Fill your name" })} />
                    {errors?.name && <span className="text-error">{errors.name.message}</span>}
                </label>
                <label className="form-control w-full flex gap-1">
                    <div className="label">
                        <span className="label-text">What is your title?</span>
                    </div>
                    <input type="text" className="input input-bordered w-full" {...register('title', { required: "Fill your title" })} />
                    {errors?.title && <span className="text-error">{errors.title.message}</span>}
                </label>
                <label className="form-control w-full flex gap-1">
                    <div className="label">
                        <span className="label-text">What do you look like?</span>
                    </div>
                    <input type="text" className="input input-bordered w-full" {...register('imgUrl', { required: "Fill your image url" })} />
                    <div className="label">
                        <span className="label-text-alt">Paste an url to your picture</span>
                    </div>
                    {errors?.imgUrl && <span className="text-error">{errors.imgUrl.message}</span>}
                </label>
                <label className="form-control w-full flex gap-1">
                    <div className="label">
                        <span className="label-text">How long have you been working?</span>
                    </div>
                    <input type="number" className="input input-bordered w-full" {...register('yearsXp', { validate: (v) => (!isNaN(v) && v > 0) || "Fill your experience" })} />
                    {errors?.yearsXp && <span className="text-error">{errors.yearsXp.message}</span>}
                </label>
                <label className="form-control w-full flex gap-1">
                    <div className="label">
                        <span className="label-text">What do you like to work with?</span>
                    </div>
                    <input type="text" className="input input-bordered w-full" {...register('technologies', { required: "Fill your favorite technologies" })} />
                    <div className="label">
                        <span className="label-text-alt">Describe your favorite technologies, separated by commas</span>
                    </div>
                    {errors?.technologies && <span className="text-error">{errors.technologies.message}</span>}
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
                        <span className="label-text">How can we reach you?</span>
                    </div>
                    <input type="text" className="input input-bordered w-full" {...register('contact', { required: "Fill your email address" })} />
                    <div className="label">
                        <span className="label-text-alt">Fill your email address</span>
                    </div>
                    {errors?.contact && <span className="text-error">{errors.contact.message}</span>}
                </label>
                <div className="modal-action flex gap-1">
                    <button className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Create</button>
                    <button className="btn" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </dialog>
    )
}