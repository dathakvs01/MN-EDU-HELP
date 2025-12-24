/**
 * MN EDU HELP - Google Sheets Educational Script
 * Created by DAVESIR a.t. dathakvs
 * 
 * A fully customized Google Sheets script to assist kids in learning
 * through an innovative and unique interface with rainbow-colored UI/UX
 */

// ============================================================================
// GLOBAL CONSTANTS
// ============================================================================

const ADMIN_EMAIL = 'baraiyanitin220@gmail.com';
const BRAND_NAME = 'MN EDU HELP';
const TAGLINE = 'practice made easy now';
const FOOTER_TEXT = 'created by DAVESIR a.t. dathakvs';

// Fill in blanks percentage (40% of content will be removed)
const FILL_IN_BLANKS_PERCENTAGE = 0.4;

// Rainbow colors - light shades
const RAINBOW_COLORS = [
  '#FFE5E5', // Light Pink
  '#FFE5CC', // Light Orange
  '#FFFFCC', // Light Yellow
  '#E5FFCC', // Light Green
  '#E5F5FF', // Light Blue
  '#E5E5FF', // Light Indigo
  '#F5E5FF'  // Light Violet
];

// Fluffy font style
const FLUFFY_FONT = 'Comfortaa';

// ============================================================================
// MENU CREATION
// ============================================================================

/**
 * Creates custom menu when spreadsheet opens
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  const email = Session.getActiveUser().getEmail();
  
  // Main menu
  let menu = ui.createMenu(BRAND_NAME);
  
  // Dynamic menus (loaded from properties)
  loadDynamicMenus(menu);
  
  // Utility Menu
  let utilityMenu = ui.createMenu('🎨 Utility')
    .addItem('📝 Fill in Blanks', 'fillInBlanks')
    .addItem('🔀 Magic Shuffle', 'magicShuffle')
    .addItem('🎨 Mosaic Coloring', 'mosaicColoring')
    .addItem('📤 Share', 'showShareDialog')
    .addItem('➕ Add More Content', 'addMoreContent');
  
  menu.addSubMenu(utilityMenu);
  
  // Page Layout Menu
  let layoutMenu = ui.createMenu('📄 Page Layout')
    .addItem('⚙️ Page Setup', 'showPageSetupDialog')
    .addItem('📏 Adjust Columns', 'adjustColumns')
    .addItem('📐 Adjust Rows', 'adjustRows')
    .addItem('🖨️ Set Print Area', 'setPrintArea');
  
  menu.addSubMenu(layoutMenu);
  
  // Admin Menu (only for admin)
  if (email === ADMIN_EMAIL) {
    let adminMenu = ui.createMenu('👑 Admin')
      .addItem('➕ Add New Menu', 'showAddMenuDialog')
      .addItem('⚙️ Settings', 'showSettingsDialog')
      .addItem('🔄 Restore', 'showRestoreDialog');
    
    menu.addSubMenu(adminMenu);
  }
  
  menu.addToUi();
  
  // Apply initial formatting
  applyGlobalFormatting();
}

/**
 * Load dynamic menus from properties
 */
function loadDynamicMenus(menu) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const menusJson = scriptProperties.getProperty('customMenus');
  
  if (menusJson) {
    try {
      const menus = JSON.parse(menusJson);
      
      // Group menus by parent
      const menuGroups = {};
      menus.forEach(item => {
        if (!menuGroups[item.parent]) {
          menuGroups[item.parent] = [];
        }
        menuGroups[item.parent].push(item);
      });
      
      // Add top-level menus
      if (menuGroups['root']) {
        menuGroups['root'].forEach((item, index) => {
          const subMenus = menuGroups[item.name] || [];
          if (subMenus.length > 0) {
            // Has sub-menus
            let subMenu = SpreadsheetApp.getUi().createMenu(item.name);
            subMenus.forEach(sub => {
              // Use a simple callback that captures the menu ID
              subMenu.addItem(sub.name, 'loadCustomMenu');
              // Store last selected menu for callback
              const scriptProperties = PropertiesService.getScriptProperties();
              scriptProperties.setProperty('lastMenuClicked_' + sub.name, sub.id);
            });
            menu.addSubMenu(subMenu);
          } else {
            // Direct menu item
            menu.addItem(item.name, 'loadCustomMenu');
            // Store menu ID for this menu name
            const scriptProperties = PropertiesService.getScriptProperties();
            scriptProperties.setProperty('lastMenuClicked_' + item.name, item.id);
          }
        });
      }
    } catch (e) {
      Logger.log('Error loading dynamic menus: ' + e.message);
    }
  }
}

