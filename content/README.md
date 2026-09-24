# Adding recent graphic projects

The live website is still plain HTML, CSS and JavaScript. These files are authoring tools, not a runtime CMS.

1. Put the project's original cover image in `assets/projects/your-project/`.
2. Add an entry at the **start** of `content/graphic-projects.json`. Entries appear in that order.
3. Set `status` to `published` when the project is ready. `draft` entries stay off the page.
4. Run `npm run projects`, then `npm run images`.
5. Preview `/portfolio/graphic-design/` in a local HTTP server before publishing.

Run `npm install` once to install the optional local image tool, Sharp. The deployed website needs no Node server or packages.

```json
{
  "title": "Your project name",
  "category": "Brand identity",
  "description": "One sentence explaining the project and deliverable.",
  "image": "/assets/projects/your-project/cover.png",
  "alt": "A useful description of the project cover",
  "url": "/assets/projects/your-project/project.pdf",
  "role": "Your role and contribution",
  "status": "draft"
}
```

The URL can also be an `https://` link. `role` is optional. Publish only projects with a working image and destination. The first six projects appear immediately; the existing See more control reveals the rest.

This list controls the **graphic design collection**. Homepage featured projects and the other discipline galleries remain in their corresponding HTML pages.

## Images

`npm run images` scans live HTML, CSS and shared JavaScript, creates optimised WebP files under `assets/optimized/`, and updates references. It adds responsive sizes, intrinsic dimensions and full-resolution preview links. It preserves the originals. The PNG favicon remains for browser compatibility.

The optimiser is safe to rerun. Its report and source-to-output mapping are in `assets/optimized/manifest.json`. Run it after adding images or rebuilding project cards. Avoid manually editing generated image attributes.

## Design studies

The nine poster, editorial and social studies are editable vector compositions created for this portfolio enhancement. They are labelled **Concept study**, and are separate from the project list.

- Editable artwork: `assets/design-studies/*.svg`
- Web exports: `assets/design-studies/*.webp`
- Artwork metadata: `assets/design-studies/studies.json`
- Composition source: `scripts/build-design-studies.cjs`

The SVG files use Arial, Impact and Georgia. The website displays WebP exports so the visitor does not need those fonts. Rebuilding is intended for the Windows authoring environment with those fonts installed. The editorial and social studies reuse existing coffee photography from the portfolio.

After changing a composition, run `npm run designs` and `npm run images`. Update its card text in `portfolio/graphic-design/index.html` if the title or description changes. Original AI-generated samples remain on disk but the nine replaced samples are no longer used on the live page.
