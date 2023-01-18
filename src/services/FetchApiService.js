// const API_URL = `http://192.168.0.105:5000/api`;
const API_URL = `https://quiet-plains-72073.herokuapp.com/api`;

export const loadOldChat = (data, token, cb) => {
  const raw = JSON.stringify(data);
  const requestOptions = {
    method: "POST",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    body: raw,
    redirect: "follow",
  };

  // fetch(`${API_URL}/trainer/old-chat`, requestOptions)
  fetch(`${API_URL}/old-chat`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

export const loadCategories = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  // fetch(`${API_URL}/trainer/old-chat`, requestOptions)
  const response = await fetch(`${API_URL}/client/programcategories`, requestOptions)
  return response.text()
    
};

export const loadTrainerCategories = (token, cb) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  // fetch(`${API_URL}/trainer/old-chat`, requestOptions)
  fetch(`${API_URL}/trainer/programcategories`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

export const loadGroupChat = (id, token, cb) => {
  const raw = JSON.stringify({ id });
  const requestOptions = {
    method: "POST",
    headers: {
      // 'x-auth-token': token,
      "Content-Type": "application/json",
    },
    body: raw,
    redirect: "follow",
  };

  // fetch(`${API_URL}/trainer/old-chat`, requestOptions)
  fetch(`${API_URL}/old-group-chat`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

export const createGroup = (data, token, cb) => {
  const raw = JSON.stringify(data);
  const requestOptions = {
    method: "POST",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    body: raw,
    redirect: "follow",
  };

  fetch(`${API_URL}/trainer/group`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

export const getUserInbox = (userId, token, cb) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  fetch(`${API_URL}/getInbox/${userId}`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

export const chargeClientApi = (data, token, cb) => {
  const raw = JSON.stringify(data);
  const requestOptions = {
    method: "POST",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    body: raw,
    redirect: "follow",
  };

  fetch(`${API_URL}/trainer/chargeclient`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

export const getPaymentRequest = (token, cb) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  fetch(`${API_URL}/client/charges`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};
export const paymentSend = (accept, id, token, cb) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accept }),
    redirect: "follow",
  };

  console.log(`${API_URL}/client/updatecharge/${id}`);

  fetch(`${API_URL}/client/updatecharge/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

export const allPaymentSend = (accept, token, cb) => {
  console.log(accept, token);
  const requestOptions = {
    method: "PUT",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accept }),
    redirect: "follow",
  };

  console.log(`${API_URL}/client/updatechargeall`);

  fetch(`${API_URL}/client/updatechargeall}`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

export const socialLogin = (type, data, cb) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    redirect: "follow",
  };

  // console.log(`${API_URL}/${type}/sociallogin`);
  // console.log(data);

  fetch(`${API_URL}/${type}/sociallogin`, requestOptions)
    .then((response) => response.text())
    .then((result) => cb(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};