// ============================================================================
// GLOBAL FORMATTING
// ============================================================================

/**
 * Apply global formatting to the active sheet
 */
function applyGlobalFormatting() {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // Set default font
  sheet.getDataRange().setFontFamily(FLUFFY_FONT);
  
  // Apply header if not present
  applyHeader(sheet);
}

/**
 * Apply header with brand logo and tagline
 */
function applyHeader(sheet) {
  // Check if first row is already a header
  const firstCell = sheet.getRange(1, 1);
  const value = firstCell.getValue();
  
  if (value !== BRAND_NAME) {
    // Insert 2 rows at top for header
    sheet.insertRowsBefore(1, 2);
    
    // Set header
    const headerRange = sheet.getRange(1, 1, 1, sheet.getMaxColumns());
    headerRange.merge();
    headerRange.setValue(BRAND_NAME);
    headerRange.setFontFamily(FLUFFY_FONT);
    headerRange.setFontSize(24);
    headerRange.setFontWeight('bold');
    headerRange.setHorizontalAlignment('center');
    headerRange.setVerticalAlignment('middle');
    headerRange.setBackground(RAINBOW_COLORS[0]);
    
    // Set tagline
    const taglineRange = sheet.getRange(2, 1, 1, sheet.getMaxColumns());
    taglineRange.merge();
    taglineRange.setValue(TAGLINE);
    taglineRange.setFontFamily(FLUFFY_FONT);
    taglineRange.setFontSize(12);
    taglineRange.setFontStyle('italic');
    taglineRange.setHorizontalAlignment('center');
    taglineRange.setVerticalAlignment('middle');
    taglineRange.setBackground(RAINBOW_COLORS[1]);
  }
}

/**
 * Apply footer to the sheet
 */
function applyFooter(sheet) {
  const lastRow = sheet.getMaxRows();
  const lastCol = sheet.getMaxColumns();
  
  // Set footer in bottom right
  const footerCell = sheet.getRange(lastRow, lastCol);
  footerCell.setValue(FOOTER_TEXT);
  footerCell.setFontFamily(FLUFFY_FONT);
  footerCell.setFontSize(8);
  footerCell.setFontStyle('italic');
  footerCell.setHorizontalAlignment('right');
  footerCell.setBackground(RAINBOW_COLORS[6]);
}

// ============================================================================
// ADMIN FUNCTIONS
// ============================================================================

/**
 * Check if current user is admin
 */
function isAdmin() {
  return Session.getActiveUser().getEmail() === ADMIN_EMAIL;
}

/**
 * Show dialog to add new menu
 */
function showAddMenuDialog() {
  if (!isAdmin()) {
    SpreadsheetApp.getUi().alert('Access Denied', 'Only admin can access this feature.', SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }
  
  const html = HtmlService.createHtmlOutputFromFile('AddMenuDialog')
    .setWidth(500)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, '➕ Add New Menu');
}

/**
 * Save new menu from admin dialog
 */
function saveNewMenu(menuData) {
  if (!isAdmin()) {
    return { success: false, message: 'Access Denied' };
  }
  
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const menusJson = scriptProperties.getProperty('customMenus') || '[]';
    const menus = JSON.parse(menusJson);
    
    // Generate unique ID
    const id = 'menu_' + new Date().getTime();
    
    // Add new menu
    menus.push({
      id: id,
      parent: menuData.parent,
      name: menuData.name,
      category: menuData.category,
      content: menuData.content,
      createdAt: new Date().toISOString()
    });
    
    // Save back
    scriptProperties.setProperty('customMenus', JSON.stringify(menus));
    
    // Create backup
    createBackup('Added menu: ' + menuData.name);
    
    return { success: true, message: 'Menu added successfully!' };
  } catch (e) {
    return { success: false, message: 'Error: ' + e.message };
  }
}

/**
 * Show settings dialog
 */
