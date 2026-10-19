দক্ষতা (Dokkhota) – AI Agent Build Guide
Prepared for Md Shimul Hossen · React + Tailwind frontend first, MERN backend next
1. How to use this guide
Paste the Master Command (section 2) into your AI coding agent (Claude Code, Cursor, etc.) inside an empty folder. Keep this document attached or open. The agent must follow the phases in section 7 in order, use the data in section 8 and the rules in section 9, and tick every item in section 11 before it says the work is done.
Global build rules (they override anything below that says otherwise)
1. Tailwind CSS only. All styling is Tailwind utility classes. The only CSS file is src/index.css (Tailwind directives plus the color variables from section 4). No CSS modules and no style objects, except for a value that must be dynamic, such as an item's panel color.
2. Icons come from lucide-react only. Examples: Search, ShoppingCart, ChevronDown, ChevronLeft, ChevronRight, Star, Check, CheckCircle2, Eye, EyeOff, Minus, Plus, Trash2, TrendingUp (logo), Award, Users, ShieldCheck, Clock, Facebook, Youtube, Linkedin. Never draw an icon by hand.
3. Demo images first. Every item card, hero slide and detail page uses a demo photo, not a hand-drawn SVG illustration. All images go through one helper, getImage(seed, w, h) in src/utils/image.js, which returns https://picsum.photos/seed/<seed>/<w>/<h>. Use the item slug as the seed. Always set width and height, loading='lazy' (except the first hero slide), a Bangla alt, and the item color as the background while loading. When real images arrive, only this helper changes.
4. Mobile-first. Write the base classes for a 360px phone, then enlarge with sm: (640), md: (768), lg: (1024) and xl: (1280). Build and check every page at 360px first. Where this guide names 860px, 980px or 520px, use md: and lg: instead. Touch targets are at least 44px high, sliders swipe, and the page never scrolls sideways.
5. Reusability. Build a component once in components/, then use it everywhere. Required shared components: Button, Field, Select, Badge, Rating, PriceTag, QtyStepper, SectionHeading, Logo, one generic Slider (hero, services row, every category row) and one ItemCard (featured grid, category rows, search results). Pages only compose components and never define their own card or button markup. If markup repeats twice, extract it. Keep components under about 150 lines and give props sensible defaults.
6. Folders. components, pages, layout, api and redux, plus data, hooks, utils and context (section 5). src/api and src/redux are created empty, with a .gitkeep file only. Write no code in them; the owner will fill them later. Components never import from them. Read demo data through functions in src/data/index.js (getItems, getItemBySlug), so switching to an API later changes one place. Until Redux exists, the cart lives in a small context/CartContext.jsx.
7. Where the guide says 'art', 'SVG' or 'illustration', use the demo image for that item instead (section 8, Images).
2. Master Command (copy and paste)
You are a senior React engineer. Build the frontend of 'Dokkhota' (দক্ষতা), a Bangla-language marketplace that sells two things: online courses and electronics / computer accessories. The look and feel is a course-platform style similar to brightskill.com, but with our own brand, colors and wording. Do NOT copy brightskill.com assets, logos, images or text.

