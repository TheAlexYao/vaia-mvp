# Capx Auth Docs

# **Creating a Bot on Telegram 🤖**

To get started with integrating Telegram into your web app, we first need to create a bot using **BotFather** on Telegram. A Telegram bot acts as a bridge between your users and your services, allowing for user interaction and automation. Follow these steps to create your bot:

**1**

**Search for @BotFather** on Telegram

BotFather is the official bot used to create and manage all your other bots on Telegram.

**2**

Type `/start` in the chat to begin the process.

[https://capx-ai.gitbook.io/~gitbook/image?url=https%3A%2F%2F32969131-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FoDD9FrClzJzhXvCQOvfP%252Fuploads%252FIGh6Ks8w45xNbsqYxNqy%252FScreenshot%25202024-12-20%2520at%25206.42.09%25E2%2580%25AFAM.png%3Falt%3Dmedia%26token%3D9090311a-9fb6-4761-8cdc-cc65fc75bd69&width=768&dpr=4&quality=100&sign=b1b2a907&sv=2](https://capx-ai.gitbook.io/~gitbook/image?url=https%3A%2F%2F32969131-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FoDD9FrClzJzhXvCQOvfP%252Fuploads%252FIGh6Ks8w45xNbsqYxNqy%252FScreenshot%25202024-12-20%2520at%25206.42.09%25E2%2580%25AFAM.png%3Falt%3Dmedia%26token%3D9090311a-9fb6-4761-8cdc-cc65fc75bd69&width=768&dpr=4&quality=100&sign=b1b2a907&sv=2)

**3**

Next, click on **/newbot** to create a new bot.

**4**

The bot will ask you to provide a **name** for your bot. This can be anything you like (e.g., “My Awesome Bot”).

**5**

After that, you will be asked for a **username** for the bot.

This username must be unique and must end with the suffix **'bot'** (e.g., `awesomebot` or `mytestbot`).

[https://capx-ai.gitbook.io/~gitbook/image?url=https%3A%2F%2F32969131-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FoDD9FrClzJzhXvCQOvfP%252Fuploads%252FtQ8VD8pOV7YaqTvGUlyn%252FScreenshot%25202024-12-20%2520at%25206.54.50%25E2%2580%25AFAM.png%3Falt%3Dmedia%26token%3D71aebd35-c935-4240-8aa5-ffd73f8cec09&width=768&dpr=4&quality=100&sign=6c653297&sv=2](https://capx-ai.gitbook.io/~gitbook/image?url=https%3A%2F%2F32969131-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FoDD9FrClzJzhXvCQOvfP%252Fuploads%252FtQ8VD8pOV7YaqTvGUlyn%252FScreenshot%25202024-12-20%2520at%25206.54.50%25E2%2580%25AFAM.png%3Falt%3Dmedia%26token%3D71aebd35-c935-4240-8aa5-ffd73f8cec09&width=768&dpr=4&quality=100&sign=6c653297&sv=2)

**6**

Once you’ve entered the name and username, you’ll receive a **bot token**. This token is essential, as it allows your app to connect with the Telegram API and authenticate users via the bot.

> Important: Make sure to keep the bot token secure. This token will be required for future steps to configure the bot and set up user verification.
> 
> 
> ***Once you have your bot created and the token in hand, you can move on to integrating it with your web app.***
> 

### **Converting Web App into a Telegram Mini App 🔂**

1. [**Getting Started**](https://capx-ai.gitbook.io/capxauth/getting-started)

In this section, we will convert your website into a Telegram Mini App, which allows users to interact with your app directly from the Telegram interface.

**1**

### **Ensure Mobile Responsiveness**

Before proceeding, make sure your website is **mobile responsive**, as Telegram Mini Apps are mainly accessed on mobile devices.

**2**

### **Set Up Your Bot to Respond**

Your bot will not respond automatically, so we need to configure it.

**3**

### **Install Required Dependencies**

In your frontend code, open the terminal and install the following dependencies:

Copy

```
npm install @privy-io/react-auth @telegram-apps/sdk-react axios ethers js-cookie viem
```

**4**

### **Push Code to GitHub and Host**

Push your code to **GitHub** and host it on a platform like **Vercel** or **Netlify**.

**5**

### **Create the bot.js File**

Create a **bot.js** file with this code:

Copy

```
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const TELEGRAM_API_URL = 'https://api.telegram.org/botYOUR_BOT_TOKEN_HERE';
const WEB_APP_URL = 'https://your-web-app-url.app/';

app.post('/api/bot', async (req, res) => {
    const message = req.body.message;
    if (message && message.text === "/start") {
        const responseText = '*Welcome to Your Amazing Bot!* \nGet ready to explore our bot!';
        try {
            const inlineKeyboardMarkup = {
                inline_keyboard: [[{ text: "Start Now!", web_app: { url: `${WEB_APP_URL}?startapp=fullscreen` } }]]
            };
            await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
                chat_id: message.chat.id,
                text: responseText,
                parse_mode: 'Markdown',
                reply_markup: JSON.stringify(inlineKeyboardMarkup)
            });
            res.status(200).send('Command processed');
        } catch (error) {
            res.status(500).send('Error processing command');
        }
    } else {
        res.status(200).send('No command processed');
    }
});

module.exports = app;
```

**Replace the placeholders:**

- `YOUR_BOT_TOKEN_HERE` → Your bot token.
- `https://your-web-app-url.app/` → Your web app URL.

**6**

### **Install Dependencies and Push Code**

Run the command:

Copy

```
npm install
```

Push your updated code to **GitHub** and host it.

**7**

Update the Webhook

Update the webhook in **Postman**:

[https://api.telegram.org/bot<bot_token>/setWebhook?url=<WEBHOOK_URL>](https://api.telegram.org/bot%3Cbot_token%3E/setWebhook?url=%3CWEBHOOK_URL%3E)

- Replace `<WEBHOOK_URL>` with your hosted `bot.js` URL and `/bot` at the end.
- Replace `<bot_token>` with your bot token.

Click **Send** to update the webhook.

**8**

Test the Bot

Open your **Telegram bot**, type `/start`, and your bot should show the welcome message with a button to open your web app.

Your Telegram Mini App is now ready!

# **How to Integrate Capx Auth 🔗**

Integrating Capx authentication into your Telegram Mini App involves setting up both the frontend and backend. Follow these steps:

## ***Frontend Setup***

**1**

**Install the Required Package** Add the following dependency to your `package.json` file:

Copy

```
"@telegram-apps/sdk-react": "^1.1.3"
```

**2**

**Install Dependencies** Run the following command in your terminal:

Copy

```
npm install
```

**3**

**Update Your App.jsx** Open your `App.jsx` file and modify it as follows:

Add this line inside the `App()` function to retrieve the Telegram `initDataRaw`:

Copy

```
const initDataRaw = useLaunchParams()?.initDataRaw;
```

In the `return` function, add this code to display the data:

Copy

```
<div>{initDataRaw}</div>
```

**4**

**Test the Frontend** Reload the application. If everything is set up correctly, you should see a query string on the screen.

If the query is not displayed, double-check the implementation and resolve any errors.

## ***Backend Setup***

**1**

**Set Up the `verifyController.js`**

In the backend, create a folder named `Controllers` and add a file called `verifyController.js`. This file will handle user integrity verification.

**2**

**Add the Following Code**

Copy the following code into your `verifyController.js` file:

Copy

```
import { createHmac } from 'crypto';

// POST handler for /api/verify
export const verifyInitData = async (req, res) => {
  try {
    const { initData } = req.body; // Parse the request body
    const BOT_TOKEN = process.env.BOT_TOKEN;

    // Parse initData and generate a hash to compare
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');

    urlParams.delete('hash');
    urlParams.sort();
    let dataCheckString = '';
    for (const [key, value] of urlParams.entries()) {
      dataCheckString += `${key}=${value}\n`;
    }
    dataCheckString = dataCheckString.slice(0, -1);

    // First hash check
    const secret = createHmac('sha256', 'WebAppData').update(BOT_TOKEN);
    const calculatedHash = createHmac('sha256', secret.digest())
      .update(dataCheckString)
      .digest('hex');

    if (hash !== calculatedHash) {
      return res.status(401).json({
        success: false,
        message: 'Invalid InitData',
      });
    }

    // Second hash generation for additional verification
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    urlParams.append('client_id', clientId);
    urlParams.sort();

    dataCheckString = '';
    for (const [key, value] of urlParams.entries()) {
      dataCheckString += `${key}=${value}\n`;
    }
    dataCheckString = dataCheckString.slice(0, -1);

    const centralSecret = createHmac('sha256', 'WebAppData').update(clientSecret);
    const centralHash = createHmac('sha256', centralSecret.digest())
      .update(dataCheckString)
      .digest('hex');
    urlParams.append('hash', centralHash);

    // Return the result
    return res.json({
      success: true,
      initData: urlParams.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

```

**3**

**Environment Variables**

Make sure to set up the following environment variables in your `.env` file:

Copy

```
BOT_TOKEN: Your Telegram bot token.
CLIENT_ID: Your client ID for the app.
CLIENT_SECRET: Your client secret.
```

This integration ensures secure communication between your Telegram Mini App and your web app.

# **Capx Auth Authentication Frontend Setup 🚀**

To integrate Capx Auth authentication, follow these steps:

## **Backend Setup 🛠️**

**1**

**Create a `.env` file** in your backend and add the following:

Copy

```
CLIENT_ID =
CLIENT_SECRET =
BOT_TOKEN = "Your-bot-token"
```

**2**

For `CLIENT_ID` and `CLIENT_SECRET`, reach out to Divya, Swaresh, or Devanshu from Capx.

**Note**: Ensure these variables are only in the backend for security reasons.

## **Frontend Setup 🛠️**

**1**

**Clean up App.jsx:**

Remove the following lines from `App.jsx` as they were for testing purposes:

Copy

```
const initDataRaw = useLaunchParams()?.initDataRaw;
<div>{initDataRaw}</div›
```

**2**

**Create a Context Folder:**

- Inside the `src` folder, create a folder named `context`.
- Create a file named `UserAuthContext.jsx` in it.
- Add this code to `UserAuthContext.jsx:`

Copy

```
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import axios from "axios";
import Cookies from "js-cookie";
import api from "../api";
import { setTokenCookies } from "../utils";

const UserDetailsContext = createContext();

const UserAuthContext = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [txDetails, setTxDetails] = useState({});

  const initDataRaw = useLaunchParams()?.initDataRaw;

  const createUser = useCallback(async (initData) => {
    const { data: userInfo } = await api.post(
      "/users/auth",
      {},
      {
        headers: {
          "x-initdata": initData,
        },
      }
    );
    setTokenCookies(
      userInfo?.result.access_token,
      userInfo?.result.refresh_token
    );

    setUserDetails(userInfo?.result?.user);
    setIsUserCreated(true);
    setTxDetails(userInfo?.result?.signup_tx || {});
  }, []);

  const getUserDetails = useCallback(async () => {
    const { data: userInfo } = await api.get("/users");
    setUserDetails(userInfo?.result?.user);
    setIsUserCreated(true);
    setTxDetails(userInfo?.result?.signup_tx || {});
  }, []);

  useEffect(() => {
    (async () => {
      if (initDataRaw) {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_VERIFY_API_ENDPOINT}/verify`,
            {
              initData: initDataRaw,
            }
          );
          const refresh_token = Cookies.get("refresh_token");
          if (!refresh_token) {
            await createUser(data.initData);
          } else {
            await getUserDetails();
          }
        } catch (err) {
          console.log(err.message);
        }
      }
    })();
  }, [initDataRaw]);

  return (
    <UserDetailsContext.Provider
      value={{ userDetails, isUserCreated, txDetails, getUserDetails }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};

export default UserAuthContext;

export const useUserDetails = () => useContext(UserDetailsContext);

```

**3**

**Add a `.env` file in the frontend folder:**

Add the following configuration:

Copy

```
# Capx chain config
VITE_CAPX_CHAIN_NETWORK_NAME="Capx Testnet"
VITE_CAPX_CHAIN_EXPLORE_URL="https://capxscan.com/"
VITE_CAPX_CHAIN_RPC_URL="https://capx-testnet.alt.technology/"
VITE_CAPX_WEB_SOCKET_URL="wss://capx-testnet.alt.technology/ws"
VITE_CAPX_CHAIN_ID=10245
VITE_CAPX_CHAIN_CURRENCY="GAS"
# Privy config
VITE_PRIVY_APP_ID="clp6kqnx001fald0f15lu304k"
# Backend URLs
VITE_AGENT_API_URL="your-backend-url"
VITE_SUPER_APP_API_URL="https://api.superapp.capx.ai/v3"

```

**4**

**Update `package.json`:**

Ensure the following dependencies are listed:

Copy

```
"@privy-io/react-auth": "^1.83.1",
"axios": "^1.7.7",
"ethers": "5.7.2",
"js-cookie": "^3.0.5",
"jwt-decode": "^4.0.0"
```

**5**

Run:

Copy

```
npm install
```

Your Capx authentication setup is now ready! 🎉

# **Capx Authentication Utilities and API Setup 👨🏻‍💻**

**Step 1: Create `utils.js 📁`**

1. Inside the `src` folder in the frontend directory, create a new file named **`utils.js`**.
2. Copy and paste the following code:

Copy

```
javascriptCopy codeimport { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const setTokenCookies = (accessToken, refreshToken) => {
  // Decode the access token to extract its expiration time (exp)

  if (accessToken) {
    const decodedAccessToken = jwtDecode(accessToken);
    const accessTokenExpiry = decodedAccessToken.exp; // Unix timestamp (seconds)

    // Calculate the expiration time in days (for js-cookie library)
    const accessTokenExpiresInMs = accessTokenExpiry * 1000 - Date.now();
    const accessTokenExpiresInDays =
      accessTokenExpiresInMs / (1000 * 60 * 60 * 24); // Convert to days

    // Set access token cookie with dynamic expiration
    Cookies.set("access_token", accessToken, {
      expires: accessTokenExpiresInDays, // Expires based on the token's expiration
      secure: true,
      sameSite: "Strict",
    });
  }

  if (refreshToken) {
    const decodedRefreshToken = jwtDecode(refreshToken);
    const refreshTokenExpiry = decodedRefreshToken.exp; // Unix timestamp (seconds)

    // Calculate the expiration time in days
    const refreshTokenExpiresInMs = refreshTokenExpiry * 1000 - Date.now();
    const refreshTokenExpiresInDays =
      refreshTokenExpiresInMs / (1000 * 60 * 60 * 24); // Convert to days

    // Set refresh token cookie with dynamic expiration
    Cookies.set("refresh_token", refreshToken, {
      expires: refreshTokenExpiresInDays, // Expires based on the token's expiration
      secure: true,
      sameSite: "Strict",
    });
  }
};
```

---

**Step 2: Create `api.js`**

1. Inside the `src` folder in the frontend directory, create another file named **`api.js`**.
2. Copy and paste the following code:

Copy

```
javascriptCopy codeimport axios from "axios";
import Cookies from "js-cookie";
import { setTokenCookies } from "./utils";

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

// Add a request interceptor to attach the access token to each request
api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("access_token"); // Get access token from memory or storage
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`; // Attach access token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration and refreshing
api.interceptors.response.use(
  (response) => response, // If the request is successful, just return the response
  async (error) => {
    const originalRequest = error.config;

    // Check if the error status is 401 (Unauthorized) and the request has not been retried
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retries

      // Call your function to refresh the token
      const refreshToken = Cookies.get("refresh_token"); // Get the refresh token from storage (usually HTTP-only cookies)
      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(
            `${import.meta.env.VITE_API_ENDPOINT}/users/refresh_token`,
            {},
            { headers: { Authorization: `Bearer ${refreshToken}` } }
          );
          const newAccessToken = refreshResponse.data.result.access_token;

          // Store the new access token in memory or storage
          setTokenCookies(newAccessToken);

          // Update the original request with the new token and retry
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest); // Retry the original request with new access token
        } catch (refreshError) {
          // If refresh fails, log the user out or handle it appropriately
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          window.location.reload();
          return Promise.reject(refreshError);
        }
      }
    }

    // If the request failed due to other reasons, reject the promise
    return Promise.reject(error);
  }
);

export default api;
```

---

**Step 3: Check Everything**

1. Open `UserAuthContext.jsx`.
2. Locate the `createUser` function and add the following line inside it:
    
    Copy
    
    ```
    javascriptCopy codeconsole.log(userInfo, "userinfo");
    ```
    
3. Save all the files and run your project.
4. Open your browser's developer console and check for the `userinfo` log. If it appears, your setup is working correctly. 🎉

# **SuperApp Authentication Frontend Privy Context 🎥**

**Implementing Privy in Your Web App**

In this step, we will integrate **Privy** authentication into our web app to manage users and wallets seamlessly. Here's how to do it:

---

### **Step 1: Create `PrivyProvider.jsx` 📁**

1. Navigate to the `src/context` folder in your frontend directory.
2. Create a new file named **`PrivyProvider.jsx`**.
3. Paste the following code:

Copy

```
javascriptCopy code"use client";
import { defineChain } from "viem";

import { useCallback, useEffect } from "react";
import { PrivyProvider, usePrivy, useWallets } from "@privy-io/react-auth";
import { useUserDetails } from "./UserAuthContext";
import { ethers } from "ethers";
import Cookies from "js-cookie";
import api from "../api";

const Capx = defineChain({
  id: Number(import.meta.env.VITE_PUBLIC_CAPX_CHAIN_ID),
  name: import.meta.env.VITE_PUBLIC_CAPX_CHAIN_NETWORK_NAME,
  network: import.meta.env.VITE_PUBLIC_CAPX_CHAIN_NETWORK_NAME,
  logoUrl: "https://internal.app.capx.fi/favicon.png",
  nativeCurrency: {
    decimals: 18,
    name: "ether",
    symbol: import.meta.env.VITE_PUBLIC_CAPX_CHAIN_CURRENCY,
  },
  rpcUrls: {
    default: {
      http: [import.meta.env.VITE_PUBLIC_CAPX_CHAIN_RPC_URL],
      webSocket: [import.meta.env.VITE_PUBLIC_CAPX_WEB_SOCKET_URL],
    },
    public: {
      http: [import.meta.env.VITE_PUBLIC_CAPX_CHAIN_RPC_URL],
      webSocket: [import.meta.env.VITE_PUBLIC_CAPX_WEB_SOCKET_URL],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: import.meta.env.VITE_PUBLIC_CAPX_CHAIN_EXPLORE_URL,
    },
  },
});

const PrivyWrapper = ({ children }) => {
  const { txDetails, userDetails, getUserDetails } = useUserDetails();
  const { wallets } = useWallets();
  const { user, authenticated, createWallet } = usePrivy();

  const mintXId = async () => {
    const startTime = performance.now();
    if (Object.keys(txDetails).length > 0) {
      try {
        await api.post("/wallet/faucet");
      } catch (error) {
        console.log(error, "request faucet error");
      }
      try {
        const wallet = wallets.find(
          (wallet) => wallet.walletClientType === "privy"
        );
        await wallet.switchChain(import.meta.env.VITE_PUBLIC_CAPX_CHAIN_ID);
        let providerInstance = await wallet.getEthersProvider();
        const signer = providerInstance.getSigner();
        const contract = new ethers.Contract(
          txDetails.contract_address,
          txDetails.contract_abi,
          signer
        );
        const txResponse = await signer.sendTransaction({
          to: txDetails.contract_address,
          data: contract.interface.encodeFunctionData("createProfile", [
            txDetails.input_params._profileParams,
            txDetails.input_params._profileData,
          ]),
          chainId: 10245,
        });

        const receipt = await txResponse.wait();
        const endTime = performance.now();
        console.log(endTime - startTime, "XID transaction time");
        console.log(receipt, "mint tx receipt");
        await getUserDetails();
        return true;
      } catch (error) {
        console.log(error, "mint transaction error");
        return false;
      }
    }
  };

  useEffect(() => {
    let timer;
    (async () => {
      if (txDetails && userDetails?.version < 3 && wallets.length > 0) {
        const isMinted = await mintXId();
        if (!isMinted) {
          timer = setInterval(async () => {
            const isXIdMinted = await mintXId();
            if (isXIdMinted) {
              clearInterval(timer);
            }
          }, 300000);
        }
      }
    })();

    return () => clearInterval(timer);
  }, [Object.keys(txDetails).length, wallets.length]);

  useEffect(() => {
    (async () => {
      if (authenticated) {
        if (!user?.wallet) {
          await createWallet();
        }
      }
    })();
  }, [authenticated]);
  return <>{wallets.length > 0 ? children : <p>Loading...</p>}</>;
};

export default function PrivyWalletProvider({ children }) {
  const { isUserCreated } = useUserDetails();

  const getCustomToken = useCallback(async () => {
    if (isUserCreated) {
      const idToken = Cookies.get("access_token");
      return idToken;
    } else {
      return null;
    }
  }, [isUserCreated]);

  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PUBLIC_PRIVY_APP_ID}
      config={{
        supportedChains: [Capx],
        defaultChain: Capx,
        appearance: {
          theme: "dark",
          accentColor: "#676FFF",
          logo: "https://internal.app.capx.fi/favicon.png",
          showWalletLoginFirst: false,
        },
        customAuth: {
          isAuthReady: isUserCreated,
          getCustomAccessToken: getCustomToken,
        },
      }}
    >
      <PrivyWrapper>{children}</PrivyWrapper>
    </PrivyProvider>
  );
}
```

---

### **Step 2: Install the Viem Dependency 🛠️**

To enable Privy and the custom chain configuration, install the `viem` library.

Run the following command in your terminal:

Copy

```
bashCopy codenpm i viem
```

# **We’re All Set! 🥳**

Congratulations! 🎉 You’ve completed the integration process. We hope everything went smoothly. If you encounter any issues or need assistance, don’t hesitate to reach out to us. We're here to help!