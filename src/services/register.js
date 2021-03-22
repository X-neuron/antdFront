import request from "@/utils/request";

export async function userRegister(params) {
  return request("/auth/register", {
    method: "POST",
    data: params,
  });
}
export async function getCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
