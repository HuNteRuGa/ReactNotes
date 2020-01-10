export const createProjectApi = async data => {
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
};

export const loadProjectsApi = async () => {
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  let res = await fetch("/api/projects/getByJwt", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jwt })
  });
  res = await res.json();
  if (res && res.res) return res;
  else return { res: false, code: res.code || 0 };
};

export const addTaskApi = async data => {
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  let res = await fetch("/api/tasks/create", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, jwt })
  });
  res = await res.json();
  if (res && res.res) return res;
  else return { res: false, code: res.code || 0 };
};
