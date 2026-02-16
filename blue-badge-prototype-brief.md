# Prototype Brief: Apply for a Blue Badge

## Service context
- Design system: GOV.UK Design System
- Frontend library: govuk-frontend v6.0.0 via CDN (jsdelivr)
- Output: Multiple HTML files — one per page — plus a shared `state.js`
- No build tools, no npm, no frameworks
- Navigation between pages uses standard `href` links and `window.location.href`
- State shared across pages via `sessionStorage` (see state.js)
- Mobile responsive

## File structure

```
index.html              — Page 1: Start
eligibility.html        — Page 2: Who are you applying for?
personal-details.html   — Page 3: Your / Their personal details
check-answers.html      — Page 4: Check your answers
confirmation.html       — Page 5: Application submitted
state.js                — Shared state management
```

---

## Pages to build

---

### Page 1 — Start page
**File:** `index.html`

**Browser title:** Apply for a Blue Badge – GOV.UK

**Phase banner:** ALPHA — with feedback link (href="#")

**Breadcrumbs:**
- Home
- Disabled people
- Blue Badge scheme

**H1:** Apply for a Blue Badge

**Body copy:**
A Blue Badge helps you park closer to your destination if you have a disability or health condition.

You can apply for yourself, or on behalf of someone else.

**Subheading (govuk-heading-m):** Before you start

**Body copy:**
Applying takes around 45 minutes. You can save your progress and return later.

**What you'll need (govuk-list--bullet):**
- proof of identity (passport or driving licence)
- proof of address (utility bill or bank statement dated within the last 3 months)
- a recent photograph of the person the badge is for
- your National Insurance number (if you have one)

**Inset text:**
If you're applying on behalf of an organisation, such as a care home, use a different service.

**CTA:** Start now button (govuk-button--start with arrow icon) → goes to Page 2

**Footer:** Standard GOV.UK footer (Open Government Licence, Crown copyright)

---

### Page 2 — Who are you applying for?
**File:** `eligibility.html`

**Browser title:** Who are you applying for? – Apply for a Blue Badge – GOV.UK

**Phase banner:** ALPHA

**Back link:** → goes to Page 1 (start)

**H1:** Who are you applying for?

**Form component:** Radio buttons (govuk-radios)

**Options:**
- `myself` — Myself
- `someone-else` — Someone else

**Hint text (under H1):** Select one option.

**CTA:** Continue button → goes to Page 3

**Validation:** If no option is selected and Continue is clicked:
- Error summary at top of page: "There is a problem" with link "Select who you are applying for"
- Inline error on the radio group: "Select who you are applying for"
- Page title prefixes with "Error: "

**Footer:** Standard GOV.UK footer

---

### Page 3 — Personal details
**File:** `personal-details.html`

**Browser title:**
- Myself: `Your personal details – Apply for a Blue Badge – GOV.UK`
- Someone else: `Their personal details – Apply for a Blue Badge – GOV.UK`

**Phase banner:** ALPHA

**Back link:** → goes to Page 2 (eligibility)

**H1:**
- Myself: `Your personal details`
- Someone else: `Their personal details`

**Body copy:** We need these details to process your application.

**Context rule:** All content on this page uses "your" when applying for Myself, and "their" when applying for Someone else. This applies to the H1, browser title, and all validation error messages. The body copy and field labels are neutral and do not change.

**Form fields:**

1. **First name**
   - Component: govuk-input
   - Label: First name
   - autocomplete: given-name
   - Width: govuk-input--width-20

2. **Last name**
   - Component: govuk-input
   - Label: Last name
   - autocomplete: family-name
   - Width: govuk-input--width-20

3. **Date of birth**
   - Component: govuk-date-input
   - Legend: Date of birth
   - Hint: For example, 27 3 1980
   - Three inputs: Day, Month, Year

4. **Email address**
   - Component: govuk-input
   - Label: Email address
   - Hint: We'll only use this to send you updates about your application
   - Type: email
   - autocomplete: email
   - Width: govuk-input--width-20

