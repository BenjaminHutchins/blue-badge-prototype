# Prototype Brief: Apply for a Blue Badge

## Service context
- Design system: GOV.UK Design System
- Framework: GOV.UK Prototype Kit (v13)
- Frontend: GOV.UK Frontend v6 with 2025 rebrand enabled (`rebrand: true` in `app/config.json`)
- Templating: Nunjucks — all pages extend `layouts/main.html`
- Components: GOV.UK Frontend Nunjucks macros (govukRadios, govukInput, govukDateInput, govukErrorSummary, govukSummaryList, govukPanel, etc.)
- Header: Standard GOV.UK branded header with service navigation — provided by the Prototype Kit layout (`govuk-prototype-kit/layouts/govuk-branded.njk`). No custom header components.
- State: Express session data (`req.session.data` / `data[]` in templates) — automatic form capture on POST
- Routing: Express routes in `app/routes.js` — branching, validation, and context switching handled server-side
- Mobile responsive

## Configuration

**`app/config.json`:**
```json
{
  "serviceName": "Apply for a Blue Badge",
  "useServiceNavigation": true,
  "plugins": {
    "govuk-frontend": {
      "rebrand": true
    }
  }
}
```

- `serviceName` — displayed in the service navigation bar below the GOV.UK header
- `useServiceNavigation` — renders the GOV.UK service navigation component automatically
- `rebrand: true` — enables the 2025 GOV.UK Frontend rebrand styles (updated Tudor Crown logo, colour palette)

## File structure

```
app/
├── config.json                       — Service name, rebrand, and plugin settings
├── routes.js                         — Routing, validation, and branching logic
├── assets/
│   ├── javascripts/
│   │   └── application.js            — Client-side JavaScript (default empty scaffold)
│   └── sass/
│       └── application.scss          — Custom SCSS (default empty scaffold)
└── views/
    ├── layouts/
    │   └── main.html                 — Base layout (extends govuk-branded.njk)
    ├── index.html                    — Page 1: Start
    ├── eligibility.html              — Page 2: Who are you applying for?
    ├── criterion.html                — Page 3: What criterion do you want to apply under?
    ├── personal-details.html         — Page 4: Your / Their personal details
    ├── check-answers.html            — Page 5: Check your answers
    └── confirmation.html             — Page 6: Application submitted
```

---

## Pages to build

---

### Page 1 — Start page
**File:** `app/views/index.html`

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

**CTA:** Start now button (`govukButton` with `isStartButton: true`) → links to `/eligibility`

**Footer:** Standard GOV.UK footer (provided by layout)

---

### Page 2 — Who are you applying for?
**File:** `app/views/eligibility.html`

**Browser title:** Who are you applying for? – Apply for a Blue Badge – GOV.UK

**Phase banner:** ALPHA

**Back link:** → goes to `/` (start)

**H1:** Who are you applying for?

**Form component:** `govukRadios` with `name: "applying-for"`

**Options:**
- `myself` — Myself
- `someone-else` — Someone else

**Hint text (under H1):** Select one option.

**Form:** `method="post"` with `action="/eligibility-answer"`

**CTA:** Continue button (`govukButton`)

**Validation (in routes.js):** If no option is selected and Continue is clicked:
- Server-side redirect back to `/eligibility` with errors
- Error summary at top of page: "There is a problem" with link "Select who you are applying for"
- Inline error on the radio group: "Select who you are applying for"
- Page title prefixes with "Error: "

**Footer:** Standard GOV.UK footer

---

### Page 3 — What criterion do you want to apply under?
**File:** `app/views/criterion.html`

**Browser title:** What criterion do you want to apply under? – Apply for a Blue Badge – GOV.UK

**Phase banner:** ALPHA

**Back link:** → goes to `/eligibility` (Who are you applying for?)

**H1:** What criterion do you want to apply under?

**Form component:** `govukRadios` with `name: "criterion"`

**Options:**
- `terminal-illness` — Terminal illness
- `dla-higher-rate` — Disability Living Allowance higher rate mobility component
- `pip` — Personal Independence Payment
- `armed-forces-tariff` — Lump sum at tariff 1–8 from the Armed Forces Compensation Scheme
- `war-pensioners` — War pensioners mobility supplement
- `registered-blind` — Registered blind or severely sight impaired
- `walking-difficulty` — Can't walk or find walking difficult
- `hidden-disability` — Non-visible (hidden) disability
- `arms-disability` — Driver with disability in both arms
- `child-under-3-vehicle` — Child under 3 who needs to be kept near to a vehicle
- `child-under-3-equipment` — Child under 3 who needs bulky medical equipment

