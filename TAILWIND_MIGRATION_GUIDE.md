Custom Tailwind Theme

### Colors Available
```html
<!--  signature gold color -->
<div class="tw-bg-gold-600 tw-text-white">Gold Background</div>
<div class="tw-text-gold-700">Gold Text</div>

<!-- dark colors -->
<div class="tw-bg-luxury-900 tw-text-white">Dark Background</div>
<div class="tw-text-luxury-800">Dark Text</div>
```

### Typography
```html
<!-- fonts -->
<h1 class="tw-font-serif tw-text-hero">Cormorant Garamond</h1>
<p class="tw-font-sans tw-text-base">Montserrat</p>

<!-- Pre-built text styles -->
<h2 class="tw-text-luxury-title">Luxury Title</h2>
<p class="tw-text-luxury-body">Luxury Body Text</p>
```

### Pre-Built Luxury Components
```html
<!-- Luxury button matching  theme -->
<button class="tw-btn-luxury">Get Started</button>

<!-- Luxury card -->
<div class="tw-card-luxury">
  <h3 class="tw-text-luxury-title">Card Title</h3>
  <p class="tw-text-luxury-body">Card content</p>
</div>
```

## heres a guide for idiots who can't use tailwind css

### Step 1: Test with Utility Classes
Start by adding Tailwind utilities to NEW elements:

```html
<!-- Example: Add margin and padding -->
<div class="tw-mt-8 tw-px-6">
  <!-- Your existing content -->
</div>

<!-- Example: Responsive design -->
<div class="tw-hidden tw-md:block tw-lg:flex">
  <!-- Content that shows/hides responsively -->
</div>
```

### Step 2: Use Custom Luxury Components
Replace common patterns with pre-built components:

```html
<!-- Instead of custom button CSS, use luxury component -->
<button class="tw-btn-luxury">
  <i class="fas fa-arrow-right tw-ml-2"></i>
  Learn More
</button>
```

### Step 3: Gradually Replace Utility Styles
For spacing, colors, and layout, gradually replace:

```html
<!-- Old way -->
<div style="margin-top: 2rem; padding: 1rem; background: #c4ae7b;">

<!-- New way -->
<div class="tw-mt-8 tw-p-4 tw-bg-gold-600">
```
