# Data Model

## Entities

### Content JSON Asset

- **Fields**:
  - `header`: string
  - `intro`: string (one sentence)
  - `projects`: array of objects
    - `title`: string
    - `date`: optional string
    - `techStack`: array of strings
    - `description`: string
    - `achievements`: array of strings
    - `links`: array of { `label`: string, `url`: string }
    - `media`: optional array of { `type`: "image" | "video" | "gif", `src`: string, `alt`: string }
  - `competitions`: array of objects
    - `title`: string
    - `date`: string
    - `role`: optional string
    - `description`: string
    - `achievements`: array of strings
    - `links`: optional array of { `label`: string, `url`: string }
  - `communityContributions`: array of objects
    - `title`: string
    - `date`: string
    - `role`: string
    - `description`: string
    - `achievements`: array of strings
    - `links`: optional array of { `label`: string, `url`: string }
  - `workingExperience`: array of objects
    - `title`: string
    - `date`: string
    - `role`: string
    - `description`: string
    - `achievements`: array of strings
    - `links`: optional array of { `label`: string, `url`: string }
  - `academic`: array of objects
    - `institution`: string
    - `program`: string
    - `summary`: string
    - `achievements`: array of strings
  - `contact`: object { `email`: string, `links`: array of { `label`, `url` } }
  - `footer`: string
- **Constraints**:
  - Headings derived in order of fields; ToC reflects array order
  - URLs must be valid http(s)
  - Media optional; fall back to text if absent
  - Each top-level section (projects, competitions, communityContributions, workingExperience, academic) is rendered as its own section with H2 heading

### Theme Preference

- **Fields**: `mode`: "light" | "dark" | "system"
- **Constraints**: default to system on first visit; persist selection locally

### Content Structure (derived)

- **Fields**: ordered list of sections/headings generated from Content JSON
- **Constraints**: used for ToC generation; must stay in sync with rendered sections

### Scroll State (derived)

- **Fields**: `currentSectionId`, `progressPercent`
- **Constraints**: updated on scroll; drives ToC highlight and progress rail

## Relationships

- Content JSON Asset -> Content Structure: one-to-one derived
- Content Structure -> Scroll State: runtime mapping for active section
- Theme Preference is independent; applied globally to UI
- Each top-level section (projects, competitions, communityContributions, workingExperience, academic) maps to a separate ContentSection with level 1

## Validation Rules

- Reject or skip invalid URLs in links
- Ensure headings unique enough for anchor IDs (slugify title + index)
- Clamp progressPercent between 0 and 100
- Handle empty arrays gracefully (hide ToC if no headings)
