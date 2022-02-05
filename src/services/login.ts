import request from "@/utils/request";

export async function accountLogin(params: Record<string, any>) {
  return request("/auth/login", {
    method: "POST",
    data: params,
  });
}
export async function getCaptcha(mobile: string) {
  return request(`/auth/login/captcha?mobile=${mobile}`);
}
