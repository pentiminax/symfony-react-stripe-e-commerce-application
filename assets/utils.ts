export const formatPrice = (price: number) => {
    const formatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

    return formatter.format(price / 100);
}