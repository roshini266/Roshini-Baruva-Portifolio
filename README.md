# Roshini Baruva — GitHub Pages Portfolio (V2)

This version is ready for a clean GitHub Pages workflow with an `assets` folder for all images/PDFs.

## Folder structure

```text
Roshini_Baruva_Portfolio_V2/
├── index.html
├── style.css
├── script.js
├── data.js
├── README.md
└── assets/
    ├── profile/
    ├── internships/
    ├── projects/
    ├── certifications/
    └── research/
```

## Add your media

Put your files in the matching folders and keep the filenames simple.

### Profile
`assets/profile/roshini-profile.jpg`

### Internship logos and proof
`assets/internships/infosys-logo.png`
`assets/internships/infosys-certificate.jpg`
`assets/internships/apsche-logo.png`
`assets/internships/apsche-certificate.jpg`
`assets/internships/apssdc-logo.png`
`assets/internships/apssdc-certificate.jpg`
`assets/internships/supraja-logo.png`
`assets/internships/supraja-certificate.jpg`

### Projects
`assets/projects/player-transfer.png`
`assets/projects/flood-prediction.png`
`assets/projects/ecommerce.png`
`assets/projects/webcam-security.png`

### Certifications
`assets/certifications/python-essentials.jpg`
`assets/certifications/javascript-essentials.jpg`
`assets/certifications/html-css-essentials.jpg`
`assets/certifications/infosys-ai.jpg`

### Research
`assets/research/research-publication.jpg`
`assets/research/research-paper.pdf`

The code already points to these paths. If a file is missing, the page still works; the relevant media simply won't display.

## Mobile navigation

On phones, tap the three-line button. The menu opens as a full-screen vertical list with one item per row, so it is easy to tap. Tapping any item closes the menu automatically.

## Owner Mode

Normal visitors will not see an admin/editor link.

On your Mac press **Cmd + Shift + E**. On Windows press **Ctrl + Shift + E**.

You can:
- edit profile information
- add/edit/delete education
- add/edit/delete internships and their details
- add/edit/delete projects
- add/edit/delete certifications
- add/delete achievements
- change relative asset paths
- export an updated `data.js`

### Publishing changes

GitHub Pages is static hosting. A browser cannot securely write new files into your GitHub repository. Therefore:

1. Put the actual image/PDF files into the appropriate `assets` folder in your local portfolio.
2. Update their paths in Owner Mode if needed.
3. Export `data.js`.
4. Replace the repository's `data.js` with the exported version.
5. Commit/push the changes.

The public site only shows the entries and media you have actually added. Owner Mode is not part of the public navigation.

## Contact form

The contact form uses `mailto:` and opens the visitor's configured email client with the recipient, subject and message prepared. No backend is required.
