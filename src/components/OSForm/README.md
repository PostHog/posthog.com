# OSForm Components

A comprehensive form component system for the PostHog website that provides consistent styling and behavior across all forms.

## Components

### OSInput

A flexible input component with support for various input types, sizes, layouts, and validation states.

```tsx
import { OSInput } from 'components/OSForm'
;<OSInput
    label="Email Address"
    type="email"
    name="email"
    required
    tooltip="We'll never share your email"
    description="Your primary contact email"
    placeholder="you@example.com"
/>
```

#### Props

| Prop              | Type                                     | Default      | Description                                                               |
| ----------------- | ---------------------------------------- | ------------ | ------------------------------------------------------------------------- |
| `label`           | `string`                                 | required     | The label text displayed for the input                                    |
| `type`            | `string`                                 | `"text"`     | HTML input type (text, email, password, tel, number, etc.)                |
| `name`            | `string`                                 | -            | The name attribute for the input field                                    |
| `direction`       | `"row" \| "column"`                      | `"row"`      | Layout direction - row shows label beside input, column shows label above |
| `size`            | `"sm" \| "md" \| "lg"`                   | `"md"`       | Size of the input and text                                                |
| `width`           | `"full" \| "auto" \| "fit"`              | `"full"`     | Width behavior of the input field                                         |
| `required`        | `boolean`                                | `false`      | Shows red asterisk and marks field as required                            |
| `showLabel`       | `boolean`                                | `true`       | Whether to show the label                                                 |
| `labelWidth`      | `string`                                 | `"w-[90px]"` | Tailwind width class for label in row layout                              |
| `tooltip`         | `string`                                 | -            | Shows info icon with hover tooltip next to label                          |
| `description`     | `string`                                 | -            | Helper text displayed below the label (before the input)                  |
| `placeholder`     | `string`                                 | -            | Placeholder text (defaults to label if not provided)                      |
| `touched`         | `boolean`                                | `false`      | Whether field has been interacted with (for validation)                   |
| `error`           | `string`                                 | -            | Error message to display when validation fails                            |
| `dataScheme`      | `"primary" \| "secondary" \| "tertiary"` | -            | Sets the data-scheme attribute for different background colors            |
| `showClearButton` | `boolean`                                | `false`      | Shows a clear button when the input has a value                           |
| `onClear`         | `() => void`                             | -            | Callback function when the clear button is clicked                        |
| `value`           | `string`                                 | -            | The input value (required when using showClearButton)                     |

### OSTextarea

A textarea component with the same flexible options as OSInput.

```tsx
import { OSTextarea } from 'components/OSForm'
;<OSTextarea
    label="Message"
    name="message"
    rows={5}
    required
    description="Please be as detailed as possible"
    placeholder="Enter your message here..."
/>
```

#### Props

All props from OSInput plus:

| Prop         | Type                                     | Default | Description                                                    |
| ------------ | ---------------------------------------- | ------- | -------------------------------------------------------------- |
| `rows`       | `number`                                 | `4`     | Number of visible text rows                                    |
| `dataScheme` | `"primary" \| "secondary" \| "tertiary"` | -       | Sets the data-scheme attribute for different background colors |

### OSSelect

A flexible select component with built-in search functionality and support for icons, descriptions, and various layouts.

```tsx
import { OSSelect } from 'components/OSForm'
;<OSSelect
    label="Status"
    options={[
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Complete', value: 'complete' },
        { label: 'Under Consideration', value: 'under-consideration' },
    ]}
    value={status}
    onChange={setStatus}
    searchable={true}
    placeholder="Select status..."
/>
```

#### Props

