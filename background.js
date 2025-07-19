// Background Service Worker for Test String Generator Extension

// Handle extension installation and updates
if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
      console.log('Test String Generator extension installed');
      
      // Set default settings
      chrome.storage.sync.set({
        theme: 'light',
        language: 'en'
      }).catch(err => {
        console.warn('Failed to set default settings:', err);
      });
    } else if (details.reason === 'update') {
      console.log('Test String Generator extension updated');
      
      // Handle version migration if needed
      handleVersionUpdate(details.previousVersion);
      
      // Show update notification
      showUpdateNotification();
    }
  });
}

// Handle extension startup
if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.onStartup.addListener(() => {
    console.log('Test String Generator extension started');
  });

  // Handle messages from content scripts or popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Handle any background tasks if needed in the future
    console.log('Background received message:', request);
    
    // Always respond to keep the message channel open
    sendResponse({ status: 'received' });
    
    return true; // Keep message channel open for async operations
  });

  // Handle external connections
  chrome.runtime.onConnect.addListener((port) => {
    if (port.name === 'popup') {
      console.log('Popup connected');
      
      port.onDisconnect.addListener(() => {
        console.log('Popup disconnected');
      });
    }
  });
}

// Handle context menu creation (if needed in future)
// chrome.contextMenus.create({
//   id: 'generate-test-string',
//   title: 'Generate Test String',
//   contexts: ['editable']
// });

// Keep service worker alive by periodically performing tasks
if (typeof chrome !== 'undefined' && chrome.storage) {
  const keepAlive = () => {
    // Perform a lightweight operation
    chrome.storage.local.set({ lastHeartbeat: Date.now() });
  };

  // Set up heartbeat every 20 seconds
  setInterval(keepAlive, 20000);
}

// Update handling functions
function handleVersionUpdate(previousVersion) {
  const currentVersion = chrome.runtime.getManifest().version;
  console.log(`Updated from ${previousVersion} to ${currentVersion}`);
  
  // Handle data migration between versions if needed
  if (previousVersion && chrome.storage) {
    migrateDataIfNeeded(previousVersion, currentVersion);
  }
}

function showUpdateNotification() {
  // Create a notification for the update
  if (chrome.notifications) {
    chrome.notifications.create('update-notification', {
      type: 'basic',
      iconUrl: 'assets/icon48.png',
      title: 'Test String Generator Updated!',
      message: 'New features and improvements are now available.'
    });
  }
}

function migrateDataIfNeeded(previousVersion, currentVersion) {
  // Example: Migrate old settings format to new format
  chrome.storage.sync.get(null).then(data => {
    let needsMigration = false;
    
    // Add migration logic here based on version comparisons
    if (compareVersions(previousVersion, '1.1.0') < 0) {
      // Migrate to v1.1.0 format if needed
      console.log('Migrating to v1.1.0 format...');
      needsMigration = true;
    }
    
    if (needsMigration) {
      chrome.storage.sync.set(data).then(() => {
        console.log('Data migration completed');
      });
    }
  }).catch(err => {
    console.warn('Migration failed:', err);
  });
}

function compareVersions(version1, version2) {
  const v1parts = version1.split('.').map(Number);
  const v2parts = version2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
    const v1part = v1parts[i] || 0;
    const v2part = v2parts[i] || 0;
    
    if (v1part < v2part) return -1;
    if (v1part > v2part) return 1;
  }
  
  return 0;
}

// Check for updates periodically (optional)
function checkForUpdates() {
  if (chrome.runtime.requestUpdateCheck) {
    chrome.runtime.requestUpdateCheck((status, details) => {
      if (status === 'update_available') {
        console.log('Update available:', details);
        // Optionally restart to apply update immediately
        // chrome.runtime.reload();
      }
    });
  }
}

// Set up periodic update checks (every 24 hours)
setInterval(checkForUpdates, 24 * 60 * 60 * 1000);

console.log('Test String Generator background script loaded');
