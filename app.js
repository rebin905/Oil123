const DEMO_OTP = "123456";
const SESSION_KEY = "captrol_demo_session";
const USERS_KEY = "captrol_demo_users";

const $ = (id) => document.getElementById(id);
const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));
const normalizePhone = (value) => {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.length === 10 ? `+91${digits}` : "";
};
const setMessage = (id, text, good = false) => {
  const el = $(id);
  if (!el) return;
  el.textContent = text;
  el.style.color = good ? "#86efac" : "#fb923c";
};

function show(id) {
  ["loginStep", "otpStep", "signupStep"].forEach((item) => $(item)?.classList.add("hidden"));
  $(id)?.classList.remove("hidden");
}

if ($("showSignupBtn")) {
  $("showSignupBtn").onclick = () => show("signupStep");
  $("showLoginBtn").onclick = () => show("loginStep");

  $("sendOtpBtn").onclick = () => {
    const phone = normalizePhone($("phone").value);
    if (!phone) {
      setMessage("loginMessage", "Please enter a valid 10-digit phone number.");
      return;
    }
    sessionStorage.setItem("pending_phone", phone);
    $("phonePreview").textContent = phone;
    show("otpStep");
    setMessage("otpMessage", "Demo OTP sent. Use 123456.", true);
  };

  $("backPhoneBtn").onclick = () => show("loginStep");

  $("verifyOtpBtn").onclick = () => {
    const otp = $("otp").value.trim();
    const phone = sessionStorage.getItem("pending_phone");
    if (otp !== DEMO_OTP) {
      setMessage("otpMessage", "Incorrect OTP. Use 123456.");
      return;
    }
    if (!phone) {
      show("loginStep");
      return;
    }

    let users = getUsers();
    let user = users.find((item) => item.phone === phone);
    if (!user) {
      user = {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        full_name: "Demo User",
        phone,
        role: "customer",
        created_at: new Date().toISOString()
      };
      users.push(user);
      saveUsers(users);
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    window.location.href = "dashboard.html";
  };

  $("signupBtn").onclick = () => {
    const fullName = $("fullName").value.trim();
    const phone = normalizePhone($("signupPhone").value);
    const role = $("role").value;

    if (fullName.length < 2) {
      setMessage("signupMessage", "Please enter your full name.");
      return;
    }
    if (!phone) {
      setMessage("signupMessage", "Please enter a valid 10-digit phone number.");
      return;
    }

    const users = getUsers();
    const existing = users.find((item) => item.phone === phone);
    if (existing) {
      setMessage("signupMessage", "This number is already registered. Please login.");
      return;
    }

    const user = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      full_name: fullName,
      phone,
      role,
      created_at: new Date().toISOString()
    };

    users.push(user);
    saveUsers(users);
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    window.location.href = "dashboard.html";
  };
}

if ($("userName")) {
  const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  if (!session) {
    window.location.href = "index.html";
  } else {
    $("userName").textContent = session.full_name || "User";
    $("userRole").textContent = String(session.role || "customer").toUpperCase();
  }

  $("logoutBtn").onclick = () => {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = "index.html";
  };
  }