| Prop                | Type                                     | Default                 | Description                                                                |
| ------------------- | ---------------------------------------- | ----------------------- | -------------------------------------------------------------------------- |
| `label`             | `string`                                 | required                | The label text displayed for the select                                    |
| `options`           | `SelectOption[]`                         | required                | Array of select options                                                    |
| `value`             | `any`                                    | -                       | The currently selected value                                               |
| `onChange`          | `(value: any) => void`                   | required                | Callback when selection changes                                            |
| `placeholder`       | `string`                                 | `"Select an option..."` | Placeholder text when no option is selected                                |
| `direction`         | `"row" \| "column"`                      | `"row"`                 | Layout direction - row shows label beside select, column shows label above |
| `size`              | `"sm" \| "md" \| "lg"`                   | `"md"`                  | Size of the select and text                                                |
| `width`             | `"full" \| "auto" \| "fit"`              | `"full"`                | Width behavior of the select field                                         |
| `required`          | `boolean`                                | `false`                 | Shows red asterisk and marks field as required                             |
| `showLabel`         | `boolean`                                | `true`                  | Whether to show the label                                                  |
| `labelWidth`        | `string`                                 | `"w-[90px]"`            | Tailwind width class for label in row layout                               |
| `tooltip`           | `string \| React.ReactNode`              | -                       | Shows info icon with hover tooltip next to label                           |
| `description`       | `string`                                 | -                       | Helper text displayed below the label (before the select)                  |
| `disabled`          | `boolean`                                | `false`                 | Whether the select is disabled                                             |
| `searchable`        | `boolean`                                | `true`                  | Whether to show search input in dropdown                                   |
| `searchPlaceholder` | `string`                                 | `"Search..."`           | Placeholder text for search input                                          |
| `maxHeight`         | `string`                                 | `"max-h-60"`            | Maximum height of the dropdown                                             |
| `dataScheme`        | `"primary" \| "secondary" \| "tertiary"` | -                       | Sets the data-scheme attribute for different background colors             |
| `touched`           | `boolean`                                | `false`                 | Whether field has been interacted with (for validation)                    |
| `error`             | `string`                                 | -                       | Error message to display when validation fails                             |

#### SelectOption Interface

| Prop          | Type                        | Description                                       |
| ------------- | --------------------------- | ------------------------------------------------- |
| `label`       | `string`                    | The display text for the option                   |
| `value`       | `any`                       | The value returned when this option is selected   |
| `disabled`    | `boolean`                   | Whether this option is disabled                   |
| `icon`        | `string \| React.ReactNode` | Icon to display next to the option                |
| `color`       | `string`                    | Color for the icon                                |
| `description` | `string`                    | Additional description text shown below the label |

### Fieldset

A component for grouping related form fields with a border and legend.

```tsx
import { Fieldset } from 'components/OSFieldset'
;<Fieldset legend="Personal Information">
    <OSInput label="First Name" name="firstName" direction="column" />
    <OSInput label="Last Name" name="lastName" direction="column" />
    <OSInput label="Email" type="email" name="email" direction="column" />
</Fieldset>
```

#### Props

| Prop        | Type        | Default  | Description                           |
| ----------- | ----------- | -------- | ------------------------------------- |
| `legend`    | `string`    | required | The text shown in the fieldset border |
| `children`  | `ReactNode` | required | Form fields to group together         |
| `className` | `string`    | -        | Additional CSS classes                |

## Size Options

Components support three size presets that affect padding and font size:

-   **`sm`**: Compact size with smaller text and padding

    -   Input: `px-1.5 py-1 text-sm`
    -   Label: `text-sm`

-   **`md`**: Default size for most forms

    -   Input: `px-2.5 py-2 text-[15px]`
    -   Label: `text-[15px]`

-   **`lg`**: Larger size for prominent forms
    -   Input: `px-3 py-2.5 text-base`
    -   Label: `text-base`

## Layout Options

### Direction

Controls how labels are positioned relative to inputs:

-   **`row`**: Label appears to the left of the input (default)

    -   Good for compact forms with short labels
    -   Label width can be customized with `labelWidth` prop

-   **`column`**: Label appears above the input
    -   Better for longer labels or mobile layouts
    -   Takes full width of container

### Width

Controls the input field width behavior:

