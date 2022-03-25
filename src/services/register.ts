import request from "@/utils/request";

export async function userRegister(params: Record<string, any>) {
  return request("/auth/register", {
    method: "POST",
    data: params,
  });
}
export async function getCaptcha(mobile: string) {
  return request(`/api/register/captcha?mobile=${mobile}`);
}