function showSettingsDialog() {
  if (!isAdmin()) {
    SpreadsheetApp.getUi().alert('Access Denied', 'Only admin can access this feature.', SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }
  
  const html = HtmlService.createHtmlOutputFromFile('SettingsDialog')
    .setWidth(600)
    .setHeight(700);
  SpreadsheetApp.getUi().showModalDialog(html, '⚙️ Settings');
}

/**
 * Get all custom menus
 */
function getAllMenus() {
  if (!isAdmin()) {
    return [];
  }
  
  const scriptProperties = PropertiesService.getScriptProperties();
  const menusJson = scriptProperties.getProperty('customMenus') || '[]';
  return JSON.parse(menusJson);
}

/**
 * Update menu
 */
function updateMenu(menuData) {
  if (!isAdmin()) {
    return { success: false, message: 'Access Denied' };
  }
  
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const menusJson = scriptProperties.getProperty('customMenus') || '[]';
    const menus = JSON.parse(menusJson);
    
    // Find and update menu
    const index = menus.findIndex(m => m.id === menuData.id);
    if (index !== -1) {
      menus[index] = { ...menus[index], ...menuData, updatedAt: new Date().toISOString() };
      scriptProperties.setProperty('customMenus', JSON.stringify(menus));
      
      // Create backup
      createBackup('Updated menu: ' + menuData.name);
      
      return { success: true, message: 'Menu updated successfully!' };
    } else {
      return { success: false, message: 'Menu not found' };
    }
  } catch (e) {
    return { success: false, message: 'Error: ' + e.message };
  }
}

/**
 * Delete menu
 */
function deleteMenu(menuId) {
  if (!isAdmin()) {
    return { success: false, message: 'Access Denied' };
  }
  
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const menusJson = scriptProperties.getProperty('customMenus') || '[]';
    let menus = JSON.parse(menusJson);
    
    const menu = menus.find(m => m.id === menuId);
    menus = menus.filter(m => m.id !== menuId);
    
    scriptProperties.setProperty('customMenus', JSON.stringify(menus));
    
    // Create backup
    createBackup('Deleted menu: ' + (menu ? menu.name : menuId));
    
    return { success: true, message: 'Menu deleted successfully!' };
  } catch (e) {
    return { success: false, message: 'Error: ' + e.message };
  }
}

/**
 * Show restore dialog
 */
function showRestoreDialog() {
  if (!isAdmin()) {
    SpreadsheetApp.getUi().alert('Access Denied', 'Only admin can access this feature.', SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }
  
  const html = HtmlService.createHtmlOutputFromFile('RestoreDialog')
    .setWidth(600)
    .setHeight(500);
  SpreadsheetApp.getUi().showModalDialog(html, '🔄 Restore');
}

/**
 * Create backup snapshot
 */
function createBackup(description) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const backupsJson = scriptProperties.getProperty('backups') || '[]';
  const backups = JSON.parse(backupsJson);
  
  // Get current state
  const menusJson = scriptProperties.getProperty('customMenus') || '[]';
  
  // Add backup
  backups.push({
    id: 'backup_' + new Date().getTime(),
    timestamp: new Date().toISOString(),
    description: description,
    data: menusJson
  });
  
  // Keep only last 50 backups
  if (backups.length > 50) {
    backups.shift();
  }
  
  scriptProperties.setProperty('backups', JSON.stringify(backups));
}

/**
 * Get all backups
 */
function getAllBackups() {
  if (!isAdmin()) {
    return [];
  }
  
  const scriptProperties = PropertiesService.getScriptProperties();
  const backupsJson = scriptProperties.getProperty('backups') || '[]';
  return JSON.parse(backupsJson);
}

/**
 * Restore from backup
 */
function restoreFromBackup(backupId) {
  if (!isAdmin()) {
    return { success: false, message: 'Access Denied' };
  }
  
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const backupsJson = scriptProperties.getProperty('backups') || '[]';
    const backups = JSON.parse(backupsJson);
    
    const backup = backups.find(b => b.id === backupId);
    if (backup) {
      scriptProperties.setProperty('customMenus', backup.data);
      return { success: true, message: 'Restored successfully!' };
    } else {
      return { success: false, message: 'Backup not found' };
    }
  } catch (e) {
    return { success: false, message: 'Error: ' + e.message };
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Fill in Blanks - Randomly delete 40% of content
 */
function fillInBlanks() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  // Skip header rows (first 2) and last row (footer)
  const startRow = 3;
  const endRow = values.length - 1;
  
  let cellsToBlank = [];
  
  for (let i = startRow; i < endRow; i++) {
    for (let j = 0; j < values[i].length; j++) {
      if (values[i][j] !== '') {
        // Random chance to blank based on configured percentage
        if (Math.random() < FILL_IN_BLANKS_PERCENTAGE) {
          cellsToBlank.push({ row: i + 1, col: j + 1 });
        }
      }
    }
  }
  
  // Apply blanks
  cellsToBlank.forEach(cell => {
    sheet.getRange(cell.row, cell.col).setValue('');
  });
  
  SpreadsheetApp.getUi().alert('Fill in Blanks', 'Removed 40% of content randomly!', SpreadsheetApp.getUi().ButtonSet.OK);
}

