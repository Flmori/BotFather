# TODO: Refresh Theme Color - Change Primary from Green to Peach

## Information Gathered

- Current primary color is green (#146c43)
- Existing hex colors in sitecolor.css: #146c43, #18551c, #ffa996, white, grays
- Gradient in graident.css uses #146c43, #18551c, #ffa996
- No build process; CSS is static

## Plan

1. Update sitecolor.css:

   - Change --primary-color from #146c43 to #ffa996
   - Change --primary-dark from #18551c to #495057
   - Update rgba-primary-\* to use rgba(255,169,150, ...)
   - Update --bs-primary-rgb to 255,169,150
   - Update rgba-secondary-\* to match new primary
   - Update rgba-black-\* to rgba(73,80,87, ...) for #495057

2. Update graident.css:

   - Change #146c43 to #ffa996
   - Change #18551c to #495057 in the gradient

3. Verify no other files use the old green colors (search confirmed only these files)

## Dependent Files to Edit

- sitecolor.css
- graident.css

## Followup Steps

- Test the updated theme by viewing the site
- Ensure colors render correctly
