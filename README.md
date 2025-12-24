# MN EDU HELP 🎨

**Tagline:** *practice made easy now*

A fully customized Google Sheets educational script designed to assist kids in learning through an innovative and unique interface. Features a beautiful rainbow-colored UI/UX with fluffy font styles (soft cotton candy type) throughout all menus and interfaces.

## 🌟 Features

### 🎨 Beautiful UI/UX
- **Rainbow Colors**: Light-shaded rainbow colors throughout the interface
- **Fluffy Font**: Soft, comfortable "Comfortaa" font style for easy reading
- **Consistent Branding**: "MN EDU HELP" logo and tagline on every menu
- **Professional Footer**: "created by DAVESIR a.t. dathakvs" on every page

### 👑 Admin Menu (Exclusive Access)
**Restricted to admin only** (`baraiyanitin220@gmail.com`)

- **Add New Menu**: Create custom educational menus
  - Set parent menu relationships
  - Choose category (words, numbers, tables, pictures, etc.)
  - Add custom content with language preservation (Gujarati, etc.)
- **Settings**: Edit, reorder, or delete existing menus
- **Restore**: Complete version history with timestamp-based rollback
  - Tracks all code versions and menu changes
  - Restore to any previous state
  - No data loss guarantee

### 🎨 Utility Menu
- **Fill in Blanks**: Randomly removes 40% of content for practice exercises
- **Magic Shuffle**: Randomly rearranges cell data for variety
- **Mosaic Coloring**: Applies beautiful random light shades with matching text colors
  - Light pink cells with pink/red text
  - Light blue cells with blue text
  - And more rainbow variations!
- **Share**: Share sheets via multiple channels
  - WhatsApp, SMS, or QR code support
  - Multiple formats: PDF, Excel, JPEG
- **Add More Content**: Automatically checks and appends content from database

### 📄 Page Layout Menu
- **Page Setup**: Configure print settings
  - Page sizes: A4, Letter, Legal
  - Orientations: Portrait, Landscape
- **Adjust Columns**: Auto-resize columns intelligently
- **Adjust Rows**: Consistent row height adjustments
- **Set Print Area**: Smart print area configuration

### 🔒 Security & Data Protection
- **Admin-Only Access**: Exclusive features bound to admin email
- **Complete Backup System**: Every change is tracked and reversible
- **Language Preservation**: All content remains in original language
- **No Data Loss**: Restore functionality ensures complete reversibility

## 📦 Installation

