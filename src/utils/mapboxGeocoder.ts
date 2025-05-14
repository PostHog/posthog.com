/**
 * Utilities for geocoding place names to coordinates using Mapbox
 */

// Types for Mapbox geocoding
interface MapboxFeature {
  id: string;
  place_name: string;
  center: [number, number]; // [longitude, latitude]
  geometry: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  }
}

interface MapboxResponse {
  features: MapboxFeature[];
}

/**
 * Convert a place name to coordinates using Mapbox geocoding
 * Currently using mock data for development
 * 
 * @param placeName The place name to geocode
 * @returns Promise with coordinates as [longitude, latitude]
 */
export const geocodePlaceName = async (placeName: string): Promise<[number, number]> => {
  // For development, use mock data
  // In production, this would use the Mapbox geocoding API
  
  // Mock geocoding data
  const mockGeocoding: Record<string, [number, number]> = {
    'San Francisco, California, USA': [-122.4194, 37.7749],
    'London, United Kingdom': [-0.1278, 51.5074],
    'Singapore': [103.8198, 1.3521],
    'Berlin, Germany': [13.4050, 52.5200],
    'Tokyo, Japan': [139.6503, 35.6762],
    'New York, USA': [-74.0060, 40.7128],
    'Sydney, Australia': [151.2093, -33.8688],
    'Paris, France': [2.3522, 48.8566],
    'Amsterdam, Netherlands': [4.9041, 52.3676],
    'Barcelona, Spain': [2.1734, 41.3851],
    // Add more places as needed
    'Toronto, Canada': [-79.3832, 43.6532],
    'Dublin, Ireland': [-6.2603, 53.3498],
    'Stockholm, Sweden': [18.0686, 59.3293],
    'Lisbon, Portugal': [-9.1393, 38.7223],
    'Miami, USA': [-80.1918, 25.7617],
    'Austin, USA': [-97.7431, 30.2672],
    'Denver, USA': [-104.9903, 39.7392],
    'Mexico City, Mexico': [-99.1332, 19.4326],
    'São Paulo, Brazil': [-46.6333, -23.5505],
    'Madrid, Spain': [-3.7038, 40.4168],
    'Rome, Italy': [12.4964, 41.9028],
    'Athens, Greece': [23.7275, 37.9838],
    'Cape Town, South Africa': [18.4241, -33.9249],
    'Dubai, UAE': [55.2708, 25.2048],
    'Mumbai, India': [72.8777, 19.0760],
    'Bangkok, Thailand': [100.5018, 13.7563],
    'Seoul, South Korea': [126.9780, 37.5665],
    'Melbourne, Australia': [144.9631, -37.8136],
    'Wellington, New Zealand': [174.7762, -41.2865],
    'Tulum, Mexico': [-87.4792, 20.2150]
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Return mock coordinates or default to [0,0] if not found
  return mockGeocoding[placeName] || [0, 0];
};

/**
 * Production implementation using the Mapbox API
 * To be used when ready to move to production
 */
export const geocodePlaceNameWithMapbox = async (placeName: string): Promise<[number, number]> => {
  const MAPBOX_TOKEN = process.env.GATSBY_MAPBOX_TOKEN;
  
  if (!MAPBOX_TOKEN) {
    console.error('No Mapbox access token found');
    return [0, 0];
  }
  
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(placeName)}.json?access_token=${MAPBOX_TOKEN}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to geocode ${placeName}`);
    }
    
    const data: MapboxResponse = await response.json();
    
    if (data.features && data.features.length > 0) {
      return data.features[0].center;
    }
    
    console.warn(`No geocoding results found for: ${placeName}`);
    return [0, 0];
  } catch (error) {
    console.error('Error geocoding place:', placeName, error);
    return [0, 0];
  }
};

/**
 * Alias for compatibility with previous imports
 * @deprecated Use geocodePlaceName instead
 */
export const getCoordinatesFromMapbox = geocodePlaceName; 