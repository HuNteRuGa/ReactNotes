export default async (url, method, body) => {
  return new Promise((resolve, reject) => {
    if (!method) method = method = "GET";
    if (!url) reject();
    if (!body) body = null;
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onloadend(res => {
      resolve(JSON.parse(res));
    });
    xhr.send(body);
  });
};
