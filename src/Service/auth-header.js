export default function authHeader() {
  const user = JSON.parse(sessionStorage.getItem("User"));

  if (user && user.token) {
    return { "x-auth-token": user.token };
  } else {
    return {};
  }
}