### Prerequisites
- Google Account with Google Sheets access
- [Node.js](https://nodejs.org/) (for clasp CLI)
- [clasp](https://github.com/google/clasp) - Google Apps Script command-line tool

### Setup Instructions

1. **Install clasp globally**
   ```bash
   npm install -g @google/clasp
   ```

2. **Login to clasp**
   ```bash
   clasp login
   ```

3. **Clone this repository**
   ```bash
   git clone https://github.com/dathakvs01/MN-EDU-HELP.git
   cd MN-EDU-HELP
   ```

4. **Create a new Google Apps Script project**
   - Option A: Create from an existing Google Sheet
     ```bash
     clasp create --type sheets --title "MN EDU HELP"
     ```
   
   - Option B: Create standalone and link to a spreadsheet later
     ```bash
     clasp create --type standalone --title "MN EDU HELP"
     ```

5. **Push the code to Google Apps Script**
   ```bash
   clasp push
   ```

6. **Open the project in Google Apps Script editor**
   ```bash
   clasp open
   ```

7. **Deploy and authorize**
   - In the Apps Script editor, run the `onOpen` function once
   - Authorize the required permissions
   - Reload your Google Sheet to see the custom menu

## 🚀 Usage

### For Students/Users

1. **Open your Google Sheet** with MN EDU HELP installed
2. **Look for the "MN EDU HELP" menu** in the menu bar
3. **Use the Utility Menu** for learning activities:
   - Click "Fill in Blanks" to create practice exercises
   - Use "Magic Shuffle" to mix up content
   - Apply "Mosaic Coloring" for visual appeal
   - Share your work using the "Share" option

4. **Use the Page Layout Menu** for printing:
   - Configure page size and orientation
   - Adjust columns and rows for better layout
   - Set print areas before printing

### For Admin (`baraiyanitin220@gmail.com`)

1. **Access the Admin Menu** (only visible to admin)
2. **Add New Menus**:
   - Click "Add New Menu"
   - Fill in the form:
     - Parent Menu: Enter "root" for top-level or existing menu name for sub-menu
     - Menu Name: Give it a descriptive name
     - Category: Select from words, numbers, tables, pictures, or custom
     - Content: Add your educational content
   - Click "Add Menu"

3. **Manage Existing Menus**:
   - Click "Settings" to view all custom menus
   - Edit or delete menus as needed
   - Changes are automatically backed up

4. **Restore Previous Versions**:
   - Click "Restore" to view all backups
   - Select a backup point to restore
   - All changes are reversible

## 🎯 Content Guidelines

### Adding Content

#### For Tables (Category: tables)
Use tab-separated values with new lines for rows:
```
Name	Age	Grade
John	10	5th
Mary	11	6th
```

#### For Words (Category: words)
One word per line or tab-separated:
```
Apple
Banana
Cherry
```

#### For Numbers (Category: numbers)
Numbers and equations:
```
1 + 1 = 2
2 × 3 = 6
5 - 2 = 3
```

#### For Pictures (Category: pictures)
Provide image URLs or descriptions.

### Language Preservation
- **Gujarati content** remains unchanged
- **All languages** are preserved as entered
- Admin must provide content in the desired language
- No automatic translation or modification

## 🎨 Customization

### Colors
The script uses 7 rainbow colors in light shades:
- Light Pink (#FFE5E5)
- Light Orange (#FFE5CC)
- Light Yellow (#FFFFCC)
- Light Green (#E5FFCC)
- Light Blue (#E5F5FF)
- Light Indigo (#E5E5FF)
- Light Violet (#F5E5FF)

### Fonts
Default font: **Comfortaa** (fluffy, soft cotton candy style)

## 📋 File Structure

```
MN-EDU-HELP/
├── Code.gs                 # Main script file
├── AddMenuDialog.html      # Admin: Add new menu UI
├── SettingsDialog.html     # Admin: Manage menus UI
├── RestoreDialog.html      # Admin: Restore backups UI
├── ShareDialog.html        # Share functionality UI
├── PageSetupDialog.html    # Page layout settings UI
├── appsscript.json        # Apps Script configuration
├── .clasp.json            # Clasp configuration
└── README.md              # This file
```

## 🔧 Technical Details

### Data Storage
- **Script Properties**: Used for storing custom menus and backups
- **Backup System**: Maintains last 50 backup snapshots
- **No External Database**: All data stored within Google Apps Script properties

### Permissions Required
- `https://www.googleapis.com/auth/spreadsheets` - Read/write spreadsheet data
- `https://www.googleapis.com/auth/script.container.ui` - Create custom menus and dialogs
- `https://www.googleapis.com/auth/script.external_request` - External requests (for sharing)

### Browser Compatibility
- Works on all modern browsers
- Best viewed in Google Chrome
- Mobile-responsive dialogs

## 🛡️ Security

- **Admin Authentication**: Checked via `Session.getActiveUser().getEmail()`
- **No Password Storage**: Uses Google account authentication
- **Data Privacy**: All data stays within your Google account
- **No External APIs**: No third-party services access your data

## 🐛 Troubleshooting

### Menu Not Showing
1. Refresh the Google Sheet
2. Check if you've authorized the script
3. Run `onOpen()` function manually from script editor

### Admin Menu Not Visible
- Ensure you're logged in with: `baraiyanitin220@gmail.com`
- The admin menu is only visible to this specific email

### Content Not Loading
- Check Script Properties for stored data
- Verify backup system is working
- Use Restore feature to rollback if needed

### Formatting Issues
- Ensure headers are in rows 1-2
- Footer should be in the last row
- Don't manually modify header/footer rows

## 📝 Development Rules

1. **Language Fix**: Maintain all language inputs as provided (e.g., Gujarati unchanged)
2. **Admin Exclusivity**: Only bound admin user can access admin panel
3. **Restore Rule**: Ensure no data loss; every change is reversible
4. **Content & Layout Preservation**: Headers, footers, and layouts remain intact
5. **No Incidental Alterations**: Only specified areas modified during updates

## 🤝 Contributing

This is a custom educational tool. For modifications or feature requests, contact the admin.

## 📄 License

Created by **DAVESIR a.t. dathakvs**

## 📞 Support

For issues or questions, please contact the administrator at: `baraiyanitin220@gmail.com`

---

**MN EDU HELP** - Making practice easy for kids! 🎨📚✨