const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

let refreshTokenPromise = null;


export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}
function redirectToLogin() {
  localStorage.removeItem("accessToken");

  if (window.location.pathname !== "/login") {
    window.location.replace("/login");
  }
}

async function refreshAccessToken() {
  if (!refreshTokenPromise) {
    refreshTokenPromise = fetch(
      `${API_BASE_URL}/users/token/refresh`,
      {
        method: "POST",
        credentials: "include",
      },
    )
      .then(async (response) => {
        const data = await response.json().catch(() => null);

        if (!response.ok) {
          localStorage.removeItem("accessToken");

          throw new ApiError(
            data?.message ?? "토큰 갱신에 실패했습니다.",
            response.status,
            data,
          );
        }

        // 실제 refresh 응답 구조에 맞게 확인 필요
        const accessToken =
          data?.data?.token?.accessToken ??
          data?.data?.accessToken;

        if (!accessToken) {
          throw new Error("갱신된 액세스 토큰이 없습니다.");
        }

        localStorage.setItem("accessToken", accessToken);
        return accessToken;
      })
      .finally(() => {
        refreshTokenPromise = null;
      });
  }

  return refreshTokenPromise;
}


export async function apiFetch(
  url,
  requestOptions = {},
  {
    retryOnUnauthorized = true,
    hasRetried = false,
  } = {},
) {
  const {
    method = "GET",
    body,
    headers,
    ...options
  } = requestOptions;

  const isFormData = body instanceof FormData;
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method,
    credentials: "include",
    headers: {
      ...(!isFormData && body ? { "Content-Type": "application/json" } : {}),
      ...(accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {}),
      ...headers,
    },
    body:
      body == null || isFormData || typeof body === "string"
        ? body
        : JSON.stringify(body),
    ...options,
  });

  if (response.status === 401 && retryOnUnauthorized) {
    if (hasRetried) {
      redirectToLogin();
      throw new ApiError("로그인이 필요합니다.", 401, null);
    }

    try {
      await refreshAccessToken();

      return apiFetch(url, requestOptions, {
        retryOnUnauthorized: true,
        hasRetried: true,
      });
    } catch (error) {
      redirectToLogin();
      throw error;
    }
  }

  const contentType = response.headers.get("Content-Type") ?? "";
  const hasJson = contentType.includes("application/json");

  const data =
    response.status === 204
      ? null
      : hasJson
        ? await response.json()
        : await response.text();

  if (!response.ok) {
    throw new ApiError(
      data?.message ?? "오류가 발생했습니다.",
      response.status,
      data,
    );
  }

  return data;
}