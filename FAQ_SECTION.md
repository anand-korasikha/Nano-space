# FAQ Section - Dynamic JSON Implementation

## ✅ FAQ Section Created with Dynamic Data Loading

I've created a fully functional FAQ (Frequently Asked Questions) section that dynamically loads questions and answers from a JSON file.

## 📁 Files Created

### 1. **faqData.json**
Location: `src/data/faqData.json`

**Structure:**
```json
{
    "coworking": [ ... ],
    "coliving": [ ... ],
    "virtualoffice": [ ... ]
}
```

**Categories:**
- ✅ **Coworking**: 10 FAQs
- ✅ **Coliving**: 5 FAQs
- ✅ **Virtual Office**: 5 FAQs

**Each FAQ Object:**
```json
{
    "id": 1,
    "question": "What is a coworking space?",
    "answer": "A coworking space is a shared workspace..."
}
```

### 2. **FAQ.jsx**
Location: `src/components/common/FAQ.jsx`

**Features:**
- Dynamically loads FAQs from JSON based on category
- Accordion-style expand/collapse
- Smooth animations
- Chevron icons (up/down)
- Accessible keyboard navigation
- Returns null if no FAQs found

**Props:**
- `category` (string): "coworking", "coliving", or "virtualoffice"

### 3. **FAQ.css**
Location: `src/components/common/FAQ.css`

**Styling:**
- Clean, modern accordion design
- Hover effects on questions
- Smooth expand/collapse animations
- Blue accent color (#0d6efd)
- Responsive design
- Focus states for accessibility

## 🎨 Design Features

### Accordion Layout:
```
┌────────────────────────────────────────┐
│  Frequently Asked Questions            │
│  Find answers to common questions...   │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ Question 1                    ▼  │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │ Question 2                    ▼  │  │
│  │ ┌──────────────────────────────┐ │  │
│  │ │ Answer 2 (expanded)          │ │  │
│  │ └──────────────────────────────┘ │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │ Question 3                    ▼  │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

## 📊 FAQ Content

### Coworking FAQs (10):
1. What is a coworking space?
2. What are the benefits of coworking spaces?
3. How much does a coworking space cost?
4. What amenities are included in coworking spaces?
5. Can I get a day pass for coworking spaces?
6. Are coworking spaces suitable for teams?
7. What is the difference between hot desk and dedicated desk?
8. Do coworking spaces have meeting rooms?
9. Are coworking spaces safe and secure?
10. Can I register my business at a coworking space address?

### Coliving FAQs (5):
1. What is coliving?
2. What amenities are included in coliving spaces?
3. How much does coliving cost?
4. Is food included in coliving?
5. What is the minimum stay period for coliving?

### Virtual Office FAQs (5):
1. What is a virtual office?
2. What services are included in a virtual office?
3. How much does a virtual office cost?
4. Can I use a virtual office address for GST registration?
5. Do I get access to meeting rooms with a virtual office?

## 🎯 Interactive Features

### Accordion Behavior:
- **Click Question**: Expands/collapses answer
- **One at a Time**: Only one FAQ open at a time
- **Smooth Animation**: Slide down/up effect
- **Icon Change**: Chevron down ↔ Chevron up

### Visual Feedback:
- **Hover**: Light gray background on question
- **Active**: Blue background when expanded
- **Border**: Blue border on active item
- **Shadow**: Enhanced shadow on hover/active

## 📱 Responsive Design

### Desktop (>768px):
- Max width: 900px
- Full padding: 80px top/bottom
- Font size: 1.0625rem (questions)

### Tablet (768px):
- Reduced padding: 60px top/bottom
- Font size: 1rem (questions)

### Mobile (<480px):
- Compact padding: 14px 16px
- Font size: 0.9375rem (questions)
- Smaller icons: 18px

## 🔧 Integration

### Updated: **CityCoworking.jsx**
- Added import for `FAQ` component
- Integrated after `TopLocations` section
- Passes `category="coworking"` prop

### Usage Example:
```javascript
// Coworking page
<FAQ category="coworking" />

// Coliving page
<FAQ category="coliving" />

// Virtual Office page
<FAQ category="virtualoffice" />
```

## 📍 Page Structure (Complete)

1. Hero Section
2. Coworking Spaces Grid
3. Office Solutions
4. Popular Coworking Spaces
5. Discover Workspace
6. Featured Spaces
7. Customized Solutions
8. Premium Spaces
9. Top Locations
10. **FAQ** ← ✨ **NEW DYNAMIC SECTION** ✨
11. Enquiry Modal

## 🎨 Visual Specifications

### Colors:
- **Background**: White
- **Question Background**: Transparent → Light gray (hover)
- **Active Background**: Light blue (#f0f7ff)
- **Border**: Light gray (#e5e7eb) → Blue (#0d6efd) on hover/active
- **Text**: Dark gray (#1a1a1a)
- **Answer Text**: Medium gray (#555)
- **Icon**: Blue (#0d6efd)

### Spacing:
- **Section Padding**: 80px top/bottom
- **Question Padding**: 20px 24px
- **Answer Padding**: 0 24px 20px 24px
- **Gap Between Items**: 16px
- **Border Radius**: 12px

### Typography:
- **Section Title**: 2.25rem, bold
- **Subtitle**: 1.0625rem, regular
- **Question**: 1.0625rem, semi-bold
- **Answer**: 0.9375rem, regular

## ✨ Accessibility Features

1. **Keyboard Navigation**: Full keyboard support
2. **ARIA Attributes**: `aria-expanded` on buttons
3. **Focus States**: Clear outline on focus
4. **Semantic HTML**: Proper button elements
5. **Screen Reader Friendly**: Descriptive labels

## 🚀 Dynamic Features

### Easy to Update:
To add/edit FAQs, simply update `faqData.json`:
```json
{
    "coworking": [
        {
            "id": 11,
            "question": "New question?",
            "answer": "New answer..."
        }
    ]
}
```

### Category-Based:
- Automatically loads correct FAQs based on category
- No code changes needed for different pages
- Centralized data management

## 🎯 Benefits

1. **Dynamic**: Loads from JSON file
2. **Reusable**: Works for all service types
3. **Maintainable**: Easy to update content
4. **Scalable**: Add unlimited FAQs
5. **SEO-Friendly**: Proper semantic HTML
6. **Accessible**: WCAG compliant
7. **Responsive**: Works on all devices
8. **Interactive**: Smooth user experience

---

**A professional, dynamic FAQ section with accordion functionality!** 🎉
