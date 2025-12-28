# Mobile Responsive CSS - Implementation Guide

## Overview
This file contains comprehensive mobile-responsive styles for the NanoSpace website. It provides optimized styling for all home page components across different screen sizes.

## Installation

### 1. Import in Your Main CSS/Index File

Add this import to your `src/index.css` file:

```css
@import './styles/mobile-responsive.css';
```

### 2. Or Import in Your Main App Component

Add this import to your `src/App.jsx` or `src/main.jsx`:

```javascript
import './styles/mobile-responsive.css';
```

## Breakpoints

The file uses the following breakpoints:

- **Mobile**: `max-width: 640px` (Small phones)
- **Tablet**: `max-width: 768px` (Tablets and large phones)
- **Desktop**: `max-width: 1024px` (Small laptops)

## Component Coverage

### ✅ Covered Components:

1. **Hero Section**
   - Responsive heights
   - Optimized padding
   - Mobile-friendly search form

2. **Service Categories**
   - Responsive card heights
   - Adjusted text sizes

3. **Platform Stats**
   - Floating card sizing
   - Stats number sizing
   - Button adjustments

4. **What You Get**
   - Image height adjustments
   - Benefit icon sizing
   - Text optimization

5. **Space Search Form**
   - Form input sizing
   - Button adjustments
   - Image sizing

6. **Top Coworking/Coliving**
   - City card heights
   - Text sizing

7. **Featured Coworking**
   - Brand logo sizing
   - Banner adjustments
   - Contact info sizing

8. **Trusted Companies**
   - Company name sizing
   - Grid adjustments

9. **City Grid**
   - Icon sizing (already handled in CityGrid.css)
   - Grid gap adjustments

## Utility Classes

### Spacing
- `.section-padding` - Responsive section padding
- `.container-padding` - Responsive container padding

### Grid Layouts
- `.grid-2-cols` - 2 columns on desktop, 1 on mobile
- `.grid-3-cols` - 3 columns on desktop, 2 on tablet, 1 on mobile
- `.grid-4-cols` - 4 columns on desktop, 2 on tablet, 1 on mobile
- `.grid-6-cols` - 6 columns on desktop, 3 on tablet, 2 on mobile

### Text Sizing
- `.text-responsive-xl` - Extra large responsive text
- `.text-responsive-lg` - Large responsive text
- `.text-responsive-md` - Medium responsive text
- `.text-responsive-sm` - Small responsive text
- `.text-responsive-xs` - Extra small responsive text

### Buttons
- `.btn-primary` - Primary button with responsive sizing
- `.btn-secondary` - Secondary button with responsive sizing
- `.btn-large` - Large button with responsive sizing
- `.btn-mobile-full` - Full width on mobile

### Visibility
- `.hide-mobile` - Hide on mobile devices
- `.show-mobile` - Show only on mobile devices
- `.hide-desktop` - Hide on desktop
- `.show-desktop` - Show only on desktop

### Touch Optimizations
- `.no-select-mobile` - Prevent text selection on mobile
- `.scroll-container` - Smooth scrolling container

## Usage Examples

### Example 1: Using Utility Classes in Components

```jsx
<section className="section-padding">
  <div className="container-padding">
    <h2 className="text-responsive-xl">Heading</h2>
    <div className="grid-3-cols">
      {/* Grid items */}
    </div>
  </div>
</section>
```

### Example 2: Responsive Buttons

```jsx
<button className="btn-primary btn-mobile-full">
  Click Me
</button>
```

### Example 3: Hide/Show Elements

```jsx
<div className="hide-mobile">
  {/* Desktop only content */}
</div>

<div className="show-mobile">
  {/* Mobile only content */}
</div>
```

## Component-Specific Classes

### Hero Section
- `.hero-section`
- `.hero-content`
- `.hero-title`
- `.hero-search-form`
- `.hero-search-input`
- `.hero-search-select`
- `.hero-search-button`
- `.hero-image-container`

### Service Categories
- `.service-categories-section`
- `.service-card`
- `.service-card-title`
- `.service-card-subtitle`

### Platform Stats
- `.platform-stats-section`
- `.floating-card`
- `.floating-card-image`
- `.floating-card-title`
- `.stats-number`
- `.stats-label`
- `.platform-heading`
- `.platform-subheading`
- `.platform-button`

### What You Get
- `.what-you-get-section`
- `.what-you-get-image`
- `.what-you-get-heading`
- `.benefit-icon-container`
- `.benefit-text`

### Space Search
- `.space-search-section`
- `.space-search-card`
- `.space-search-heading`
- `.space-search-subheading`
- `.space-search-form`
- `.space-search-input`
- `.space-search-submit`
- `.space-search-image`

### Top Cities
- `.top-cities-section`
- `.top-cities-heading`
- `.city-card`
- `.city-card-title`
- `.city-card-tagline`

### Featured Section
- `.featured-section`
- `.featured-heading`
- `.brand-logo-container`
- `.featured-banner`
- `.featured-banner-title`
- `.feature-item-icon`
- `.feature-item-text`
- `.contact-info`
- `.featured-image`

### Trusted Companies
- `.trusted-companies-section`
- `.trusted-companies-heading`
- `.company-name`
- `.company-grid`

### City Grid
- `.city-grid`
- `.city-grid-button`

### Section Headings
- `.section-heading`
- `.section-heading-decorator`
- `.section-underline`

## Performance Features

1. **Touch Optimizations**
   - Minimum 44px touch targets
   - Smooth scrolling
   - Optimized for touch devices

2. **Image Optimization**
   - Responsive images
   - Optimized rendering

3. **Reduced Motion**
   - `.reduce-motion-mobile` class for better performance

## Best Practices

1. **Use Tailwind Classes First**
   - The existing components use Tailwind CSS
   - This file provides additional mobile optimizations
   - Use these classes when Tailwind classes are not sufficient

2. **Apply Classes to Components**
   - Add these classes to your existing components
   - They will override Tailwind classes when needed

3. **Test on Real Devices**
   - Always test on actual mobile devices
   - Use Chrome DevTools mobile emulation

4. **Combine with Existing Styles**
   - These styles work alongside your existing CSS
   - They use `!important` sparingly, only when necessary

## Maintenance

- Update breakpoints if needed
- Add new component-specific classes as you create new components
- Keep utility classes consistent with Tailwind naming conventions

## Notes

- This file is designed to work with the existing Tailwind CSS setup
- All measurements use rem units for better accessibility
- Touch targets meet WCAG 2.1 AA standards (minimum 44x44px)
- Optimized for performance on mobile devices