**Hint text (under H1):** Select all that apply.

**Form:** `method="post"` with `action="/criterion-answer"`

**CTA:** Continue button (`govukButton`)

**Validation (in routes.js):** If no option is selected and Continue is clicked:
- Server-side redirect back to `/criterion` with errors
- Error summary at top of page: "There is a problem" with link "Select what criterion you want to apply under"
- Inline error on the radio group: "Select what criterion you want to apply under"
- Page title prefixes with "Error: "

**Footer:** Standard GOV.UK footer

---

### Page 4 — Personal details
**File:** `app/views/personal-details.html`

**Browser title:**
- Myself: `Your personal details – Apply for a Blue Badge – GOV.UK`
- Someone else: `Their personal details – Apply for a Blue Badge – GOV.UK`

**Phase banner:** ALPHA

**Back link:** → goes to `/criterion`

**H1:**
- Myself: `Your personal details`
- Someone else: `Their personal details`

**Body copy:** We need these details to process your application.

**Context rule:** All content on this page uses "your" when applying for Myself, and "their" when applying for Someone else. This applies to the H1, browser title, and all validation error messages. The body copy and field labels are neutral and do not change. The pronoun is determined server-side in `routes.js` based on `req.session.data['applying-for']` and passed to the template.

**Form fields:**

1. **First name**
   - Component: `govukInput`
   - Label: First name
   - `name: "first-name"`
   - autocomplete: given-name
   - Width: govuk-input--width-20
   - Pre-filled with: `data['first-name']`

2. **Last name**
   - Component: `govukInput`
   - Label: Last name
   - `name: "last-name"`
   - autocomplete: family-name
   - Width: govuk-input--width-20
   - Pre-filled with: `data['last-name']`

3. **Date of birth**
   - Component: `govukDateInput`
   - `namePrefix: "dob"`
   - Legend: Date of birth
   - Hint: For example, 27 3 1980
   - Three inputs: Day (`dob-day`), Month (`dob-month`), Year (`dob-year`)
   - Pre-filled with session values

4. **Email address**
   - Component: `govukInput`
   - Label: Email address
   - `name: "email"`
   - Hint: We'll only use this to send you updates about your application
   - Type: email
   - autocomplete: email
   - Width: govuk-input--width-20
   - Pre-filled with: `data['email']`

**Form:** `method="post"` with `action="/personal-details-answer"`

**CTA:** Continue button (`govukButton`)

**Validation (in routes.js):** If any required field is empty on Continue:
- Server-side redirect back to `/personal-details` with errors array
- Error summary: "There is a problem" listing each missing field
- Inline error on each empty field uses the context-aware pronoun:
  - Myself: "Enter your first name" / "Enter your last name" / "Enter your email address"
  - Someone else: "Enter their first name" / "Enter their last name" / "Enter their email address"
- Page title prefixes with "Error: " and uses the context-aware heading (e.g. "Error: Their personal details – …")

**Date of birth validation** follows the GOV.UK date input error pattern — specific message depending on which fields are missing, with only the missing inputs highlighted via error classes. The "all missing" message also uses the context-aware pronoun:

| Missing fields | Myself | Someone else |
|----------------|--------|--------------|
| All three | Enter your date of birth | Enter their date of birth |
| Day + month | Date of birth must include a day and month | ← same |
| Day + year | Date of birth must include a day and year | ← same |
| Month + year | Date of birth must include a month and year | ← same |
| Day only | Date of birth must include a day | ← same |
| Month only | Date of birth must include a month | ← same |
| Year only | Date of birth must include a year | ← same |

The error summary link for DOB anchors to `#dob-day`.

**Footer:** Standard GOV.UK footer

---

### Page 5 — Check your answers
**File:** `app/views/check-answers.html`

**Browser title:** Check your answers – Apply for a Blue Badge – GOV.UK

**Phase banner:** ALPHA

**Back link:** → goes to `/personal-details`

**H1:** Check your answers before sending your application

**Component:** `govukSummaryList` with change links