Rules:
1. Stack: Vite + React 18 (JavaScript), Tailwind CSS (utility classes only), lucide-react for ALL icons, react-router-dom. Also install @reduxjs/toolkit and react-redux, but do not use them yet. No backend yet; all data is demo data in src/data/*.js.
2. Mobile-first: write base classes for a 360px phone, then enlarge with sm:, md:, lg:, xl:. The site must be comfortable on a phone: touch targets at least 44px, swipeable sliders, no sideways page scroll.
3. Use demo images (not hand-drawn SVG illustrations) for the hero, cards and detail pages, through ONE helper: getImage(seed, w, h) in src/utils/image.js. Real images will replace it later.
4. Reusability: build each component once in src/components, then reuse it everywhere. Pages only compose components. If markup repeats twice, extract it. One generic Slider component serves the hero, the services row and every category row; one ItemCard serves the featured grid, the category rows and the search results.
5. Folder structure: src/components, src/pages, src/layout, src/api, src/redux (plus src/data, src/hooks, src/utils, src/context). Create src/api and src/redux as EMPTY folders (a .gitkeep file only). Do not write any code in them; the owner will fill them later.
6. All visible UI text is Bangla (font: Hind Siliguri). Code, file names and comments are English.
7. Follow the design tokens, components, routes and behavior in the attached guide exactly. Work phase by phase (Phase 0 to Phase 13). After each phase: run `npm run build`, fix errors, then commit with the message 'phase N: <name>'.
8. Support light and dark mode (prefers-color-scheme), keyboard access and prefers-reduced-motion.
9. Do not add features that are not in the guide. If something is ambiguous, pick the simplest option, write it in NOTES.md and continue.
10. At the end, print: what was built, how to run it, and every assumption you made.
3. Product overview
• Name: দক্ষতা (Dokkhota). Logo: a 34px rounded square in brand green with a yellow rising-arrow icon, followed by the word দক্ষতা (22px, bold).
• Sells: (1) online courses, (2) electronics and computer accessories.
• Main categories: ল্যাপটপ, কম্পিউটার এক্সেসরিজ, ওয়েব ডেভেলপমেন্ট, গ্রাফিক ডিজাইন, ডিজিটাল মার্কেটিং.
• Language: Bangla UI. Search must also work in English.
• Data: demo data only in this phase. Payments, login and orders are simulated.
• Visitor flow: home → search or browse → product or course details → add to cart / buy now / enroll → checkout → success.
4. Design tokens
Define the colors as CSS variables in src/index.css under :root, with the dark values under @media (prefers-color-scheme: dark). Store them as space-separated RGB channels (for example --brand: 15 94 77) and expose them in tailwind.config.js under theme.extend.colors as rgb(var(--brand) / <alpha-value>), so utilities such as bg-brand/10 work. Names: bg, surface, ink, muted, line, brand, brand-ink, hover, plus accent: '#f2b632'. Set darkMode: 'media', fontFamily.sans to Hind Siliguri and maxWidth.site to 1200px. Components use classes such as bg-surface text-ink border-line and never raw hex values.
Token
Light
Dark
--bg
#f4f7f5
#0f1714
--surface
#ffffff
#16211d
--ink
#1b2430
#e8efec
--muted
#5f6b76
#9aa8a2
--line
#dbe3df
#2a3a34
--brand
#0f5e4d
#3fb596
--brand-ink
#ffffff
#08201a
--hover
#e8f0ec
#1f2e28
• Accent (both modes): #f2b632 (yellow). Used for primary CTA on colored panels, badges, star icons, cart count.
• Hero and card panel colors: #0f5e4d (green), #1e3a8a (blue), #6b2d5c (plum), #9a4a0c (rust). Text on them is always white.
• Footer background: #0f1f1a. Error color: #d64545.
• Font: Hind Siliguri (400, 500, 600, 700) from Google Fonts, fallback system-ui, sans-serif.
• Radius: buttons and inputs 10px, cards 16px, hero and big panels 20px, pills 99px.
• Layout: content max-width 1200px, side padding 20px. Header is sticky and respects safe-area insets.
• Shadows: card hover 0 10px 26px rgba(0,0,0,.12) with a 2px lift.
• Focus ring: 3px accent outline with 2px offset on all buttons.
5. Tech stack and folder structure
Stack: Vite and React 18, react-router-dom, Tailwind CSS 3 (with postcss and autoprefixer), lucide-react for every icon, and @reduxjs/toolkit with react-redux installed but not used yet.
dokkhota/
  index.html, tailwind.config.js, postcss.config.js, NOTES.md
  src/
    main.jsx, App.jsx
    index.css            (Tailwind directives + color variables only)
    layout/              MainLayout, Header, Footer, AuthLayout
    components/
      ui/                Button, Field, Select, Badge, Rating, PriceTag,
                         QtyStepper, SectionHeading
      common/            Logo, SearchBox, CategoryMenu, Slider, ItemCard
      home/              HeroSlider, ServicesSlider, FeaturedGrid, CategoryRow,
                         WhySection, StatsStrip, Reviews
    pages/               Home, Search, Login, Register, ProductDetail,
                         CourseDetail, Enroll, Checkout, OrderSuccess
    data/                index.js (getItems, getItemBySlug), items.js,
                         categories.js, slides.js, reviews.js, services.js
    hooks/               useSlider, useClickOutside
    utils/               format.js, search.js, validate.js, image.js
    context/             CartContext.jsx (temporary, until Redux)
    api/                 EMPTY for now (.gitkeep only)
    redux/               EMPTY for now (.gitkeep only)
6. Routes
• / Home
• /search?q=... Search results with category sidebar
• /login and /register (one page with two tabs, URL decides the active tab)
• /products/:slug Product details
• /courses/:slug Course details
• /enroll/:slug Student details form
• /checkout Checkout (cart or single item or course)
• /order-success Success page
Clicking the logo, anywhere, goes to / and clears the search box.
7. Build phases
Work in this exact order. Each phase ends with a build check and a commit.
Phase 0 – Setup
• Create the Vite React app and install tailwindcss postcss autoprefixer lucide-react react-router-dom @reduxjs/toolkit react-redux. Configure Tailwind (content paths, darkMode: 'media', the tokens from section 4).
• Add the Hind Siliguri Google Font link and lang='bn' to index.html, and set it as fontFamily.sans.
• Create every folder from section 5. src/api and src/redux get a .gitkeep file only; write nothing else in them.
• Add src/utils/image.js with getImage(seed, w, h) returning https://picsum.photos/seed/<seed>/<w>/<h>.
• Done when: npm run dev shows an empty page with the right font and background, bg-brand and text-ink work, and switching the OS theme switches the colors.
Phase 1 – Layout shell and shared styles
• layout/MainLayout.jsx: Header, an <Outlet /> inside a max-w-site mx-auto px-4 sm:px-5 container, and the Footer (a stub for now). Add AuthLayout only if the login page needs it.
• Build the shared UI once in components/ui/: Button (variants primary, accent, outline, link; heights 46px and 48px), Field (label, input, error with role='alert'; a password type with an Eye / EyeOff icon button), Select, Badge (product, course, best seller), Rating (Star icon, number, review count), PriceTag (price, struck-through old price, discount pill), QtyStepper (Minus and Plus icons) and SectionHeading (centered or left, with an optional right-hand link).
• Build one generic components/common/Slider.jsx: a horizontal scroll-snap row with ChevronLeft and ChevronRight buttons (hidden on touch widths), optional autoplay (interval, pauses on hover, focus and touch), loop at the end, and swipe support.
• Done when: a temporary /ui-kit route shows every variant at 360px and 1280px, in light and dark mode. Remove that route in Phase 13.
Phase 2 – Navbar
• Three-column grid: logo (left), center group, right group. Gap 20px, white surface, bottom border.
• Center: a category dropdown button (42px high, bordered, chevron) and a search box next to it. The dropdown lists the categories with a count (e.g. ১২টি কোর্স, ৪০টি পণ্য), closes on outside click and Esc, and marks the active one. Categories: সব ক্যাটাগরি + the five main categories from section 3.
• Search box: max-width 460px, magnifier icon, placeholder 'কোর্স খুঁজুন', yellow 'খুঁজুন' button inside. Submit goes to /search?q=....
• Right: cart icon button with a yellow count badge (hidden at 0), then the brand-colored 'লগইন' button.
• Mobile (below md): logo and right group stay on row one; the center group wraps to row two at full width.
• Done when: all of the above works with keyboard only.
Phase 3 – Hero slider
• A 20px-rounded panel inside the container with 4 stacked slides that crossfade in 0.5s. Autoplay every 5.5s; pause on hover and focus; no autoplay when prefers-reduced-motion is set.
• Slide layout: two columns (1.1fr / 0.9fr), padding 48px 56px 84px. Left: pill badge (white at 16% opacity), h2 clamp(28px, 4.2vw, 46px) bold, paragraph 18px (max 46ch), then two buttons: yellow primary and white outline. Right: a demo image (rounded, object-cover). On mobile the illustration goes on top and shrinks to 150px high.
• Controls (bottom): dots on the left (active dot stretches to 30px and turns yellow), round prev/next arrow buttons on the right, with Bangla aria-labels.
• Slides:
    1. Green #0f5e4d, badge অনলাইন কোর্স, 'ঘরে বসেই শিখুন ওয়েব ডেভেলপমেন্ট', buttons 'কোর্স দেখুন' / 'ফ্রি ক্লাস দেখুন', art: monitor with play button.
    2. Blue #1e3a8a, badge ইলেকট্রনিক্স, 'নতুন ল্যাপটপ ও গ্যাজেটে ২০% পর্যন্ত ছাড়', buttons 'পণ্য কিনুন' / 'অফার দেখুন', art: laptop.
    3. Plum #6b2d5c, badge কম্পিউটার এক্সেসরিজ, 'কিবোর্ড, মাউস ও হেডফোন এক জায়গায়', buttons 'এক্সেসরিজ দেখুন' / 'সেরা বিক্রিত', art: keyboard, mouse, headphone.
    4. Rust #9a4a0c, badge কোর্স + পণ্য, 'কোর্সে ভর্তি হলে এক্সেসরিজে বাড়তি ছাড়', buttons 'কম্বো অফার' / 'বিস্তারিত জানুন', art: monitor with check mark and mouse.
• Done when: slides rotate, dots and arrows work, and hover pauses autoplay.
Phase 4 – Marketing section (headline, services slider, featured grid)
• Centered headline: 'জব-মার্কেটে নিজেকে চাহিদাসম্পন্ন করে তুলুন- এখনই!' (h2, clamp(26px, 3.4vw, 38px)).
• Centered subheading (muted, 18px, max 62ch): 'প্রতিযোগিতামূলক এই জব-মার্কেটে নিজের ক্যারিয়ারকে নিয়ে যান অনন্য উচ্চতায়। আপনার জন্য প্রয়োজনীয় সব ক্যাটাগরিই রয়েছে এখানে, কোর্স থেকে শুরু করে ল্যাপটপ, কিবোর্ড, মাউস ও হেডফোনসহ কম্পিউটার এক্সেসরিজ। বেছে নিন আপনার সবচেয়ে পছন্দেরটি।'
• Services slider (single row): 8 cards, each exactly 300px by 300px, 16px gap, scroll-snap. Top 176px is a colored panel with an SVG, below it the service name (19px, semibold) and a count line. Services: ওয়েব ডেভেলপমেন্ট, গ্রাফিক ডিজাইন, ডিজিটাল মার্কেটিং, ফ্রিল্যান্সিং (courses) and ল্যাপটপ, কিবোর্ড ও মাউস, হেডফোন ও স্পিকার, কম্পিউটার এক্সেসরিজ (products). Autoplay every 3s by one card, loop back at the end. Manual: left/right round buttons, trackpad scroll, touch swipe. Pause on hover, focus and touch (resume 4s after touch ends). Arrows hidden on mobile.
• Featured grid: 4 columns, 16px gap. One big card on the left spans 2 columns and 2 rows (best seller of the month), the other 4 cards are normal. Big card has a yellow 'সেরা বিক্রিত' badge, a large illustration, description, '৩২০+ জন কিনেছেন' in brand color, bigger price and a bigger button. On 860px and below: 2 columns, big card full width.
• Done when: the grid and slider match the sizes above and the slider loops.
Phase 5 – Category rows
• Five sections: ল্যাপটপ, কম্পিউটার এক্সেসরিজ, ওয়েব ডেভেলপমেন্ট, গ্রাফিক ডিজাইন, ডিজিটাল মার্কেটিং.
• Each has a header (h3 24px bold on the left, 'সব দেখুন' brand link on the right) and a single-row slider of 5 cards, each 260px wide, scroll-snap, round arrow buttons on the sides, swipe on touch. No autoplay on these rows.
• Item card (reused everywhere): colored panel with SVG; a type pill ('পণ্য' yellow tint or 'কোর্স' green tint); name (17px, semibold); '★ 4.8 (১,২০০ রিভিউ)'; price in bold with the old price struck through; a brand button ('কিনুন' for products, 'ভর্তি হোন' for courses). The whole card is clickable and opens the details page. Hover lifts the card.
• Done when: every row scrolls by one card per arrow click and clicking a card opens its details route.
Phase 6 – Why Dokkhota, stats and reviews
• 'কেন দক্ষতাই সবার চেয়ে এগিয়ে?' centered headline plus a short subheading. Four cards (icon in a green-tint square, title, text): হাতে-কলমে প্রজেক্ট, অভিজ্ঞ মেন্টর, সার্টিফিকেট ও জব সাপোর্ট, লাইফটাইম অ্যাক্সেস. 4 columns, 2 below 980px, 1 below 520px.
• Stats strip: brand-colored rounded bar with three numbers: ৫,০০০+ সফল শিক্ষার্থী, ৪.৮ গড় রেটিং, ৫০+ প্রজেক্টভিত্তিক কোর্স.
• 'আমাদের শিক্ষার্থীরা কী বলছেন' with 3 review cards: five yellow stars, quote, avatar circle with the first letter of the name, name and course. Demo students: রাকিব হাসান (ওয়েব ডেভেলপমেন্ট), সুমাইয়া আক্তার (গ্রাফিক ডিজাইন), তানভীর আহমেদ (ডিজিটাল মার্কেটিং). Use figure, q, figcaption.
• Done when: responsive columns work and the stars have an aria-label.
Phase 7 – Footer
• Dark (#0f1f1a) footer with 5 columns: logo plus one-line description, কোর্স links, পণ্য links, সাপোর্ট links (আমাদের সম্পর্কে, প্রশ্নোত্তর, রিফান্ড নীতি, গোপনীয়তা নীতি), যোগাযোগ (demo email, demo phone, social names).
• Bottom bar: '© ২০২৬ দক্ষতা। সর্বস্বত্ব সংরক্ষিত।'. 5 columns, then 2 below 980px, then 1 below 520px. Links are muted and turn yellow on hover.
• Done when: the footer sits at the bottom even on short pages.
Phase 8 – Search results page
• Layout: sticky left sidebar (260px) and a results area. Below 860px the sidebar stacks above the results and stops being sticky.
• Sidebar 'ক্যাটাগরি': one checkbox per main category with the number of matches next to it, and a 'সব বাদ দিন' / 'সব নির্বাচন' toggle at the top. Checking or unchecking updates the results instantly.
• Results: heading '“{query}” এর জন্য N টি ফলাফল' (or 'সব পণ্য ও কোর্স (N টি)' for an empty query), a 'হোমে ফিরে যান' button, then an auto-fill grid of item cards (min 230px). Empty state: dashed box with 'কিছু পাওয়া যায়নি' and a tip.
• Initial checked categories: all of them, unless the navbar dropdown has one category selected, then only that one.
• Search logic: see section 9.
• Done when: searching 'laptop', 'ল্যাপটপ', 'gaming mouse' and an empty query all behave correctly.
Phase 9 – Login and registration
• One card (max 1000px) with two columns. Left: green panel with 'দক্ষতায় আপনার নতুন যাত্রা শুরু করুন' and three check-mark benefits (hidden below 860px). Right: tabs 'লগইন' / 'রেজিস্ট্রেশন', heading, form.
• Registration fields, in order: পুরো নাম, ইমেইল, ফোন নম্বর, পাসওয়ার্ড, পাসওয়ার্ড আবার লিখুন.
• Login fields: ইমেইল বা ফোন নম্বর, পাসওয়ার্ড, 'আমাকে মনে রাখুন' checkbox, 'পাসওয়ার্ড ভুলে গেছেন?' link.
• Validation on submit, Bangla error under each field: name required; email format; Bangladeshi mobile number; password at least 8 characters; retype must match. Bangla digits are accepted in the phone field.
• On success show a green status box: 'অ্যাকাউন্ট তৈরি হয়েছে (ডেমো)' or 'লগইন সফল হয়েছে (ডেমো)'. Below the form: switch link between login and register, and a 'হোমে ফিরে যান' link.
• Done when: every error message appears and clears correctly.
Phase 10 – Product details
• Breadcrumb 'হোম / পণ্য / name'. Two columns: big colored SVG panel (min-height 380px) and the info column.
• Info column: type pill, h1, '★ rating (reviews) · স্টকে আছে', price row (32px brand price, struck-through old price, yellow '২০% ছাড়' pill calculated from the prices), 4 check-mark points (আসল পণ্য, ১ বছরের ওয়ারেন্টি, ৭ দিনের মধ্যে রিফান্ড বা এক্সচেঞ্জ, সারা দেশে ক্যাশ অন ডেলিভারি), quantity stepper (− and +, min 1).
• Buttons: 'কার্টে যোগ করুন' (outline) adds to the cart and shows a green status line; 'এখনই কিনুন' (yellow) goes straight to checkout with only this item.
• Done when: the cart badge in the navbar updates and merges repeated items.
Phase 11 – Course details and enrollment
• Course page: hero panel in the course color with badge, h1, short text, rating line and SVG. Below: 'কোর্সে যা শিখবেন' (two-column check list), 'কোর্স কারিকুলাম' (4 collapsible modules using details/summary, first one open), 'ইন্সট্রাক্টর' box. Right: a sticky card with price, old price, discount pill, a yellow 'এনরোল করুন' button, and the course perks (৪৮ ঘণ্টার রেকর্ডেড ভিডিও, সাপ্তাহিক লাইভ সাপোর্ট ক্লাস, সার্টিফিকেট, লাইফটাইম অ্যাক্সেস, ৭ দিনের মানি-ব্যাক গ্যারান্টি). Below 860px the card is no longer sticky.
• Enroll page (student details): fields পুরো নাম, ফোন নম্বর, ইমেইল, শিক্ষাগত যোগ্যতা (এসএসসি, এইচএসসি, ডিপ্লোমা, স্নাতক, স্নাতকোত্তর, অন্যান্য), পছন্দের ব্যাচ (নভেম্বর ব্যাচ, ডিসেম্বর ব্যাচ, উইকেন্ড ব্যাচ). All required. Submit button 'চেকআউটে যান'. Right side shows the course summary.
• Done when: a valid form moves to checkout and keeps the student data when the user comes back to edit.
Phase 12 – Cart, checkout and success
• Cart: a context with lines of {item, qty}. The navbar cart icon opens checkout with the whole cart. An empty cart shows 'আপনার কার্ট খালি' and a 'কেনাকাটা শুরু করুন' button.
• Checkout layout: left form, right sticky order summary (below 860px they stack).
• Product checkout: delivery card (পুরো নাম, মোবাইল নম্বর, জেলা select, পূর্ণ ঠিকানা, ঐচ্ছিক নোট), payment card, summary with quantity steppers and 'সরান' per line.
• Course checkout: a read-only student details card with a 'তথ্য পরিবর্তন করুন' link instead of the delivery card. Cash on delivery is not offered for courses.
• Payment options: ক্যাশ অন ডেলিভারি, বিকাশ, নগদ, ডেবিট / ক্রেডিট কার্ড (radio rows; the selected row gets a brand border and tint).
• Summary: lines, coupon field with 'প্রয়োগ' button, সাবটোটাল, কুপন ছাড়, ডেলিভারি চার্জ, সর্বমোট, and a yellow confirm button ('অর্ডার নিশ্চিত করুন' / 'এনরোলমেন্ট নিশ্চিত করুন'). The button sits in the summary but submits the left form.
• Success page: check-circle icon, 'অর্ডার সফল হয়েছে!' or 'এনরোলমেন্ট সম্পন্ন!', a short message, the order number (DK- plus 6 random digits) with the total, and a 'হোমে ফিরে যান' button. Ordering from the cart empties the cart.
• Done when: both a product order and a course enrollment can be completed end to end.
Phase 13 – QA and polish
• Run the checklist in section 11 on a 360px phone width, a 768px tablet width and a 1280px desktop width, in light and dark mode.
• Run npm run build with zero warnings. Fix any console errors. Write NOTES.md.
8. Data shapes and demo data
Item shape: { id, slug, type: 'product' | 'course', category, nameBn, nameEn, price, oldPrice, rating, reviews, art: 'laptop' | 'gear' | 'course' | 'combo', color }. Keep prices as numbers and format them with Bangla digits and the ৳ sign (for example ৳৬৫,০০০). Use the English name for English search.
Featured big card: প্রো গেমিং ল্যাপটপ (Pro gaming laptop), 65000 / 72000, 4.8, 1200 reviews, art laptop, color #1e3a8a.
ল্যাপটপ (art laptop, color #1e3a8a):
• এইচপি ১৫ ইঞ্চি ল্যাপটপ (HP 15 inch laptop) – 48500 / 52000 – 4.6 – 310
• ডেল ইন্সপিরন কোর আই৫ (Dell Inspiron Core i5) – 62000 / 70000 – 4.7 – 280
• লেনোভো আইডিয়াপ্যাড স্লিম (Lenovo IdeaPad Slim) – 54500 / 57000 – 4.5 – 210
• আসুস ভিভোবুক ১৪ (Asus Vivobook 14) – 51000 / 54000 – 4.6 – 190
• এসার অ্যাসপায়ার ৫ (Acer Aspire 5) – 45900 / 49000 – 4.4 – 140
কম্পিউটার এক্সেসরিজ (art gear, color #6b2d5c):
• ওয়্যারলেস কিবোর্ড ও মাউস কম্বো (Wireless keyboard and mouse combo) – 1850 / 2200 – 4.6 – 620
• গেমিং মাউস (Gaming mouse) – 1200 / 1800 – 4.5 – 450
• ব্লুটুথ হেডফোন (Bluetooth headphone) – 2450 / 3000 – 4.5 – 440
• ২৭ ইঞ্চি এলইডি মনিটর (27 inch LED monitor) – 18500 / 22000 – 4.6 – 230
• ওয়েবক্যাম ও ইউএসবি হাব (Webcam and USB hub) – 1650 / 2000 – 4.4 – 180
• নয়েজ ক্যান্সেলিং হেডফোন (Noise cancelling headphone) – 3450 / 4200 – 4.5 – 440 (used in the featured grid)
ওয়েব ডেভেলপমেন্ট (art course, color #0f5e4d):
• ওয়েব ডেভেলপমেন্ট বুটক্যাম্প (Web development bootcamp) – 4900 / 6500 – 4.9 – 850
• রিঅ্যাক্ট জেএস মাস্টারক্লাস (React JS masterclass) – 3500 / 4500 – 4.8 – 400
• নোড জেএস ও এক্সপ্রেস (Node JS and Express) – 3200 / 4000 – 4.7 – 320
• এইচটিএমএল সিএসএস ফান্ডামেন্টালস (HTML CSS fundamentals) – 1500 / 2000 – 4.6 – 600
• মার্ন স্ট্যাক প্রজেক্ট কোর্স (MERN stack project course) – 5500 / 7000 – 4.8 – 280
গ্রাফিক ডিজাইন (art course, color #9a4a0c):
• গ্রাফিক ডিজাইন মাস্টারক্লাস (Graphic design masterclass) – 3200 / 4000 – 4.7 – 510
• ফটোশপ থেকে প্রফেশনাল (Photoshop professional) – 2800 / 3500 – 4.6 – 420
• ইলাস্ট্রেটর মাস্টারক্লাস (Illustrator masterclass) – 2500 / 3000 – 4.6 – 380
• লোগো ও ব্র্যান্ড ডিজাইন (Logo and brand design) – 2200 / 2800 – 4.8 – 250
• ফিগমা ইউআই/ইউএক্স কোর্স (Figma UI/UX course) – 3500 / 4500 – 4.8 – 180
ডিজিটাল মার্কেটিং (art combo, color #1e3a8a):
• ফেসবুক মার্কেটিং মাস্টারক্লাস (Facebook marketing masterclass) – 2800 / 3500 – 4.6 – 400
• এসইও ফান্ডামেন্টালস (SEO fundamentals) – 2000 / 2500 – 4.7 – 320
• গুগল অ্যাডস কোর্স (Google Ads course) – 2500 / 3000 – 4.6 – 260
• কনটেন্ট মার্কেটিং (Content marketing) – 1800 / 2200 – 4.5 – 190
• ইমেইল মার্কেটিং (Email marketing) – 1500 / 1900 – 4.4 – 120
Images: use getImage(slug, w, h) for every item, hero slide and detail page (card 600x450, hero 800x600, detail 900x700). Each item keeps an image seed (default: its slug) and a color, used as the loading background and the card tint. Replace the old art field with image. Wherever this guide mentions an art illustration or an SVG panel, show the demo image instead, with loading='lazy', width, height and a Bangla alt.
9. Behavior and business rules
• Search matching: build a haystack for each item from the Bangla name, category, type word, English name and English category keywords (for example 'laptop laptops computer electronics', 'computer accessories keyboard mouse headphone monitor webcam', 'web development programming coding', 'graphic design designer', 'digital marketing'). Add 'product products shop' for products and 'course courses class training' for courses. Normalize both the query and the haystack with Unicode NFC and lowercase. Split the query on spaces; an item matches when every word is found in the haystack. This makes 'gaming mouse' and 'mouse gaming' equivalent.
• Phone validation: an optional +88 or 88, then 01, then a digit from 3 to 9, then eight more digits. Spaces and dashes are ignored and Bangla digits are converted first.
• Email validation: something, an @, something, a dot, something. No spaces.
• Discount pill: round((1 - price / oldPrice) * 100) percent.
• Coupon: the demo code DAKKHOTA10 (case-insensitive) gives 10% off the subtotal. Any other code shows 'কুপন কোডটি সঠিক নয়'.
• Delivery charge (products only): ৳৬০ for ঢাকা, ৳১২০ for every other district, shown only after a district is chosen. Courses have no delivery charge.
• Total: subtotal − coupon discount + delivery charge.
• Cart: adding an item that is already in the cart increases its quantity. Courses never go into the cart; they use the enroll flow.
• Jelas for the select: ঢাকা, চট্টগ্রাম, রাজশাহী, খুলনা, সিলেট, বরিশাল, রংপুর, ময়মনসিংহ.
• Navigation: the logo always returns home and clears search, auth and checkout state. Search submit from any page goes to the results page.
• Everything is simulated: no real payment, login or order saving in the frontend phase.
10. Rules for the AI agent
1. Read first. Read this whole guide before writing code. Restate the plan in five lines, then start Phase 0.
2. One phase at a time. Finish, build and commit each phase before starting the next. Never skip ahead.
3. Small, reusable components. One component per file; shared styles in global.css; no copy-pasted card markup.
4. Match the numbers. Sizes, colors, text and spacing in this guide are requirements, not suggestions.
5. Accessibility is part of done: labels on every input, visible focus, aria-labels on icon buttons, role='alert' on errors, keyboard-operable sliders and dropdowns.
6. Do not invent. No extra pages, libraries or features. No external images. No copying from brightskill.com.
7. Ask only when blocked. Otherwise choose the simplest option and record it in NOTES.md.
8. Verify, do not assume. Run the build after each phase and open the page at 360px, 768px and 1280px widths before ticking the checklist.
9. Final report lists: what was built, how to run it, known gaps, assumptions.
11. Acceptance checklist
[ ] Logo (left), category dropdown and search box (center), cart and login (right) in the navbar; logo click goes home.
[ ] Hero slider with 4 slides, autoplay, pause on hover, dots, arrows.
[ ] Centered marketing headline and subheading with the accessories text.
[ ] Services slider: 300x300 cards, autoplay, loops, manual arrows and swipe.
[ ] Featured grid with one 2x2 big card and four normal cards.
[ ] Five category rows with manual sliders and 'সব দেখুন' links.
[ ] Why section, stats strip, three reviews, footer.
[ ] Search works in Bangla and English; sidebar checkboxes filter live with counts.
[ ] Login and registration with all fields and Bangla validation messages.
[ ] Product details with add to cart and buy now; course details with enroll now.
[ ] Enroll form then checkout then success; product cart then checkout then success.
[ ] Coupon, delivery charge and total calculate correctly.
[ ] Light and dark modes, 360 / 768 / 1280 widths, keyboard use, reduced motion.
[ ] npm run build passes with no warnings and NOTES.md exists.
[ ] Only Tailwind classes are used; src/index.css is the only CSS file.
[ ] Every icon comes from lucide-react.
[ ] Demo images load through getImage; no hand-drawn SVG illustration remains.
[ ] Every page is comfortable at 360px: no sideways scroll, 44px touch targets, swipeable sliders.
[ ] No duplicated card, button or slider markup; pages only compose components.
[ ] src/api and src/redux exist and contain only .gitkeep.
12. Next step: MERN backend command
Use this after the frontend is accepted.
You are a senior MERN engineer. Add a backend to the Dokkhota frontend in a /server folder: Node.js, Express, MongoDB with Mongoose, JWT auth (httpOnly cookie), Redis plus BullMQ for the order-confirmation email queue.

Models: User (name, email, phone, passwordHash, role), Item (type, category, nameBn, nameEn, slug, price, oldPrice, rating, reviews, art, color, description, stock), Order (user, lines, delivery, payment method, coupon, totals, status), Enrollment (user, course, student details, batch, payment status).

Endpoints: POST /api/auth/register, POST /api/auth/login, POST /api/auth/logout, GET /api/items (search q, categories, pagination), GET /api/items/:slug, POST /api/orders, POST /api/enrollments, POST /api/coupons/validate.

Rules: validate input with the same rules as the frontend (email, Bangladeshi phone, password minimum 8); compute prices, coupon discount and delivery charge on the server only; seed the database with the demo data from the guide; replace the frontend demo data with API calls using Axios; keep all UI text unchanged. Work in phases, build and test each one with Postman collections, and commit after each phase.