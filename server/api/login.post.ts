type LoginBody = {
  username?: string;
  password?: string;
};

type LoginResponse = {
  accessToken?: string;
  token?: string;
  message?: string;
  [key: string]: unknown;
};

const LOGIN_PATHS = [
  '/login',
  '/api/login',
  '/user/login',
  '/user_login',
  '/auth/login',
  '/signin',
  '/sign-in',
] as const;

function normalizePaths(csv: string): string[] {
  return csv
    .split(',')
    .map((value) => value.trim())
    .filter((value) => value.length > 0)
    .map((value) => (value.startsWith('/') ? value : `/${value}`));
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = (await readBody(event)) as LoginBody;

  if (!body?.username || !body?.password) {
    throw createError({ statusCode: 400, statusMessage: 'Username and password are required.' });
  }

  const apiBase = String(config.apiBase || '').replace(/\/$/, '');
  const configuredPaths = normalizePaths(String(config.apiLoginPaths || ''));
  const paths = configuredPaths.length > 0 ? configuredPaths : [...LOGIN_PATHS];
  if (!apiBase) {
    throw createError({ statusCode: 500, statusMessage: 'API base URL is not configured.' });
  }

  const errors: string[] = [];

  for (const path of paths) {
    try {
      const response = await $fetch<LoginResponse>(`${apiBase}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          username: body.username,
          password: body.password,
        },
      });

      if (response?.message === 'Page not found.') {
        errors.push(`${path}: page not found`);
        continue;
      }

      if (response?.accessToken || response?.token) {
        return response;
      }

      // If endpoint is valid but returns a non-token payload, still return it for UI handling.
      return response;
    } catch (error: any) {
      const statusCode = error?.statusCode || error?.response?.status;
      const statusMessage = error?.statusMessage || error?.data?.message || error?.message || 'Request failed';
      errors.push(`${path}: ${statusCode || 'ERR'} ${statusMessage}`);
    }
  }

  throw createError({
    statusCode: 502,
    statusMessage: 'Login endpoint not reachable on upstream API.',
    data: {
      apiBase,
      configuredPaths: paths,
      attempts: errors,
      hint: 'Set API_LOGIN_PATHS to the exact upstream login route, e.g. /api/v1/login',
    },
  });
});
