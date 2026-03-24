import { GlucoseLimits, InsulinRatio } from "../types"

/**
 * * In this file types such as therapyInput for endpoint POST or
 * * therapyInputUpdate for endpoint PUT are defined.
 */


export type therapyInput = {
    userId: string
    ratios: InsulinRatio[]
    insulinActive: number
    glucoseLimits: GlucoseLimits
}