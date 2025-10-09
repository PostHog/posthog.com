// https://api.exchangeratesapi.io/2021-01-01?base=USD

// https://posthog.com/handbook/people/compensation#location-factor
// We don't update the currency conversion rating anymore,
// we update the location factor (location_factor.ts) instead.
export const currencyData: Record<string, number> = {
    CAD: 1.264,
    HUF: 324.71,
    CZK: 21.872,
    GBP: 0.733,
    RON: 4.351,
    BRL: 5.571,
    EUR: 0.879,
    BGN: 1.718,
    TRY: 13.321,
    NOK: 8.818,
    ZAR: 15.951,
    USD: 1,
    MXN: 20.497,
    SGD: 1.349,
    ILS: 3.113,
    PLN: 4.035,
    RSD: 107.5,
}
