import { useActiveFeatureFlags } from './useActiveFeatureFlags'

type Cloud = 'eu' | 'us'

export default function useCloud(): Cloud | null {
    const activeFlags = useActiveFeatureFlags()
    const isEU = activeFlags?.includes('direct-to-eu-cloud')
    const isUS = activeFlags?.includes('direct-to-us-cloud')
    const cloud = isEU ? 'eu' : isUS ? 'us' : null
    return cloud
}
