import config from '../config/config';

/**
 * Authentication service for login, logout, and token management
 */
const authService = {
  /**
   * Get stored token
   * @returns {string|null} - The stored token or null
   */
  getToken: () => {
    return localStorage.getItem(config.auth.tokenKey);
  },

  /**
   * Store auth token
   * @param {string} token - The token to store
   */
  setToken: (token) => {
    localStorage.setItem(config.auth.tokenKey, token);
  },

  /**
   * Get stored user
   * @returns {object|null} - The stored user or null
   */
  getUser: () => {
    const userData = localStorage.getItem(config.auth.userKey);
    return userData ? JSON.parse(userData) : null;
  },

  /**
   * Store user data
   * @param {object} user - The user data to store
   */
  setUser: (user) => {
    localStorage.setItem(config.auth.userKey, JSON.stringify(user));
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} - Whether user is authenticated
   */
  isAuthenticated: () => {
    return !!authService.getToken();
  },

  /**
   * Log in a user
   * @param {object} credentials - The user credentials
   * @returns {Promise<object>} - The response data
   */
  login: async (credentials) => {
    try {
      // Accept either email or phone for login
      let loginPayload = {};
      if (credentials.emailOrPhone) {
        if (/^\d{10}$/.test(credentials.emailOrPhone)) {
          // Phone login not supported by backend, fallback to email
          loginPayload.email = credentials.emailOrPhone;
        } else {
          loginPayload.email = credentials.emailOrPhone;
        }
      } else {
        loginPayload.email = credentials.email;
      }
      loginPayload.password = credentials.password;

      const response = await fetch(`${config.apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginPayload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      const data = await response.json();
      authService.setToken(data.token);
      authService.setUser(data.user);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Register a new user
   * @param {object} userData - The user data to register
   * @returns {Promise<object>} - The response data
   */
  register: async (userData) => {
    try {
      const payload = {
        username: userData.name || userData.username,
        email: userData.email,
        password: userData.password,
        phone: userData.phoneNumber || userData.phone,
      };
      const response = await fetch(`${config.apiBaseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  /**
   * Get current user
   * @returns {Promise<object>} - The current user
   */
  getCurrentUser: async () => {
    try {
      const token = authService.getToken();
      if (!token) throw new Error('No token');
      const response = await fetch(`${config.apiBaseUrl}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
      const user = await response.json();
      authService.setUser(user);
      return user;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  /**
   * Log out a user
   */
  logout: () => {
    localStorage.removeItem(config.auth.tokenKey);
    localStorage.removeItem(config.auth.userKey);
    // Redirect to login page or refresh
    window.location.href = '/';
  },
};

export default authService; 