**CTA:** Continue button → goes to Page 4

**Validation:** If any required field is empty on Continue:
- Error summary: "There is a problem" listing each missing field
- Inline error on each empty text field uses the context-aware pronoun:
  - Myself: "Enter your first name" / "Enter your last name" / "Enter your email address"
  - Someone else: "Enter their first name" / "Enter their last name" / "Enter their email address"
- All three inline error messages are pre-swapped when the page loads via `prefillPersonalDetails()`, so the correct pronoun is always in place before any validation runs
- Page title prefixes with "Error: " and uses the context-aware heading (e.g. "Error: Their personal details – …")

**Date of birth validation** follows the GOV.UK date input error pattern — specific message depending on which fields are missing, with only the missing inputs highlighted in red. The "all missing" message also uses the context-aware pronoun:

| Missing fields | Myself | Someone else |
|----------------|--------|--------------|
| All three | Enter your date of birth | Enter their date of birth |
| Day + month | Date of birth must include a day and month | ← same |
| Day + year | Date of birth must include a day and year | ← same |
| Month + year | Date of birth must include a month and year | ← same |
| Day only | Date of birth must include a day | ← same |
| Month only | Date of birth must include a month | ← same |
| Year only | Date of birth must include a year | ← same |

The error summary link for DOB anchors to `#dob-day`. The error message is rendered inside the fieldset, between the hint and the date inputs. The `aria-describedby` on the fieldset references both `dob-hint` and `dob-error`.

**Footer:** Standard GOV.UK footer

---

### Page 4 — Check your answers
**File:** `check-answers.html`

**Browser title:** Check your answers – Apply for a Blue Badge – GOV.UK

**Phase banner:** ALPHA

**Back link:** → goes to Page 3 (personal-details)

**H1:** Check your answers before sending your application

**Component:** Summary list (govuk-summary-list) with change links

**Rows:**
| Key | Value | Action |
|-----|-------|--------|
| Applying for | [value from Page 2 radio — "Myself" or "Someone else"] | Change → Page 2 |
| First name | [value from Page 3] | Change → Page 3 |
| Last name | [value from Page 3] | Change → Page 3 |
| Date of birth | [value from Page 3] | Change → Page 3 |
| Email address | [value from Page 3] | Change → Page 3 |

**Subheading (govuk-heading-m):** Now send your application

**Body copy:** By submitting this application you confirm that the information you have provided is correct to the best of your knowledge.

**CTA:** Accept and send button (govuk-button) → goes to Page 5

**Footer:** Standard GOV.UK footer

---

### Page 5 — Confirmation
**File:** `confirmation.html`

**Browser title:** Application submitted – Apply for a Blue Badge – GOV.UK

**Phase banner:** ALPHA

**Component:** Panel (govuk-panel--confirmation)
- Title: Application submitted
- Body: Your reference number is **BBG-2024-48291**

**Body copy (after panel):**
We have sent a confirmation to the email address you provided.

**Subheading (govuk-heading-m):** What happens next

**Numbered list (govuk-list--number):**
1. We will review your application within 12 weeks.
2. We may contact you if we need more information.
3. If your application is successful, your Blue Badge will be sent by post.

