# PostHog Events Page

## Overview

This events page (`/events`) provides a comprehensive view of PostHog's community events, following the design language and patterns established in the PostHog website.

## Features

### 🎯 **Featured Events Section**
- Highlights the top 3 events with the highest vibe scores (5 stars)
- Card-based layout with event details, location, date, attendees, and speaker information
- Direct links to event details

### 📊 **Interactive Events Table**
- Complete table of all events with sortable columns
- Real-time filtering and sorting capabilities
- Displays: Event name, location, date, format, audience, attendees, speaker, partners, and vibe score
- Star rating system for vibe scores

### 🔍 **Filtering & Sorting**
- **Filter by:**
  - All Events
  - Upcoming Events
  - Past Events  
  - High Vibe Events (4+ stars)
- **Sort by:**
  - Vibe Score (default)
  - Date
  - Number of Attendees

### 📈 **Statistics Dashboard**
- Total number of events
- Total attendees across all events
- Average vibe score

### 🎨 **Design Features**
- Follows PostHog's design system and color scheme
- Responsive layout that works on all devices
- Uses PostHog's existing components (OSTable, ReaderView, etc.)
- Community-focused imagery and messaging
- Consistent with PostHog's brand voice

## Technical Implementation

### Components Used
- `ReaderView` - Main page layout
- `OSTable` - Interactive data table
- `CloudinaryImage` - Optimized image handling
- `Select` - Filter and sort controls
- `CallToAction` - Action buttons

### Data Structure
Events are defined with the following properties:
- `name` - Event title
- `location` - City/venue
- `date` - Event date
- `format` - Event type (meetup, conference, etc.)
- `audience` - Target audience
- `attendees` - Number of attendees
- `speaker` - PostHog speaker
- `partners` - Event partners
- `vibeScore` - 1-5 star rating
- `link` - Event details URL

### Key Features
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Accessibility** - Proper ARIA labels and semantic HTML
- **Performance** - Optimized images and efficient rendering
- **User Experience** - Intuitive filtering and sorting

## Usage

The events page is accessible at `/events` and provides:

1. **For Community Members**: Easy discovery of relevant events
2. **For Event Organizers**: Clear contact information for collaboration
3. **For PostHog Team**: Centralized view of all events and their success metrics

## Future Enhancements

Potential improvements could include:
- Calendar integration
- Event registration functionality
- Social sharing features
- Event photos and recaps
- Integration with PostHog's analytics for event tracking

## Files Modified

- `src/pages/events.tsx` - Main events page implementation

The page follows PostHog's established patterns and integrates seamlessly with the existing website architecture.
