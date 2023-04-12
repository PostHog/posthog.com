export const getTailwindGridCol = (length: number) =>
    `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${length > 6 ? length / 2 : length}`