/**
 * Magic Shuffle - Randomly rearrange cell data
 */
function magicShuffle() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  // Skip header rows (first 2) and last row (footer)
  const startRow = 3;
  const endRow = values.length - 1;
  
  // Collect all non-empty values
  let allValues = [];
  for (let i = startRow; i < endRow; i++) {
    for (let j = 0; j < values[i].length; j++) {
      if (values[i][j] !== '') {
        allValues.push(values[i][j]);
      }
    }
  }
  
  // Shuffle array (Fisher-Yates algorithm)
  for (let i = allValues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allValues[i], allValues[j]] = [allValues[j], allValues[i]];
  }
  
  // Put back shuffled values
  let valueIndex = 0;
  for (let i = startRow; i < endRow; i++) {
    for (let j = 0; j < values[i].length; j++) {
      if (values[i][j] !== '') {
        if (valueIndex < allValues.length) {
          sheet.getRange(i + 1, j + 1).setValue(allValues[valueIndex]);
          valueIndex++;
        }
      }
    }
  }
  
  SpreadsheetApp.getUi().alert('Magic Shuffle', 'Data shuffled successfully!', SpreadsheetApp.getUi().ButtonSet.OK);
}

/**
 * Mosaic Coloring - Apply random light shades with matching text colors
 */
function mosaicColoring() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const dataRange = sheet.getDataRange();
  const numRows = dataRange.getNumRows();
  const numCols = dataRange.getNumColumns();
  
  // Skip header rows (first 2) and last row (footer)
  const startRow = 3;
  const endRow = numRows - 1;
  
  // Color mapping for text colors
  const colorMap = {
    '#FFE5E5': '#FF4444', // Light Pink -> Red
    '#FFE5CC': '#FF8800', // Light Orange -> Orange
    '#FFFFCC': '#CCCC00', // Light Yellow -> Dark Yellow
    '#E5FFCC': '#44AA44', // Light Green -> Green
    '#E5F5FF': '#4488FF', // Light Blue -> Blue
    '#E5E5FF': '#6644FF', // Light Indigo -> Indigo
    '#F5E5FF': '#AA44FF'  // Light Violet -> Violet
  };
  
  for (let i = startRow; i <= endRow; i++) {
    for (let j = 1; j <= numCols; j++) {
      const cell = sheet.getRange(i, j);
      if (cell.getValue() !== '') {
        // Random color from rainbow
        const bgColor = RAINBOW_COLORS[Math.floor(Math.random() * RAINBOW_COLORS.length)];
        const textColor = colorMap[bgColor];
        
        cell.setBackground(bgColor);
        cell.setFontColor(textColor);
        
        // Match border color
        cell.setBorder(true, true, true, true, false, false, textColor, SpreadsheetApp.BorderStyle.SOLID);
      }
    }
  }
  
  SpreadsheetApp.getUi().alert('Mosaic Coloring', 'Applied colorful mosaic pattern!', SpreadsheetApp.getUi().ButtonSet.OK);
}

/**
 * Show share dialog
 */
function showShareDialog() {
  const html = HtmlService.createHtmlOutputFromFile('ShareDialog')
    .setWidth(500)
    .setHeight(400);
  SpreadsheetApp.getUi().showModalDialog(html, '📤 Share');
}

/**
 * Generate shareable link
 */
