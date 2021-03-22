import request from "@/utils/request";

export async function accountLogin(params) {
  return request("/auth/login", {
    method: "POST",
    data: params,
  });
}
export async function getCaptcha(mobile) {
  return request(`/auth/login/captcha?mobile=${mobile}`);
}
