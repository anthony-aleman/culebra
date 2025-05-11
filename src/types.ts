export interface Dispensary {
    id: string,
    name: string,
    url: string,
    platform: string
}

export interface canna {
    name: string,
    thc_percent: number,
    price: number,
    in_stock: boolean,
    dispensary_id: string
}