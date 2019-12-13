export async function signinApi(data) {
  let res = await fetch("/api/accounts/signin", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  res = await res.json();
  if (res && res.res) return res;
  else return { res: false, code: res.code || 0 };
}

export async function signupApi(data) {
  let res = await fetch("/api/accounts/signup", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  res = await res.json();
  if (res) return { res: true };
  else return { res: false, code: 0 };
}

export async function verifyApi() {
  let res = await fetch("/api/accounts/verify", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.parse(localStorage.getItem("jwt"))
  });
  res = await res.json();
  if (res) return res;
  else return { res: false };
}
