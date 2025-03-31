class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.storage =
      localStorage.getItem("fitapp_remember") === "true"
        ? localStorage
        : sessionStorage;
    this.token = this.storage.getItem("token");
    this.refreshToken = this.storage.getItem("refreshToken");
    this.refreshingPromise = null;
    this.loginInProgress = false;
  }

  updateStorage() {
    const newStorage =
      localStorage.getItem("fitapp_remember") === "true"
        ? localStorage
        : sessionStorage;

    if (this.storage !== newStorage) {
      this.storage = newStorage;
      this.token = this.storage.getItem("token");
      this.refreshToken = this.storage.getItem("refreshToken");
    }
  }

  async refreshToken() {
    if (this.refreshingPromise) {
      return this.refreshingPromise;
    }

    if (!this.refreshToken) {
      return Promise.resolve(false);
    }

    console.log("Refreshing access token...");

    this.refreshingPromise = (async () => {
      try {
        const response = await fetch(`${this.baseURL}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken: this.refreshToken }),
        });

        if (!response.ok) {
          throw new Error(`Token refresh failed: ${response.status}`);
        }

        const data = await response.json();
        this.token = data.accessToken;
        this.storage.setItem("token", data.accessToken);
        return true;
      } catch (error) {
        console.error("Token refresh failed:", error);
        this.token = null;
        this.storage.removeItem("token");
        return false;
      } finally {
        this.refreshingPromise = null;
      }
    })();

    return this.refreshingPromise;
  }

  async request(method, endpoint, data = null) {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (this.token) {
      options.headers.Authorization = `Bearer ${this.token}`;
    }

    if (data && (method === "POST" || method === "PUT")) {
      options.body = JSON.stringify(data);
    }

    if (endpoint === "/auth/login") {
      this.loginInProgress = true;
    }

    try {
      console.log(`API Request: ${method} ${this.baseURL}${endpoint}`);
      let response = await fetch(`${this.baseURL}${endpoint}`, options);

      if (
        response.status === 401 &&
        this.refreshToken &&
        !this.loginInProgress
      ) {
        const refreshed = await this.refreshToken();

        if (refreshed) {
          options.headers.Authorization = `Bearer ${this.token}`;
          response = await fetch(`${this.baseURL}${endpoint}`, options);
        }
      }

      if (endpoint === "/auth/login") {
        this.loginInProgress = false;
      }

      console.log(`API Response: ${response.status} ${response.statusText}`);
      return response;
    } catch (error) {
      if (endpoint === "/auth/login") {
        this.loginInProgress = false;
      }
      console.error(`API request failed:`, error);
      throw error;
    }
  }

  setTokens(accessToken, refreshToken) {
    this.token = accessToken;
    if (refreshToken) {
      this.refreshToken = refreshToken;
    }

    if (accessToken) {
      this.storage.setItem("token", accessToken);
    }

    if (refreshToken) {
      this.storage.setItem("refreshToken", refreshToken);
    }
  }

  clearTokens() {
    this.storage.removeItem("token");
    this.storage.removeItem("refreshToken");
    this.token = null;
    this.refreshToken = null;
  }

  async get(endpoint) {
    return this.request("GET", endpoint);
  }

  async post(endpoint, data) {
    return this.request("POST", endpoint, data);
  }

  async put(endpoint, data) {
    return this.request("PUT", endpoint, data);
  }

  async delete(endpoint) {
    return this.request("DELETE", endpoint);
  }
}

const apiClient = new ApiClient(import.meta.env.VITE_API_URL);
export default apiClient;
