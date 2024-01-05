type SuiId = {
    id: string
}

export type DevHubType = {
    content: {
        fields: {
            cards: {
                fields: {
                    id: SuiId
                }
            }
            counter: string
        }
    }
}

export type DevCardType = {
    contact: string
    description: string | null
    id: SuiId
    img_url: string
    name: string
    open_to_work: boolean
    owner: string
    portfolio: string
    technologies: string
    title: string
    years_of_exp: number
}