import request from "@/utils/request";

export async function accountLogin(params) {
  return request("/api/login/account", {
    method: "POST",
    data: params,
  });
}
export async function getCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
