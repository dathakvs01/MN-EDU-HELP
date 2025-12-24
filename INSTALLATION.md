# MN EDU HELP - Installation Guide 📖

This guide will walk you through the complete installation process of MN EDU HELP on your Google Sheets.

## 🎯 Quick Start (Recommended)

The easiest way to install MN EDU HELP is through the Google Apps Script editor directly from a Google Sheet.

### Step 1: Create a New Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it "MN EDU HELP Practice Sheet"

### Step 2: Open Apps Script Editor
1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any default code in the editor
3. The project will be automatically named "Untitled project" - you can rename it to "MN EDU HELP"

### Step 3: Add the Script Files

#### Create Code.gs
1. The default file should be named `Code.gs`
2. Copy the entire content from the `Code.gs` file in this repository
3. Paste it into the editor
4. Click the **Save** icon (💾)

#### Add HTML Dialog Files
For each HTML file, follow these steps:

1. Click the **+** button next to "Files"
2. Select **HTML**
3. Name it exactly as shown below
4. Copy and paste the content from the corresponding file in this repository

Add these files:
- `AddMenuDialog.html`
- `SettingsDialog.html`
- `RestoreDialog.html`
- `ShareDialog.html`
- `PageSetupDialog.html`

#### Add Configuration File
1. Click the **+** button next to "Files"
2. Select **Script** (not HTML)
3. Name it `appsscript.json`
4. Copy and paste the content from `appsscript.json` in this repository

### Step 4: Deploy and Test
1. **Save all files** (Ctrl+S or Cmd+S)
2. In the toolbar, select **onOpen** function from the dropdown
3. Click **Run** (▶️)
4. **Authorize the script**:
   - Click "Review Permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to MN EDU HELP (unsafe)"
   - Click "Allow"

### Step 5: Refresh and Use
1. Go back to your Google Sheet (switch tabs)
2. **Refresh the page** (F5 or Ctrl+R)
3. You should now see **"MN EDU HELP"** in the menu bar!
4. Click it to explore the menus

## 🔧 Advanced Installation (Using clasp CLI)

For developers who want to work with the code locally and deploy using the command line.

### Prerequisites
```bash
# Install Node.js first (if not installed)
# Download from: https://nodejs.org/

# Install clasp globally
npm install -g @google/clasp

# Login to your Google account
clasp login
```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/dathakvs01/MN-EDU-HELP.git
   cd MN-EDU-HELP
   ```

2. **Create a new Apps Script project**
   
   Option A - Attach to existing Google Sheet:
   ```bash
   # Open the Google Sheet in browser first
   # Get the spreadsheet ID from the URL
   # Format: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit
   
   clasp create --type sheets --title "MN EDU HELP" --parentId SPREADSHEET_ID
   ```
   
   Option B - Create standalone project:
   ```bash
   clasp create --type sheets --title "MN EDU HELP"
   ```

3. **Push code to Google**
   ```bash
   clasp push
   ```

4. **Open in browser**
   ```bash
   clasp open
   ```

5. **Run and authorize**
   - Select `onOpen` function
   - Click Run
   - Authorize when prompted

6. **Go to your spreadsheet and refresh**

### Development Workflow with clasp

```bash
# Pull latest changes from Google Apps Script
clasp pull

# Edit files locally
# Make your changes...

# Push changes back to Google
clasp push

# Watch for changes and auto-push
clasp push --watch

