const CACHE_NAME = 'deacons-school-v2.0';
const STATIC_CACHE = 'deacons-static-v2.0';
const DYNAMIC_CACHE = 'deacons-dynamic-v2.0';

// Files to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/logo.jpg',
  '/browserconfig.xml'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Error caching static assets', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (!url.origin.includes(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache', request.url);
          return cachedResponse;
        }

        // Fetch from network and cache dynamic content
        return fetch(request)
          .then((networkResponse) => {
            // Don't cache if not a valid response
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clone the response
            const responseToCache = networkResponse.clone();

            // Cache dynamic content
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                console.log('Service Worker: Caching dynamic content', request.url);
                cache.put(request, responseToCache);
              });

            return networkResponse;
          })
          .catch((error) => {
            console.error('Service Worker: Fetch failed', error);
            
            // Return offline page for navigation requests
            if (request.destination === 'document') {
              return caches.match('/');
            }
            
            throw error;
          });
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'attendance-sync') {
    event.waitUntil(syncAttendanceData());
  }
  
  if (event.tag === 'records-sync') {
    event.waitUntil(syncRecordsData());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received');
  
  const options = {
    body: event.data ? event.data.text() : 'إشعار جديد من مدرسة الشمامسة',
    icon: '/logo.jpg',
    badge: '/logo.jpg',
    vibrate: [200, 100, 200],
    dir: 'rtl',
    lang: 'ar',
    tag: 'deacons-notification',
    requireInteraction: true,
    actions: [
      {
        action: 'view',
        title: 'عرض',
        icon: '/logo.jpg'
      },
      {
        action: 'dismiss',
        title: 'إغلاق',
        icon: '/logo.jpg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('مدرسة الشمامسة', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked', event.action);
  
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper functions for background sync
async function syncAttendanceData() {
  try {
    // Sync offline attendance data
    const offlineData = await getOfflineAttendanceData();
    if (offlineData.length > 0) {
      await uploadAttendanceData(offlineData);
      await clearOfflineAttendanceData();
    }
  } catch (error) {
    console.error('Failed to sync attendance data:', error);
  }
}

async function syncRecordsData() {
  try {
    // Sync offline records data
    const offlineRecords = await getOfflineRecordsData();
    if (offlineRecords.length > 0) {
      await uploadRecordsData(offlineRecords);
      await clearOfflineRecordsData();
    }
  } catch (error) {
    console.error('Failed to sync records data:', error);
  }
}

// Placeholder functions for offline data management
async function getOfflineAttendanceData() {
  // Implementation would retrieve data from IndexedDB
  return [];
}

async function uploadAttendanceData(data) {
  // Implementation would upload to server
  console.log('Uploading attendance data:', data);
}

async function clearOfflineAttendanceData() {
  // Implementation would clear IndexedDB
  console.log('Clearing offline attendance data');
}

async function getOfflineRecordsData() {
  // Implementation would retrieve data from IndexedDB
  return [];
}

async function uploadRecordsData(data) {
  // Implementation would upload to server
  console.log('Uploading records data:', data);
}

async function clearOfflineRecordsData() {
  // Implementation would clear IndexedDB
  console.log('Clearing offline records data');
}