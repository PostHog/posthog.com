import React, { useState, useEffect } from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import HogsitesMap, { HogLocation } from 'components/Maps/HogsitesMap'
import { geocodePlaceName } from '../utils/mapboxGeocoder'
import { useIsTeamMember } from 'hooks/useIsTeamMember'
import { navigate } from 'gatsby'
import { useUser } from 'hooks/useUser'

// Type for data from Strapi API
interface StrapiMeetup {
    id: number;
    attributes: {
        name: string;
        location: string;
        startDate: string;
        endDate: string;
        team: string;
        description?: string;
        funFact?: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    }
}

interface StrapiResponse {
    data: StrapiMeetup[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        }
    }
}

// Sample data structure for visited locations
interface VisitedLocation {
    name: string
    place: string // Location name that we'll geocode with Mapbox
    date: string
    team: string
    description?: string
    funFact?: string
}

/**
 * Converts a meetup to the HogLocation format
 */
const convertMeetupToHogLocation = async (meetup: VisitedLocation): Promise<HogLocation> => {
    const coordinates = await geocodePlaceName(meetup.place);
    return {
        ...meetup,
        coordinates
    } as HogLocation;
};

const HogsitesPage = () => {
    // State for meetup data
    const [meetups, setMeetups] = useState<VisitedLocation[]>([]);
    const [apiError, setApiError] = useState<string | null>(null);
    
    // State for geocoded locations
    const [geocodedLocations, setGeocodedLocations] = useState<HogLocation[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<HogLocation | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const isTeamMember = useIsTeamMember();
    const { isLoading: isUserLoading } = useUser();
    
    // Redirect to 404 if not a team member, but only after user data is loaded
    useEffect(() => {
        // Only check after user data is loaded
        if (!isUserLoading && !isTeamMember) {
            navigate('/404');
        }
    }, [isTeamMember, isUserLoading]);

    // Fetch meetups from the REST API
    useEffect(() => {
        const fetchMeetups = async () => {
            try {
                // Use GATSBY_SQUEAK_API_HOST as the API host
                const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/meetups?populate=*`);
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch meetups: ${response.status}`);
                }
                
                const data: StrapiResponse = await response.json();
                
                if (data?.data?.length > 0) {
                    // Map the Strapi data to our VisitedLocation format
                    const formattedMeetups = data.data.map(item => ({
                        name: 'Unnamed Event', // Default name since it's missing in the sample data
                        place: item.attributes.location || 'Unknown Location',
                        date: item.attributes.startDate || new Date().toISOString(),
                        team: 'Team PostHog', // Default team since structure is different in sample data
                        description: 'Team offsite meeting',
                        funFact: 'This was our first international team offsite!'
                    }));
                    
                    console.log('Formatted meetups:', formattedMeetups);

                    setMeetups(formattedMeetups);
                } else {
                    console.log('No meetups found, using sample data');
                }
            } catch (error) {
                console.error('Error fetching meetups:', error);
                setApiError(error instanceof Error ? error.message : 'Unknown error fetching meetups');
                // We're already using sample data as the default state
            }
        };
        
        fetchMeetups();
    }, []);
    
    // Fetch coordinates from Mapbox for each location
    useEffect(() => {
        const geocodeLocations = async () => {
            setIsLoading(true);
            try {
                const geocoded = await Promise.all(
                    meetups.map(convertMeetupToHogLocation)
                );
                setGeocodedLocations(geocoded);
            } catch (error) {
                console.error('Error geocoding locations:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        geocodeLocations();
    }, [meetups]);

    // Handler for when a location is clicked on the map
    const handleLocationClick = (location: HogLocation | null) => {
        setSelectedLocation(location);
    };

    // Format date for display
    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        } catch (e) {
            return 'Invalid date';
        }
    };

    return (
        <Layout>
            <SEO
                title="Hogsites - PostHog"
                description="Tracking the global adventures of PostHog! 🦔 🌍"
                image={`/images/hogsites.png`}
            />
            <PostLayout title={'Hogsites'} hideSidebar hideSurvey>
                <section className="w-full mx-auto">
                    {apiError && (
                        <div className="mb-4 p-3 bg-red/10 border border-red/30 rounded text-sm">
                            <p>Error loading meetups: {apiError}</p>
                            <p className="text-xs mt-1 opacity-70">Using sample data instead.</p>
                        </div>
                    )}
                    <div className="w-full flex flex-col gap-8">
                    <header id="our-story" className="pt-8 pb-4 md:pb-8 px-4 md:px-12">
                        <h1 className="text-4xl md:text-6xl text-center mb-4 leading-none">
                            Hogsites <br className="hidden xl:block" />{' '}
                            <span className="text-red">Our Global Adventures</span>
                        </h1>
                        <h3 className="text-center opacity-60 font-semibold">
                            <p className="pb-0 mb-0 text-xl">
                            Planning an offsite? Steal from the best. Here’s your one-stop shop for meetup mischief and memories (and occasionally cautionary tales). HogSpot is where legendary meetups live on.
                            </p>
                        </h3>
                    </header>
                    <div className="">
                        <LazyHog
                            data={hogData[1]}
                            placeholder={
                                <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_1_f3739e1374.png" alt="Hog" placeholder="blurred" />
                            }
                        />
                    </div>
                            
                            {/* Map */}
                            <h2 className="font-bold text-2xl mb-4">Get inspired</h2>
                            <div className="w-full bg-accent/10 dark:bg-accent-dark/10 rounded-md overflow-hidden h-[500px] mb-6">
                                {isLoading ? (
                                    <div className="h-full flex items-center justify-center">
                                        <div className="text-center">
                                            <p className="font-semibold">🦔 Waking up hedgehogs...</p>
                                            <p className="text-sm opacity-60 mt-2">Loading the world map</p>
                                        </div>
                                    </div>
                                ) : (
                                    <HogsitesMap 
                                        locations={geocodedLocations} 
                                        onLocationClick={handleLocationClick}
                                        selectedLocation={selectedLocation}
                                    />
                                )}
                            </div>
                            
                            {/* Display locations in a list */}
                            <div className="mt-8">
                                <h2 className="font-bold text-2xl mb-4">🧳 Hog-Spotting Locations</h2>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {geocodedLocations.map((location, index) => (
                                        <div 
                                            key={index} 
                                            className={`border rounded-md p-4 transition-colors hover:shadow-md cursor-pointer ${
                                                selectedLocation?.place === location.place
                                                    ? 'border-primary/50 dark:border-primary-dark/50 bg-accent/5 dark:bg-accent-dark/5'
                                                    : 'border-light dark:border-dark hover:border-primary/50 dark:hover:border-primary-dark/50'
                                            }`}
                                            onClick={() => setSelectedLocation(location)}
                                        >
                                            <h3 className="font-bold text-lg mb-1">{location.name}</h3>
                                            <p className="text-sm opacity-75">{location.place}</p>
                                            <p className="text-sm opacity-60 mb-2">
                                                {formatDate(location.date || '')}
                                            </p>
                                            {location.description && (
                                                <p className="text-sm mt-2 opacity-75">{String(location.description)}</p>
                                            )}
                                            {location.funFact && (
                                                <div className="mt-3 bg-accent/30 dark:bg-accent-dark/30 p-2 rounded-md">
                                                    <p className="text-sm font-medium">🦔 Hog Fact: {String(location.funFact)}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-10 bg-accent/20 dark:bg-accent-dark/20 p-6 rounded-md text-center">
                                    <h3 className="font-bold text-xl mb-2">🦔 Spotted a PostHog in the wild?</h3>
                                    <p className="opacity-70">
                                        If you've encountered our team in their natural habitat (usually near coffee machines or snack bars), 
                                        let us know! We're collecting field research on hedgehog migration patterns.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </PostLayout>
        </Layout>
    )
}

export default HogsitesPage 