function generateShareLink(format) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const url = ss.getUrl();
  
  let shareUrl = '';
  
  switch (format) {
    case 'pdf':
      shareUrl = url.replace('/edit', '/export?format=pdf&gid=' + sheet.getSheetId());
      break;
    case 'excel':
      shareUrl = url.replace('/edit', '/export?format=xlsx&gid=' + sheet.getSheetId());
      break;
    case 'jpeg':
      shareUrl = url.replace('/edit', '/export?format=png&gid=' + sheet.getSheetId());
      break;
    default:
      shareUrl = url;
  }
  
  return { url: shareUrl, sheetName: sheet.getName() };
}

/**
 * Add more content from database
 */
function addMoreContent() {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // Check if there's more content available
  const scriptProperties = PropertiesService.getScriptProperties();
  const contentJson = scriptProperties.getProperty('additionalContent');
  
  if (contentJson) {
    try {
      const content = JSON.parse(contentJson);
      if (content && content.length > 0) {
        const lastRow = sheet.getLastRow();
        
        // Append content
        content.forEach((row, index) => {
          sheet.getRange(lastRow + index + 1, 1, 1, row.length).setValues([row]);
        });
        
        // Apply formatting
        applyFooter(sheet);
        
        SpreadsheetApp.getUi().alert('Add More Content', 'Added ' + content.length + ' rows of content!', SpreadsheetApp.getUi().ButtonSet.OK);
      } else {
        SpreadsheetApp.getUi().alert('Add More Content', 'No more content available.', SpreadsheetApp.getUi().ButtonSet.OK);
      }
    } catch (e) {
      SpreadsheetApp.getUi().alert('Error', 'Error loading content: ' + e.message, SpreadsheetApp.getUi().ButtonSet.OK);
    }
  } else {
    SpreadsheetApp.getUi().alert('Add More Content', 'No more content available in database.', SpreadsheetApp.getUi().ButtonSet.OK);
  }
}

// ============================================================================
// PAGE LAYOUT FUNCTIONS
// ============================================================================

/**
 * Show page setup dialog
 */
function showPageSetupDialog() {
  const html = HtmlService.createHtmlOutputFromFile('PageSetupDialog')
    .setWidth(400)
    .setHeight(500);
  SpreadsheetApp.getUi().showModalDialog(html, '📄 Page Setup');
}

/**
 * Apply page settings
 */
function applyPageSettings(settings) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Note: Google Sheets API doesn't directly support setting page size via Apps Script
    // These settings are typically set through the UI: File > Page Setup
    // We'll inform the user about the manual steps
    
    let message = 'Page settings configuration:\n\n';
    message += 'Page Size: ' + settings.pageSize + '\n';
    message += 'Orientation: ' + settings.orientation + '\n\n';
    message += 'To apply these settings:\n';
    message += '1. Go to File → Page Setup\n';
    message += '2. Set paper size to ' + settings.pageSize + '\n';
    message += '3. Set orientation to ' + settings.orientation + '\n';
    
    // We can set some print settings that are available
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Set print gridlines off for cleaner output
    sheet.setPrintGridlines(false);
    
    // Show helpful message
    SpreadsheetApp.getUi().alert('Page Setup', message, SpreadsheetApp.getUi().ButtonSet.OK);
    
    return { success: true, message: 'Page setup instructions displayed!' };
  } catch (e) {
    return { success: false, message: 'Error: ' + e.message };
  }
}

/**
 * Adjust columns
 */
function adjustColumns() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const numCols = sheet.getMaxColumns();
  
  // Auto-resize all columns
  for (let i = 1; i <= numCols; i++) {
    sheet.autoResizeColumn(i);
  }
  
  SpreadsheetApp.getUi().alert('Adjust Columns', 'All columns auto-resized!', SpreadsheetApp.getUi().ButtonSet.OK);
}

/**
 * Adjust rows
 */
function adjustRows() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const numRows = sheet.getMaxRows();
  
  // Set consistent row height (excluding header/footer)
  for (let i = 3; i < numRows; i++) {
    sheet.setRowHeight(i, 21);
  }
  
  SpreadsheetApp.getUi().alert('Adjust Rows', 'Row heights adjusted!', SpreadsheetApp.getUi().ButtonSet.OK);
}

/**
 * Set print area
 */
function setPrintArea() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  
  // Set print area to data range
  sheet.getRange(1, 1, lastRow, lastCol).activate();
  
  SpreadsheetApp.getUi().alert('Set Print Area', 'Print area set to current data range!', SpreadsheetApp.getUi().ButtonSet.OK);
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get rainbow color by index
 */
