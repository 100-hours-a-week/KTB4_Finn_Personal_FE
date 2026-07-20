

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function apiFetch(url, {
    method = "GET",
    body,
    headers,
    ...options
} = {},
) {
    const isFormData = body instanceof FormData;
    const accessToken = localStorage.getItem("accessToken");


    const response = await fetch(`${API_BASE_URL}${url}`, {
        method,
        credentials: "include",
        headers: {
            ...(!isFormData && body ? {"Content-Type": "application/json"} : {}),
            ...(accessToken ? {Authorization : `Bearer ${accessToken}`} : {}),
            ...headers,
        },
        body:
            body == null || isFormData || typeof body === "string" ? body : JSON.stringify(body),
        ...options,
    });

    const contentType = response.headers.get("Content-Type") ?? "";
    const hasJson = contentType.includes("application/json");

    const data = response.status === 204 ? null : hasJson ? await response.json() : await response.text();

    // refreshToken로직 추가

    if(!response.ok){
        throw new ApiError(
            data?.message ?? "오류 발생",
            response.status,
            data,
        );
    }    

    return data

}