-   **`full`**: Takes full width of container (default)
-   **`auto`**: Width based on content
-   **`fit`**: Fits content with minimal width

## Validation & Error Handling

Components support validation states and error messages:

```tsx
<OSInput label="Email" type="email" touched={true} error="Please enter a valid email address" />
```

-   Error messages appear below the input in red text
-   Border color changes to red when error is present and field is touched
-   Required fields show a red asterisk (\*) inline with the label text

## Features

### Tooltips

Add contextual help with tooltips that appear on hover:

```tsx
<OSInput label="API Key" tooltip="You can find this in your account settings" />
```

### Descriptions

Provide additional context directly below the label (before the input field):

```tsx
<OSInput label="Username" description="Choose a unique username between 3-20 characters" />
```

### Required Fields

Mark fields as required to show an asterisk:

```tsx
<OSInput label="Email" required />
```

The asterisk appears inline with the label text and wraps naturally if the label spans multiple lines.

## Usage Examples

### Basic Contact Form

```tsx
<div className="space-y-4">
    <OSInput label="Name" name="name" required />
    <OSInput label="Email" type="email" name="email" required tooltip="We'll never share your email" />
    <OSTextarea label="Message" name="message" rows={5} required description="Tell us how we can help" />
</div>
```

### Two-Column Form

```tsx
<div className="grid grid-cols-2 gap-4">
    <OSInput label="First Name" name="firstName" direction="column" required />
    <OSInput label="Last Name" name="lastName" direction="column" required />
    <OSInput label="Email" type="email" name="email" direction="column" className="col-span-2" required />
</div>
```

### Inline Form with Consistent Label Widths

```tsx
<div className="space-y-3">
    <OSInput label="Username" labelWidth="w-24" name="username" required />
    <OSInput label="Email" type="email" labelWidth="w-24" name="email" required />
    <OSTextarea label="Bio" labelWidth="w-24" rows={3} name="bio" />
</div>
```

### Grouped Fields with Fieldset

```tsx
<div className="space-y-4">
    <Fieldset legend="Account Information">
        <OSInput label="Username" direction="column" name="username" />
        <OSInput label="Password" type="password" direction="column" name="password" />
    </Fieldset>

    <Fieldset legend="Contact Details">
        <OSInput label="Email" type="email" direction="column" name="email" />
        <OSInput label="Phone" type="tel" direction="column" name="phone" />
    </Fieldset>
</div>
```

### Select Examples

#### Basic Select

```tsx
<OSSelect
    label="Status"
    options={[
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Complete', value: 'complete' },
        { label: 'Under Consideration', value: 'under-consideration' },
    ]}
    value={status}
    onChange={setStatus}
/>
```

#### Select with Search

```tsx
<OSSelect
    label="Product"
    options={products.map((product) => ({
        label: product.name,
        value: product.id,
        description: product.description,
    }))}
    value={selectedProduct}
    onChange={setSelectedProduct}
    searchable={true}
    searchPlaceholder="Search products..."
/>
```

#### Select with Icons and Descriptions

```tsx
<OSSelect
    label="Team"
    options={[
        {
            label: 'Engineering',
            value: 'engineering',
            icon: <IconCode className="size-4" />,
            description: 'Software development team',
        },
        {
            label: 'Design',
            value: 'design',
            icon: <IconBrush className="size-4" />,
            description: 'User experience and visual design',
        },
        {
            label: 'Product',
            value: 'product',
            icon: <IconChart className="size-4" />,
            description: 'Product strategy and management',
        },
    ]}
    value={selectedTeam}
    onChange={setSelectedTeam}
    direction="column"
/>
```

#### Select with Validation

```tsx
<OSSelect
    label="Priority"
    options={[
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
        { label: 'Critical', value: 'critical' },
    ]}
    value={priority}
    onChange={setPriority}
    required
    touched={touched.priority}
    error={errors.priority}
    tooltip="Select the priority level for this task"
/>
```

#### Compact Select

