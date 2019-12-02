import xhr from "../utils/xhr";

export async function signin(username, password) {
  if (typeof password == "string" && typeof username == "string") {
    return await xhr("/api/accounts/verify", "POST", { username: username, password: password });
  } else throw error;
}
