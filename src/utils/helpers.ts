export const date = (date: Date) => date.toISOString().split("T")[0]

export const toNumber = (price: string) => Number(price.replace(/[^0-9.-]+/g, ""))