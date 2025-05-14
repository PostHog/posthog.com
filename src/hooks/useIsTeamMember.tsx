import { useUser } from './useUser'

/**
 * Hook to check if the current user is a PostHog team member
 * @returns {boolean} true if the user is a team member, false otherwise
 */
export const useIsTeamMember = (): boolean => {
    const { user, isModerator, isLoading } = useUser()
    
    // Log debug information if in development environment
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        console.log('useIsTeamMember debug:', { 
            isLoading, 
            user: user ? 'exists' : 'null', 
            isModerator,
            isTeamMember: !!isModerator
        });
    }
    
    // If still loading, default to false
    if (isLoading) {
        return false;
    }
    
    // PostHog team members have moderator privileges
    return !!isModerator
} 