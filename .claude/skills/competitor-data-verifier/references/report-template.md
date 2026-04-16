# Report Template

Use this structure for the verification report. Focus on actionable findings — skip verbose per-feature "verified as accurate" listings.

```markdown
# Competitor Data Verification: {Name}
Date: {YYYY-MM-DD} | File: src/hooks/competitorData/{competitor}.tsx

## Summary
- X high-confidence changes found
- Y items need manual verification
- Z new capabilities discovered

## High-Confidence Changes (recommend applying)

For each change, include the field path, old/new values, source URL, and a direct quote:

**{product}.{section}.{field}**
Current: `{old_value}` → Recommended: `{new_value}`
Source: [{page title}]({url})
Quote: "{exact text from the page}"

## Needs Manual Verification

Use a table for items you couldn't definitively confirm:

| Field | Current Value | Question | Priority |
|-------|-------------|----------|----------|
| `{field_path}` | `{value}` | {what needs checking} | High/Med/Low |

## Proposed Diff

Show all recommended changes as a unified diff:

​```diff
// In src/hooks/competitorData/{competitor}.tsx

-    free_tier: '10k monthly tracked users',
+    free_tier: '50K monthly tracked users',
​```

## Verification Checklist
- [ ] All source URLs are accessible
- [ ] Pricing information is current
- [ ] Changes are backwards compatible with the schema
```

## Tips

- Lead with the diff — it's what the user actually needs to act on
- Group changes by confidence level, not by product category
- Keep "verified as accurate" items out of the main report — mention the count in the summary only
- For the "Needs Manual Verification" table, include a Priority column to help the user triage