# View logs
clasp logs
```

## 👑 Admin Configuration

### Setting Up Admin Access

The admin email is hardcoded in `Code.gs`:
```javascript
const ADMIN_EMAIL = 'baraiyanitin220@gmail.com';
```

**To change the admin email:**
1. Open `Code.gs` in the Apps Script editor
2. Find line 12 (or search for `ADMIN_EMAIL`)
3. Change the email address to your desired admin email
4. Save the file
5. Refresh your Google Sheet

**Important:** Only the specified email will have access to:
- Add New Menu
- Settings
- Restore functionality

## 🎨 Customization Options

### Change Brand Name
In `Code.gs`, line 13:
```javascript
const BRAND_NAME = 'MN EDU HELP';
```

### Change Tagline
In `Code.gs`, line 14:
```javascript
const TAGLINE = 'practice made easy now';
```

### Change Footer Text
In `Code.gs`, line 15:
```javascript
const FOOTER_TEXT = 'created by DAVESIR a.t. dathakvs';
```

### Modify Rainbow Colors
In `Code.gs`, lines 18-26:
```javascript
const RAINBOW_COLORS = [
  '#FFE5E5', // Light Pink - change this
  '#FFE5CC', // Light Orange - change this
  // ... etc
];
```

### Change Font Style
In `Code.gs`, line 29:
```javascript
const FLUFFY_FONT = 'Comfortaa';
```

Available Google Fonts alternatives:
- `'Quicksand'` - Similar fluffy style
- `'Poppins'` - Modern and clean
- `'Nunito'` - Friendly and rounded
- `'Fredoka One'` - Fun and bold

## ✅ Verification Checklist

After installation, verify everything works:

- [ ] Custom menu "MN EDU HELP" appears in menu bar
- [ ] Utility menu items are visible (Fill in Blanks, Magic Shuffle, etc.)
- [ ] Page Layout menu items are visible
- [ ] Admin menu appears (only if logged in as admin)
- [ ] Header shows "MN EDU HELP" with tagline
- [ ] Footer shows "created by DAVESIR a.t. dathakvs"
- [ ] Comfortaa font is applied
- [ ] Dialog boxes open with rainbow-colored UI

## 🐛 Common Issues & Solutions

### Issue: Menu doesn't appear
**Solution:**
- Refresh the Google Sheet (F5)
- Clear browser cache
- Run `onOpen()` manually from script editor
- Check if script is authorized

### Issue: "Authorization Required" error
**Solution:**
- In Apps Script editor, click Run with `onOpen` selected
- Complete the authorization flow
- May need to enable third-party cookies

### Issue: Admin menu not visible
**Solution:**
- Verify you're logged in with the correct admin email
- Check `ADMIN_EMAIL` constant in `Code.gs`
- The email must match exactly (case-sensitive)

### Issue: Functions not working
**Solution:**
- Check execution logs: Apps Script Editor → View → Logs
- Verify all HTML files are properly named
- Ensure `appsscript.json` has correct OAuth scopes

### Issue: Dialogs show error
**Solution:**
- Check if HTML files are properly uploaded
- Verify file names match exactly (case-sensitive)
- Review browser console for JavaScript errors

### Issue: Colors or fonts not applying
**Solution:**
- Clear browser cache
- Check if Comfortaa font is loading (network tab)
- Verify RAINBOW_COLORS array is properly formatted

## 📱 Mobile Access

MN EDU HELP works on mobile devices through the Google Sheets app:

1. Open Google Sheets app
2. Open your sheet with MN EDU HELP
3. Tap the three dots (⋮) menu
4. Look for MN EDU HELP options

**Note:** Some dialogs may have limited functionality on mobile. Desktop browser recommended for full experience.

## 🔄 Updating the Script

### Manual Update
1. Go to Apps Script editor
2. Copy new code from repository
3. Paste and replace in corresponding files
4. Save all files
5. Refresh your Google Sheet

### Using clasp
```bash
git pull origin main
clasp push
```

## 🔐 Security Best Practices

1. **Don't share admin access** - Keep admin email private
2. **Review code changes** - Always review before pushing updates
3. **Use version control** - Keep backups of your customizations
4. **Test in development** - Create a test sheet for new features
5. **Monitor script activity** - Check Apps Script execution logs regularly

## 📞 Getting Help

If you encounter issues:

1. Check the execution logs in Apps Script editor
2. Review this installation guide
3. Check the main README.md for usage instructions
4. Contact admin at: `baraiyanitin220@gmail.com`

## 🎉 Success!

Once installed, you're ready to use MN EDU HELP! Check the main README.md for detailed usage instructions and features.

---

**Happy Learning! 🎨📚✨**
