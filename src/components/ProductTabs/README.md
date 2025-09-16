# ProductTabs Component

A reusable component that displays PostHog products as tabs using the OSTabs component. It automatically pulls product data from the `useProduct` hook based on an array of product handles.

## Usage

```tsx
import ProductTabs from 'components/ProductTabs'

// In your component
;<ProductTabs
    productHandles={[
        'session_replay',
        'web_analytics',
        'product_analytics',
        'experiments',
        'feature_flags',
        'surveys',
        'error_tracking',
    ]}
/>
```

## Props

-   `productHandles`: Array of product handles (strings) that correspond to products defined in `useProduct.ts` or `useProducts.tsx`
-   `className`: Optional CSS class for styling

## Features

-   **Automatic Data Fetching**: Pulls product information from the PostHog product data system
-   **Dynamic Tabs**: Creates tabs based on the provided product handles
-   **Product Icons**: Displays product icons with appropriate colors in tab labels
-   **Rich Content**: Shows product name, description, and first screenshot in tab content
-   **Color-Coded**: Uses each product's defined color for the content background
-   **Explore Links**: Each tab includes an "Explore" button linking to the product page
-   **Responsive Design**: Built on top of OSTabs for consistent styling and behavior

## Product Data Structure

The component expects products to have the following properties:

-   `handle`: Unique identifier for the product
-   `name`: Display name
-   `Icon`: React component for the product icon
-   `color`: Color identifier (used directly for Tailwind classes like `bg-${color}` and `text-${color}`)
-   `description`: Short description of the product
-   `slug`: URL slug for the product page
-   `screenshots`: Array of screenshot objects with `src` and `alt` properties

## Example Implementation

```tsx
const CompanyStageTabs = () => {
    const [selectedStage, setSelectedStage] = React.useState('growth')

    return (
        <>
            <ToggleGroup
                hideTitle
                title="Company stage"
                options={companyStageOptions}
                onValueChange={setSelectedStage}
                value={selectedStage}
            />

            {selectedStage === 'growth' && (
                <div className="flex flex-col gap-2">
                    <ProductTabs
                        productHandles={[
                            'session_replay',
                            'web_analytics',
                            'product_analytics',
                            'experiments',
                            'feature_flags',
                            'surveys',
                            'error_tracking',
                        ]}
                    />
                </div>
            )}
        </>
    )
}
```

## Default Behavior

-   The first product in the `productHandles` array is selected by default
-   If no products are found for the provided handles, the component returns `null`
-   Each OSTabs instance is completely independent and can have different product lists
