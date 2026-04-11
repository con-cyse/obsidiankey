<template>
  <client-only>
    <NavBar :navAdminMode="''" />
    <main class="ok-main ok-login-main">
      <section class="ok-login-card" aria-labelledby="okLoginTitle">
        <h1 id="okLoginTitle" class="ok-login-title">Welcome back</h1>
        <p class="ok-login-subtitle">Sign in to continue to Obsidian Key.</p>

        <form v-if="!showSuccess" class="ok-login-form" @submit.prevent="handleLogin">
          <label class="ok-login-label" for="okUsername">Username</label>
          <input
            id="okUsername"
            v-model.trim="formUsername"
            class="ok-login-input"
            type="text"
            autocomplete="username"
            required
          />

          <label class="ok-login-label" for="okPassword">Password</label>
          <input
            id="okPassword"
            v-model="formPassword"
            class="ok-login-input"
            type="password"
            autocomplete="current-password"
            required
          />

          <button class="ok-login-submit" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? "Signing in..." : "Log in" }}
          </button>

          <p v-if="errorText" class="ok-login-error">{{ errorText }}</p>
        </form>

        <div v-else class="ok-login-success">
          <h2 class="ok-success-title">Welcome, {{ fullName || username }}!</h2>
          <p class="ok-success-message">✓ You have successfully logged in</p>
          <div class="ok-user-data">
            <p><strong>Username:</strong> {{ username }}</p>
            <p v-if="userLevel >= 0"><strong>User Level:</strong> {{ userLevel }}</p>
            <p class="ok-redirect-notice">Redirecting to dashboard...</p>
          </div>
        </div>
      </section>
    </main>
    <Copyright />
  </client-only>
</template>

<script setup lang="ts">
import { useHead, useSeoMeta } from "@vueuse/head";

type LoginResponse = {
  accessToken?: string;
  token?: string;
  userLevel?: number;
  fullName?: string;
  username?: string;
};

const router = useRouter();

const formUsername = ref("");
const formPassword = ref("");
const errorText = ref("");
const isSubmitting = ref(false);
const showSuccess = ref(false);

const retries = useCookie<number>("retries", {
  sameSite: "none",
  secure: true,
  maxAge: 60 * 60,
});
retries.value = retries.value ?? 0;

const username = useCookie<string>("username", {
  sameSite: "none",
  secure: true,
  maxAge: 60 * 60 * 24,
});
username.value = username.value ?? "";

const accessToken = useCookie<string>("accessToken", {
  sameSite: "none",
  secure: true,
  maxAge: 60 * 60 * 24,
});
accessToken.value = accessToken.value ?? "";

const userLevel = useCookie<number>("userLevel", {
  sameSite: "none",
  secure: true,
  maxAge: 60 * 60 * 24,
});
userLevel.value = userLevel.value ?? -1;

const fullName = useCookie<string>("fullName", {
  sameSite: "none",
  secure: true,
  maxAge: 60 * 60 * 24,
});
fullName.value = fullName.value ?? "";

useSeoMeta({
  title: () => "Obsidian Key | Log in",
  description: () => "Sign in to Obsidian Key.",
  charset: "utf-8",
  viewport: "width=device-width, initial-scale=1.0",
});

useHead({
  link: [
    { rel: "icon", type: "image/png", href: "/logo.png" },
    { rel: "stylesheet", href: "/reset.css" },
    { rel: "stylesheet", href: "/custom.css" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Noto+Sans+Display:ital,wght@0,100..900;1,100..900&display=swap",
    },
  ],
});

onMounted(() => {
  if (accessToken.value) {
    router.push("/");
  }
});

async function handleLogin() {
  if (isSubmitting.value) return;

  isSubmitting.value = true;
  errorText.value = "";

  try {
    const response = (await $fetch(`/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        username: formUsername.value,
        password: formPassword.value,
      },
    })) as LoginResponse;

    const resolvedToken = response.accessToken ?? response.token ?? "";
    if (!resolvedToken) {
      throw new Error("Invalid login response.");
    }

    retries.value = 0;
    username.value = response.username || formUsername.value;
    accessToken.value = resolvedToken;
    userLevel.value = response.userLevel ?? 0;
    fullName.value = response.fullName ?? "";

    // Show success message
    showSuccess.value = true;

    // Wait 2 seconds before redirecting to allow user to see the welcome message
    setTimeout(() => {
      router.push("/");
    }, 2000);
  } catch (error: any) {
    retries.value = (retries.value ?? 0) + 1;
    const attempts = error?.data?.attempts || error?.data?.data?.attempts;
    const attemptPreview = Array.isArray(attempts) && attempts.length > 0 ? ` ${attempts[0]}` : "";
    errorText.value = (error?.data?.message || error?.message || "Unable to log in.") + attemptPreview;
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style>
.ok-login-main {
  min-height: calc(100vh - 110px);
  padding: 90px 16px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ok-login-card {
  width: min(420px, 100%);
  padding: 28px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #d9dce2;
  box-shadow: 0 16px 40px rgba(12, 23, 38, 0.08);
}

.ok-login-title {
  font-size: 1.8rem;
  line-height: 1.2;
  font-family: "Cormorant Garamond", Georgia, serif;
  color: #0b0c10;
}

.ok-login-subtitle {
  margin-top: 6px;
  color: #535b67;
}

.ok-login-form {
  margin-top: 20px;
}

.ok-login-label {
  margin-top: 12px;
  margin-bottom: 6px;
  display: block;
  font-size: 0.9rem;
  color: #21252b;
}

.ok-login-input {
  width: 100%;
  padding: 11px 12px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #c9ced8;
}

.ok-login-input:focus {
  outline: 2px solid #3a3f78;
  outline-offset: 1px;
}

.ok-login-submit {
  margin-top: 18px;
  width: 100%;
  padding: 12px;
  border: 0;
  border-radius: 8px;
  color: #fff;
  background: #3a3f78;
  cursor: pointer;
}

.ok-login-submit:disabled {
  cursor: not-allowed;
  opacity: 0.75;
}

.ok-login-error {
  margin-top: 12px;
  color: #b2162f;
  font-size: 0.9rem;
}

.ok-login-success {
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  background: #f0fdf4;
  border: 1px solid #86efac;
  text-align: center;
}

.ok-success-title {
  font-size: 1.5rem;
  line-height: 1.2;
  font-family: "Cormorant Garamond", Georgia, serif;
  color: #166534;
  margin: 0 0 12px 0;
}

.ok-success-message {
  font-size: 1.1rem;
  color: #15803d;
  margin: 0 0 16px 0;
  font-weight: 500;
}

.ok-user-data {
  background: #ffffff;
  border: 1px solid #bbf7d0;
  border-radius: 6px;
  padding: 16px;
  text-align: left;
  margin-top: 16px;
}

.ok-user-data p {
  margin: 8px 0;
  color: #15803d;
  font-size: 0.95rem;
}

.ok-user-data strong {
  color: #166534;
}

.ok-redirect-notice {
  margin-top: 12px;
  font-size: 0.9rem;
  color: #059669;
  font-style: italic;
}
</style>