**Rows:**
| Key | Value | Action |
|-----|-------|--------|
| Applying for | `data['applying-for']` displayed as "Myself" or "Someone else" | Change → `/eligibility` |
| Criterion | `data['criterion']` — single selected value, displayed as its human-readable label | Change → `/criterion` |
| First name | `data['first-name']` | Change → `/personal-details` |
| Last name | `data['last-name']` | Change → `/personal-details` |
| Date of birth | Formatted from `data['dob-day']`, `data['dob-month']`, `data['dob-year']` | Change → `/personal-details` |
| Email address | `data['email']` | Change → `/personal-details` |

**Date of birth display:** Formatted as readable text (e.g. "27 March 1980") using month name lookup in the template.

**Subheading (govuk-heading-m):** Now send your application

**Body copy:** By submitting this application you confirm that the information you have provided is correct to the best of your knowledge.

**Form:** `method="post"` with `action="/check-answers-answer"`

**CTA:** Accept and send button (`govukButton`)

**Footer:** Standard GOV.UK footer

---

### Page 6 — Confirmation
**File:** `app/views/confirmation.html`

**Browser title:** Application submitted – Apply for a Blue Badge – GOV.UK

**Phase banner:** ALPHA

**No back link** on this page.

**Component:** `govukPanel`
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

All routing logic lives in `app/routes.js`.

| Route | Method | Logic |
|-------|--------|-------|
| `/` | GET | Auto-renders `views/index.html` (no route needed) |
| `/eligibility` | GET | Auto-renders `views/eligibility.html` (no route needed) |
| `/eligibility-answer` | POST | Validate radio selection → redirect to `/criterion` or re-render with errors |
| `/criterion` | GET | Auto-renders `views/criterion.html` (no route needed) |
| `/criterion-answer` | POST | Validate radio selection → redirect to `/personal-details` or re-render with errors |
| `/personal-details` | GET | Determine pronoun from `data['applying-for']`, render with `pronoun` variable |
| `/personal-details-answer` | POST | Validate all fields → redirect to `/check-answers` or re-render with errors and `pronoun` |
| `/check-answers` | GET | Auto-renders `views/check-answers.html` (no route needed) |
| `/check-answers-answer` | POST | Redirect to `/confirmation` |
| `/confirmation` | GET | Auto-renders `views/confirmation.html` (no route needed) |

### Context switching
When the user selects "Someone else" on the Eligibility page, `routes.js` sets `pronoun = "their"` (default is `"your"`). The personal details template uses this variable for:
- H1: "{{ pronoun | capitalize }} personal details"
- Browser title: "{{ pronoun | capitalize }} personal details – Apply for a Blue Badge – GOV.UK"
- Validation error messages: "Enter {{ pronoun }} first name", etc.

All other content (body copy, field labels, hint text) is written neutrally and does not change.

---

## State management

The GOV.UK Prototype Kit automatically captures all form field values into `req.session.data` when a form is submitted via POST. Fields are stored using their `name` attribute as the key.

**Accessing data in routes (JavaScript):**
```javascript
var applyingFor = req.session.data['applying-for']
var firstName = req.session.data['first-name']
```

**Accessing data in templates (Nunjucks):**
```nunjucks
{{ data['first-name'] }}
{{ data['dob-day'] }}
```

**Pre-populating fields:** Use `value: data['field-name']` in component macros — the kit handles this automatically.

**Session data shape (after full completion):**
```
applying-for:  "myself" or "someone-else"
criterion:     "terminal-illness"                   — single selected radio value
first-name:    ""
last-name:     ""
dob-day:       ""
dob-month:     ""
dob-year:      ""
email:         ""
```

---

## Design rules

- GOV.UK Design System components only — no custom UI patterns
- All components use Nunjucks macros from GOV.UK Frontend (provided by the Prototype Kit)
- ALPHA phase banner on every page with "feedback" link (href="#")
- Standard GOV.UK branded header provided by the Prototype Kit layout — no custom header overrides
- Service navigation bar with service name "Apply for a Blue Badge" (configured in `app/config.json`)
- Standard GOV.UK footer on every page (provided by layout)
- Back link on every page except Start and Confirmation
- Forms use `method="post"` — validation and routing handled server-side in `routes.js`
- Error behaviour follows GOV.UK error message and error summary patterns exactly
- Page `<title>` set via `{% block pageTitle %}` on each template
- Pre-populate fields with `data['field-name']` to support the "Change" link journey
- All pages extend `layouts/main.html`, which extends `govuk-prototype-kit/layouts/govuk-branded.njk`
- No custom CSS or JavaScript — `application.scss` and `application.js` are default empty scaffolds
