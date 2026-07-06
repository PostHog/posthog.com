// Shared pricing-math constants — single source for values that would otherwise drift between the
// pricing page, the calculator, and product data.

// Hours in the longest (31-day) month. Converts MDW storage's billed GB-hours to the "N GB held all
// month" framing (100 GB free tier = 74,400 GB-hours) and $/GB-hour rates to $/GB-month.
export const HOURS_PER_MONTH = 744

// MDW compute's RAM weighting: 1 GB of RAM counts as 1/8 of a vCPU, so
// compute-hours = (vCPU + RAM_GB / COMPUTE_RAM_DIVISOR) × connected hours, and the single
// $/compute-hour rate decomposes to $rate/vCPU-hour + $(rate/8)/GB-hour.
// Must match the metering producer — if the metering ratio changes, update here too.
export const COMPUTE_RAM_DIVISOR = 8