```tsx
<OSSelect
    label="Size"
    options={[
        { label: 'XS', value: 'xs' },
        { label: 'SM', value: 'sm' },
        { label: 'MD', value: 'md' },
        { label: 'LG', value: 'lg' },
        { label: 'XL', value: 'xl' },
    ]}
    value={size}
    onChange={setSize}
    size="sm"
    width="auto"
/>
```

### Form with Mixed Layouts

```tsx
<div className="space-y-4">
    {/* Compact row layout for short labels */}
    <OSInput label="Age" type="number" name="age" size="sm" width="auto" />

    {/* Column layout for longer labels */}
    <OSInput
        label="What is your primary use case for PostHog?"
        direction="column"
        name="useCase"
        description="This helps us provide better support"
    />

    {/* Full-width textarea */}
    <OSTextarea
        label="Additional Comments"
        direction="column"
        name="comments"
        rows={6}
        placeholder="Any other information you'd like to share..."
    />
</div>
```

## Styling

All components use PostHog's design system:

-   **Colors**: Uses theme-aware colors (`bg-primary`, `border-primary`, `text-primary`, etc.)
-   **Dark mode**: Fully supports dark mode with appropriate color changes
-   **Focus states**: Shows focus ring on interaction
-   **Error states**: Red borders and text for validation errors
-   **Required indicators**: Red asterisk for required fields

### Data Schemes

The `dataScheme` prop allows form components to adapt their background colors to different contexts. This is particularly useful when forms appear on different colored backgrounds:

```tsx
// Use primary scheme for forms on secondary/tertiary backgrounds
<OSInput
  label="Name"
  dataScheme="primary"
  name="name"
/>

// Use secondary scheme for forms on primary backgrounds
<OSTextarea
  label="Message"
  dataScheme="secondary"
  name="message"
/>
```

When set, the `dataScheme` prop applies a `data-scheme` attribute to the component's outermost element, which triggers the appropriate color theme defined in your CSS.

## Integration with Form Libraries

These components work well with form libraries like Formik or react-hook-form:

### Search Input with Clear Button

```tsx
<OSInput
    label="Search"
    showLabel={false}
    placeholder="Search..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    onClear={() => setSearchQuery('')}
    showClearButton={true}
    name="search"
/>
```

The clear button automatically appears when the input has a value and disappears when empty. The input automatically adds right padding to accommodate the clear button.

### With Formik

```tsx
<Formik initialValues={{ email: '', message: '' }} onSubmit={handleSubmit} validationSchema={validationSchema}>
    {({ errors, touched, getFieldProps }) => (
        <Form>
            <OSInput
                label="Email"
                type="email"
                touched={touched.email}
                error={errors.email}
                {...getFieldProps('email')}
            />
            <OSTextarea
                label="Message"
                touched={touched.message}
                error={errors.message}
                {...getFieldProps('message')}
            />
        </Form>
    )}
</Formik>
```

## Best Practices

1. **Use consistent sizing**: Pick a size (`sm`, `md`, or `lg`) and use it throughout a form for visual consistency

2. **Choose appropriate layouts**:

    - Use `direction="row"` for short labels and compact forms
    - Use `direction="column"` for longer labels or mobile-first designs

3. **Provide helpful descriptions**: Add `description` or `tooltip` props to guide users

4. **Mark required fields**: Always use the `required` prop for mandatory fields

5. **Handle validation properly**: Set `touched` to `true` only after user interaction to avoid showing errors prematurely

6. **Group related fields**: Use `Fieldset` to visually group related inputs

7. **Consider accessibility**: Always provide labels and use semantic HTML input types

## Migration from Legacy Components

If migrating from the old `INPUT_CLASSES` constant:

```tsx
// Old approach
<input className={INPUT_CLASSES} />

// New approach
<OSInput label="Field Name" name="fieldName" />
```

The new components provide:

-   Consistent styling without manual class application
-   Built-in label, error, and description handling
-   Proper accessibility attributes
-   Theme-aware styling
-   Required field indicators
