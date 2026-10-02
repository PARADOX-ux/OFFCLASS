# OFFCLASS Content Style Guide

## Voice & Tone

### Who We Sound Like
- **Direct** — Say what you mean. No fluff.
- **Practical** — Every sentence should be actionable or informative.
- **Intelligent** — Respect the reader's intelligence.
- **Energetic** — Not corporate. Not boring.
- **Honest** — Never overpromise. Never fake.

### Who We Don't Sound Like
- ❌ Corporate HR speak
- ❌ Fake motivational ("You can be anything!")
- ❌ Condescending or preachy
- ❌ Clickbait or sensationalist
- ❌ Generic student website copy

---

## Content Rules

### 1. Never Fabricate Data
- No fake user counts ("10,000+ students trust us")
- No fake testimonials or reviews
- No fake partner logos
- No fabricated statistics or success rates
- All demo content must be clearly labeled `[Demo]` or use the `badge-demo` class

### 2. Financial Content
- ALWAYS include a disclaimer: "This is educational, not financial advice"
- NEVER guarantee income, earnings, or financial outcomes
- Use ranges, not specific numbers, for earning potential
- Use the `<Disclaimer type="financial" />` component
- Avoid words like "guaranteed", "easy money", "passive income"

### 3. Career Content
- Don't guarantee jobs, salaries, or career outcomes
- Salary ranges should note: "varies by location, experience, and company"
- Use "may", "could", "potential" instead of definitive claims
- Use the `<Disclaimer type="career" />` component

### 4. Opportunity Listings
- All demo listings use `[Demo Company]`, `[Demo Platform]`, etc.
- Real listings must be verified before publishing
- Include eligibility requirements for every listing
- Never use expired deadlines without marking them

---

## Formatting Standards

### Headings
- **H1**: One per page, describes the page purpose
- **H2**: Section headings — short, punchy, action-oriented
- **H3**: Card titles or subsection headings
- Use sentence case, not Title Case (except for brand names)

### Text
- Body text: 0.85–0.95rem
- Muted text: `text-[var(--color-muted)]`
- Keep paragraphs short (2–3 sentences max)
- Use bullet points for lists of 3+ items

### Labels & Tags
- Section labels: ALL CAPS, small, tracked (`section-label` class)
- Category pills: Capitalize first letter only
- Badges: ALL CAPS, small

---

## Brand Words

### Use These
- Build, Create, Explore, Discover, Learn, Earn, Launch
- Practical, Real, Honest, Useful, Capable
- Independence, Journey, Skills, Portfolio, Proof

### Avoid These
- Disrupt, Hustle, Grind, Boss, Slay
- Revolutionary, Game-changing, Life-changing
- Guaranteed, Promise, Easy, Quick, Hack
- Exclusive (unless access-gated)

---

## Component Usage

| Component | When to Use |
|---|---|
| `<Disclaimer type="financial" />` | Any page/section about money or earning |
| `<Disclaimer type="career" />` | Career paths, salary info, job-related content |
| `<Disclaimer type="demo" />` | Demo data sections |
| `<Disclaimer type="general" />` | General informational content |
| `badge-demo` | On every demo data card |
| `badge-coming-soon` | For planned but unbuilt features |
| `badge-verified` | Only for verified real content (future) |

---

## Writing Checklist

Before publishing any content:

- [ ] Is it practical and actionable?
- [ ] Does it avoid guaranteed outcomes?
- [ ] Is demo data clearly marked?
- [ ] Are financial disclaimers included where needed?
- [ ] Is the tone direct and honest?
- [ ] Are there any typos or grammatical errors?
- [ ] Does it follow heading hierarchy (H1 > H2 > H3)?
- [ ] Are all links working?
