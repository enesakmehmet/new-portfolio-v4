const CACHE_NAME = 'portfolio-cache-v1';
const API_CACHE_NAME = 'api-cache-v1';
const STATIC_CACHE_NAME = 'static-cache-v1';

// Cache durations
const CACHE_DURATIONS = {
  api: 24 * 60 * 60 * 1000, // 24 hours
  static: 7 * 24 * 60 * 60 * 1000, // 7 days
  images: 30 * 24 * 60 * 60 * 1000, // 30 days
};

export const cacheService = {
  async cacheData(key, data, type = 'api') {
    try {
      const cache = await caches.open(CACHE_NAME);
      const expiry = Date.now() + CACHE_DURATIONS[type];
      const cacheData = {
        data,
        expiry,
        type,
      };
      await cache.put(key, new Response(JSON.stringify(cacheData)));
      return true;
    } catch (error) {
      console.error('Cache error:', error);
      return false;
    }
  },

  async getCachedData(key) {
    try {
      const cache = await caches.open(CACHE_NAME);
      const response = await cache.match(key);
      
      if (!response) return null;

      const data = await response.json();
      
      if (Date.now() > data.expiry) {
        await cache.delete(key);
        return null;
      }

      return data.data;
    } catch (error) {
      console.error('Cache retrieval error:', error);
      return null;
    }
  },

  async cacheRoute(route, response) {
    try {
      const cache = await caches.open(STATIC_CACHE_NAME);
      await cache.put(route, response);
      return true;
    } catch (error) {
      console.error('Route cache error:', error);
      return false;
    }
  },

  async clearCache(type) {
    try {
      if (type === 'api') {
        await caches.delete(API_CACHE_NAME);
      } else if (type === 'static') {
        await caches.delete(STATIC_CACHE_NAME);
      } else {
        await caches.delete(CACHE_NAME);
        await caches.delete(API_CACHE_NAME);
        await caches.delete(STATIC_CACHE_NAME);
      }
      return true;
    } catch (error) {
      console.error('Cache clear error:', error);
      return false;
    }
  },

  async prefetchRoutes(routes) {
    try {
      const cache = await caches.open(STATIC_CACHE_NAME);
      const promises = routes.map(route => 
        fetch(route)
          .then(response => cache.put(route, response))
          .catch(error => console.error(`Failed to prefetch ${route}:`, error))
      );
      await Promise.all(promises);
      return true;
    } catch (error) {
      console.error('Prefetch error:', error);
      return false;
    }
  },

  async cacheImages(imageUrls) {
    try {
      const cache = await caches.open(CACHE_NAME);
      const promises = imageUrls.map(url =>
        fetch(url)
          .then(response => cache.put(url, response))
          .catch(error => console.error(`Failed to cache image ${url}:`, error))
      );
      await Promise.all(promises);
      return true;
    } catch (error) {
      console.error('Image cache error:', error);
      return false;
    }
  }
};

// Service Worker Registration
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      console.log('ServiceWorker registration successful');
      return registration;
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
      return null;
    }
  }
  return null;
};