**Body copy:**
You can [contact your local council](#) if you have not heard from us within 12 weeks.

**Footer:** Standard GOV.UK footer

---

## Behaviour and routing

| From page | Action | Goes to |
|-----------|--------|---------|
| Start | Click "Start now" | Eligibility |
| Eligibility | Click "Continue" (valid) | Personal details |
| Eligibility | Click "Continue" (no selection) | Stay on page, show errors |
| Eligibility | Click "Back" | Start |
| Personal details | Click "Continue" (valid) | Check answers |
| Personal details | Click "Continue" (missing fields) | Stay on page, show errors |
| Personal details | Click "Back" | Eligibility |
| Check answers | Click "Accept and send" | Confirmation |
| Check answers | Click any "Change" link | Relevant earlier page |
| Confirmation | No onward journey | — |

### Context switching
When the user selects "Someone else" on the Eligibility page, Page 3 switches all "your" references to "their":
- H1: "Their personal details"
- Browser title: "Their personal details – Apply for a Blue Badge – GOV.UK"
- Validation errors: "Enter their first name", "Enter their last name", "Enter their email address", "Enter their date of birth"

All other content (body copy, field labels, hint text) is written neutrally and does not change.

---

## State management

State is stored in `sessionStorage` under the key `blueBadgeFormData` and managed via `state.js`, which all pages load before their own scripts.

`state.js` exposes two functions:

```javascript
getState()        // Returns the current formData object (or defaults if empty)
saveState(updates) // Merges updates into the current state and writes to sessionStorage
```

The `formData` shape:

```javascript
{
  applyingFor: "",      // "Myself" or "Someone else"
  firstName:   "",
  lastName:    "",
  dobDay:      "",
  dobMonth:    "",
  dobYear:     "",
  email:       ""
}
```

Each page calls `getState()` on load to pre-fill fields and set context-sensitive content. Each page calls `saveState({ ... })` before navigating forward. The Check your answers page reads from state to populate the summary list.

---

## Design rules

- GOV.UK Design System components only — no custom UI patterns
- govuk-frontend **v6.0.0** via CDN: `https://cdn.jsdelivr.net/npm/govuk-frontend@6.0.0/dist/govuk/govuk-frontend.min.css`
- JS via CDN: `https://cdn.jsdelivr.net/npm/govuk-frontend@6.0.0/dist/govuk/govuk-frontend.min.js`
- Initialise with `initAll()` on load
- ALPHA phase banner on every page with "feedback" link (href="#")
- GOV.UK header: logo only, no service name or navigation (see Header spec below)
- Standard GOV.UK footer on every page
- Back link on every page except Start and Confirmation
- No actual form submission — all routing is client-side JavaScript
- All `<button>` elements must have `type="button"` explicitly set — without this, browsers default to `type="submit"` which can trigger a page reload and clear validation errors before they render
- All inline error message elements must use a consistent structure with an inner `<span id="[field-id]-error-text">` for dynamic text content. Without this, JS trying to set `.textContent` on a null element will throw a silent error that aborts the entire validation loop, preventing all subsequent errors (including DOB) from rendering. The required pattern is:
  ```html
  <p class="govuk-error-message" id="[field]-error" style="display:none;">
    <span class="govuk-visually-hidden">Error:</span>
    <span id="[field]-error-text">Default error message</span>
  </p>
  ```
  This applies to every field: first-name, last-name, email, and the DOB group.
- Error behaviour follows GOV.UK error message and error summary patterns exactly
- Page `<title>` must update on each page change
- Scroll to top on every page transition

---

## Header spec

Use the default GOV.UK header — logo only, no service name, no navigation links. Per the GOV.UK Design System, service names and navigation must use the separate Service navigation component; do not add them to the header.

Use the exact HTML from the GOV.UK Design System v6. Key points:
- Outer wrapper is `<div class="govuk-header">` (not `<header>`)
- Logo link uses class `govuk-header__homepage-link` (not `govuk-header__link--homepage`)
- The SVG logotype includes the updated `govuk-logo-dot` circle element and refreshed wordmark paths
- `data-module="govuk-header"` goes on the outer `<div>`

### Exact HTML

```html
<div class="govuk-header" data-module="govuk-header">
  <div class="govuk-header__container govuk-width-container">
    <div class="govuk-header__logo">
      <a href="/" class="govuk-header__homepage-link">
        <svg
          focusable="false"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 324 60"
          height="30"
          width="162"
          fill="currentcolor"
          class="govuk-header__logotype"
          aria-label="GOV.UK">
          <title>GOV.UK</title>
          <g>
            <circle cx="20" cy="17.6" r="3.7" />
            <circle cx="10.2" cy="23.5" r="3.7" />
            <circle cx="3.7" cy="33.2" r="3.7" />
            <circle cx="31.7" cy="30.6" r="3.7" />
            <circle cx="43.3" cy="17.6" r="3.7" />
            <circle cx="53.2" cy="23.5" r="3.7" />
            <circle cx="59.7" cy="33.2" r="3.7" />
            <circle cx="31.7" cy="30.6" r="3.7" />
            <path d="M33.1,9.8c.2-.1.3-.3.5-.5l4.6,2.4v-6.8l-4.6,1.5c-.1-.2-.3-.3-.5-.5l1.9-5.9h-6.7l1.9,5.9c-.2.1-.3.3-.5.5l-4.6-1.5v6.8l4.6-2.4c.1.2.3.3.5.5l-2.6,8c-.9,2.8,1.2,5.7,4.1,5.7h0c3,0,5.1-2.9,4.1-5.7l-2.6-8ZM37,37.9s-3.4,3.8-4.1,6.1c2.2,0,4.2-.5,6.4-2.8l-.7,8.5c-2-2.8-4.4-4.1-5.7-3.8.1,3.1.5,6.7,5.8,7.2,3.7.3,6.7-1.5,7-3.8.4-2.6-2-4.3-3.7-1.6-1.4-4.5,2.4-6.1,4.9-3.2-1.9-4.5-1.8-7.7,2.4-10.9,3,4,2.6,7.3-1.2,11.1,2.4-1.3,6.2,0,4,4.6-1.2-2.8-3.7-2.2-4.2.2-.3,1.7.7,3.7,3,4.2,1.9.3,4.7-.9,7-5.9-1.3,0-2.4.7-3.9,1.7l2.4-8c.6,2.3,1.4,3.7,2.2,4.5.6-1.6.5-2.8,0-5.3l5,1.8c-2.6,3.6-5.2,8.7-7.3,17.5-7.4-1.1-15.7-1.7-24.5-1.7h0c-8.8,0-17.1.6-24.5,1.7-2.1-8.9-4.7-13.9-7.3-17.5l5-1.8c-.5,2.5-.6,3.7,0,5.3.8-.8,1.6-2.3,2.2-4.5l2.4,8c-1.5-1-2.6-1.7-3.9-1.7,2.3,5,5.2,6.2,7,5.9,2.3-.4,3.3-2.4,3-4.2-.5-2.4-3-3.1-4.2-.2-2.2-4.6,1.6-6,4-4.6-3.7-3.7-4.2-7.1-1.2-11.1,4.2,3.2,4.3,6.4,2.4,10.9,2.5-2.8,6.3-1.3,4.9,3.2-1.8-2.7-4.1-1-3.7,1.6.3,2.3,3.3,4.1,7,3.8,5.4-.5,5.7-4.2,5.8-7.2-1.3-.2-3.7,1-5.7,3.8l-.7-8.5c2.2,2.3,4.2,2.7,6.4,2.8-.7-2.3-4.1-6.1-4.1-6.1h10.6,0Z" />
          </g>
          <circle class="govuk-logo-dot" cx="226" cy="36" r="7.3" />
          <path d="M93.94 41.25c.4 1.81 1.2 3.21 2.21 4.62 1 1.4 2.21 2.41 3.61 3.21s3.21 1.2 5.22 1.2 3.61-.4 4.82-1c1.4-.6 2.41-1.4 3.21-2.41.8-1 1.4-2.01 1.61-3.01s.4-2.01.4-3.01v.14h-10.86v-7.02h20.07v24.08h-8.03v-5.56c-.6.8-1.38 1.61-2.19 2.41-.8.8-1.81 1.2-2.81 1.81-1 .4-2.21.8-3.41 1.2s-2.41.4-3.81.4a18.56 18.56 0 0 1-14.65-6.63c-1.6-2.01-3.01-4.41-3.81-7.02s-1.4-5.62-1.4-8.83.4-6.02 1.4-8.83a20.45 20.45 0 0 1 19.46-13.65c3.21 0 4.01.2 5.82.8 1.81.4 3.61 1.2 5.02 2.01 1.61.8 2.81 2.01 4.01 3.21s2.21 2.61 2.81 4.21l-7.63 4.41c-.4-1-1-1.81-1.61-2.61-.6-.8-1.4-1.4-2.21-2.01-.8-.6-1.81-1-2.81-1.4-1-.4-2.21-.4-3.61-.4-2.01 0-3.81.4-5.22 1.2-1.4.8-2.61 1.81-3.61 3.21s-1.61 2.81-2.21 4.62c-.4 1.81-.6 3.71-.6 5.42s.8 5.22.8 5.22Zm57.8-27.9c3.21 0 6.22.6 8.63 1.81 2.41 1.2 4.82 2.81 6.62 4.82S170.2 24.39 171 27s1.4 5.62 1.4 8.83-.4 6.02-1.4 8.83-2.41 5.02-4.01 7.02-4.01 3.61-6.62 4.82-5.42 1.81-8.63 1.81-6.22-.6-8.63-1.81-4.82-2.81-6.42-4.82-3.21-4.41-4.01-7.02-1.4-5.62-1.4-8.83.4-6.02 1.4-8.83 2.41-5.02 4.01-7.02 4.01-3.61 6.42-4.82 5.42-1.81 8.63-1.81Zm0 36.73c1.81 0 3.61-.4 5.02-1s2.61-1.81 3.61-3.01 1.81-2.81 2.21-4.41c.4-1.81.8-3.61.8-5.62 0-2.21-.2-4.21-.8-6.02s-1.2-3.21-2.21-4.62c-1-1.2-2.21-2.21-3.61-3.01s-3.21-1-5.02-1-3.61.4-5.02 1c-1.4.8-2.61 1.81-3.61 3.01s-1.81 2.81-2.21 4.62c-.4 1.81-.8 3.61-.8 5.62 0 2.41.2 4.21.8 6.02.4 1.81 1.2 3.21 2.21 4.41s2.21 2.21 3.61 3.01c1.4.8 3.21 1 5.02 1Zm36.32 7.96-12.24-44.15h9.83l8.43 32.77h.4l8.23-32.77h9.83L200.3 58.04h-12.24Zm74.14-7.96c2.18 0 3.51-.6 3.51-.6 1.2-.6 2.01-1 2.81-1.81s1.4-1.81 1.81-2.81a13 13 0 0 0 .8-4.01V13.9h8.63v28.15c0 2.41-.4 4.62-1.4 6.62-.8 2.01-2.21 3.61-3.61 5.02s-3.41 2.41-5.62 3.21-4.62 1.2-7.02 1.2-5.02-.4-7.02-1.2c-2.21-.8-4.01-1.81-5.62-3.21s-2.81-3.01-3.61-5.02-1.4-4.21-1.4-6.62V13.9h8.63v26.95c0 1.61.2 3.01.8 4.01.4 1.2 1.2 2.21 2.01 2.81.8.8 1.81 1.4 2.81 1.81 0 0 1.34.6 3.51.6Zm34.22-36.18v18.92l15.65-18.92h10.82l-15.03 17.32 16.03 26.83h-10.21l-11.44-20.21-5.62 6.22v13.99h-8.83V13.9" />
        </svg>
      </a>
    </div>
  </div>
</div>
```

### What changed from v5
- CDN version updated from `5.10.2` to `6.0.0`
- Logo link class changed from `govuk-header__link govuk-header__link--homepage` to `govuk-header__homepage-link`
- SVG now includes `<circle class="govuk-logo-dot" cx="226" cy="36" r="7.3" />` (new in v6 brand refresh)
- SVG wordmark path (GOV.UK text) is fully updated with new brand letterforms
- No `<header>` semantic element — the component renders as `<div class="govuk-header">`
- Service name and navigation links must **not** appear in the header — use the Service navigation component separately if needed
