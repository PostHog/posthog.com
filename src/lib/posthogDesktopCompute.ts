export interface ComputeRateCard {
    cpu_core_second_usd: string
    memory_gib_second_usd: string
}

export const PUBLISHED_COMPUTE_RATE_CARD: ComputeRateCard = {
    cpu_core_second_usd: '0.000075',
    memory_gib_second_usd: '0.000008',
}

export const PUBLISHED_RATES_DATE = 'August 21, 2026'

export const BILLABLE_CPU_CORES = 0.5
export const BILLABLE_MEMORY_GIB = 16

const SECONDS_PER_HOUR = 3600

export const hourlyComputeUsd = (compute: ComputeRateCard): number =>
    BILLABLE_CPU_CORES * SECONDS_PER_HOUR * Number(compute.cpu_core_second_usd) +
    BILLABLE_MEMORY_GIB * SECONDS_PER_HOUR * Number(compute.memory_gib_second_usd)