function getRainbowColor(index) {
  return RAINBOW_COLORS[index % RAINBOW_COLORS.length];
}

/**
 * Load custom menu content
 * Called when a custom menu item is clicked
 */
function loadCustomMenu() {
  // Get the menu that was clicked by checking properties
  // This is a workaround for Apps Script's limitation on dynamic function names
  const scriptProperties = PropertiesService.getScriptProperties();
  const menusJson = scriptProperties.getProperty('customMenus') || '[]';
  const menus = JSON.parse(menusJson);
  
  // Show selection dialog since we can't determine which specific menu was clicked
  if (menus.length === 0) {
    SpreadsheetApp.getUi().alert('No Menus', 'No custom menus found. Admin needs to add menus first.', SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }
  
  // Create a selection list
  const ui = SpreadsheetApp.getUi();
  let menuList = 'Available Menus:\n\n';
  menus.forEach((m, i) => {
    menuList += (i + 1) + '. ' + m.name + ' (' + m.category + ')\n';
  });
  menuList += '\nEnter the number of the menu you want to load:';
  
  const response = ui.prompt('Load Custom Menu', menuList, ui.ButtonSet.OK_CANCEL);
  
  if (response.getSelectedButton() === ui.Button.OK) {
    const index = parseInt(response.getResponseText()) - 1;
    if (index >= 0 && index < menus.length) {
      executeCustomMenu(menus[index].id);
    } else {
      ui.alert('Invalid Selection', 'Please enter a valid menu number.', ui.ButtonSet.OK);
    }
  }
}

/**
 * Execute custom menu
 * This function is called with menu ID
 */
function executeCustomMenu(menuId) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const menusJson = scriptProperties.getProperty('customMenus') || '[]';
  const menus = JSON.parse(menusJson);
  
  const menu = menus.find(m => m.id === menuId);
  
  if (menu) {
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Process based on category
    switch (menu.category) {
      case 'words':
      case 'numbers':
      case 'tables':
        // Insert content as table
        insertContentAsTable(sheet, menu.content);
        break;
      case 'pictures':
        // Handle image content
        insertImageContent(sheet, menu.content);
        break;
      default:
        // Default: insert as text
        insertContentAsText(sheet, menu.content);
    }
    
    // Apply formatting
    applyGlobalFormatting();
    applyFooter(sheet);
  }
}

/**
 * Validate content rows for insertion
 */
function isValidContentRows(rows) {
  return rows && rows.length > 0 && rows[0] && rows[0].length > 0;
}

/**
 * Insert content as table
 */
function insertContentAsTable(sheet, content) {
  try {
    // Parse content as array
    const rows = content.split('\n').map(row => row.split('\t'));
    const startRow = 3; // After header
    
    // Validate rows exist and have content
    if (!isValidContentRows(rows)) {
      Logger.log('No valid content to insert');
      SpreadsheetApp.getUi().alert('Error', 'No valid content to insert. Please check the content format.', SpreadsheetApp.getUi().ButtonSet.OK);
      return;
    }
    
    // Clear existing content (preserve header)
    const lastRow = sheet.getLastRow();
    if (lastRow > 2) {
      sheet.getRange(3, 1, lastRow - 2, sheet.getMaxColumns()).clear();
    }
    
    // Insert content
    sheet.getRange(startRow, 1, rows.length, rows[0].length).setValues(rows);
  } catch (e) {
    Logger.log('Error inserting table: ' + e.message);
  }
}

/**
 * Insert image content
 */
function insertImageContent(sheet, content) {
  try {
    // Content should be image URL
    const startRow = 3;
    sheet.getRange(startRow, 1).setValue('Image: ' + content);
    // Note: Actual image insertion requires URL validation
  } catch (e) {
    Logger.log('Error inserting image: ' + e.message);
  }
}

/**
 * Insert content as text
 */
function insertContentAsText(sheet, content) {
  try {
    const startRow = 3;
    
    // Clear existing content (preserve header)
    const lastRow = sheet.getLastRow();
    if (lastRow > 2) {
      sheet.getRange(3, 1, lastRow - 2, sheet.getMaxColumns()).clear();
    }
    
    // Insert content
    sheet.getRange(startRow, 1).setValue(content);
  } catch (e) {
    Logger.log('Error inserting text: ' + e.message);
  }
}
