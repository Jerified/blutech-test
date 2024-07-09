export type Product = {
    UPC: string
    Image_1: string
    SKU: string
    Name: string
    Title: string
    Description: string
    Brand: number
    'Cost Price': number
    Quantity: number
    size: number
}

export const columns = [
    {
        key: 's/n',
        label: 'S/N'
    },
    {
        key: 'img',
        label: 'Image'
    },
    {
        key: 'sku',
        label: 'SKU'
    },
    {
        key: 'name',
        label: 'Name'
    },
    {
        key: 'title',
        label: 'Title'
    },
    {
        key: 'description',
        label: 'Description'
    },
    {
        key: 'brand',
        label: 'Brand'
    },
    {
        key: 'costPrice',
        label: 'Cost Price'
    },
    {
        key: 'quantity',
        label: 'Quantity'
    },
    {
        key: 'size',
        label: 'Size'
    }
]