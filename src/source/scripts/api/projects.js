export async function createProjectApi(data) {
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  let res = await fetch("/api/projects/create", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, jwt })
  });
  res = await res.json();
  if (res && res.res) return res;
  else return { res: false, code: res.code || 0 };
}
