import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router";
import { supabase } from "../lib/supabaseClient";
import Title from "../components/Title";
import login_img from "../assets/images/login_img.svg";
import { useWindowSize } from "../hook/useWindowSize";
import Alert from "../primitives/Alert";
import { emailRegex } from "../constant/const";
import Loader from "../primitives/Loader";
import { useTranslation } from "react-i18next";
import SelectLanguage from "../components/pdf/SelectLanguage";

function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    company: "",
    jobTitle: "",
    loading: false,
    alertType: "success",
    alertMsg: "",
    passwordVisible: false,
    confirmPasswordVisible: false
  });
  const [lengthValid, setLengthValid] = useState(false);
  const [caseDigitValid, setCaseDigitValid] = useState(false);
  const [specialCharValid, setSpecialCharValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isSubscribeNews, setIsSubscribeNews] = useState(false);
  const [image, setImage] = useState();

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/dashboard/35KBoSgoAK");
      }
    };
    
    checkSession();
    initializeHead();
  }, [navigate]);

  async function initializeHead() {
    // Set app logo
    const logo = localStorage.getItem("appLogo");
    setImage(logo);
  }

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "email") {
      value = value?.toLowerCase()?.replace(/\s/g, "");
    }
    
    setState({ ...state, [name]: value });
    
    if (name === "password") {
      handlePasswordChange(value);
    }
    
    if (name === "confirmPassword") {
      setPasswordsMatch(state.password === value);
    }
  };

  const handlePasswordChange = (newPassword) => {
    // Check conditions separately
    setLengthValid(newPassword.length >= 8);
    setCaseDigitValid(
      /[a-z]/.test(newPassword) &&
      /[A-Z]/.test(newPassword) &&
      /\d/.test(newPassword)
    );
    setSpecialCharValid(/[!@#$%^&*()\-_=+{};:,<.>]/.test(newPassword));
    
    if (state.confirmPassword) {
      setPasswordsMatch(state.confirmPassword === newPassword);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setState({ ...state, passwordVisible: !state.passwordVisible });
    } else {
      setState({ ...state, confirmPasswordVisible: !state.confirmPasswordVisible });
    }
  };

  const showToast = (type, msg) => {
    setState({ ...state, loading: false, alertType: type, alertMsg: msg });
    setTimeout(() => setState(prev => ({ ...prev, alertMsg: "" })), 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!emailRegex.test(state.email)) {
      showToast("danger", "Please enter a valid email address.");
      return;
    }
    
    if (state.password !== state.confirmPassword) {
      showToast("danger", "Passwords do not match.");
      return;
    }
    
    if (!(lengthValid && caseDigitValid && specialCharValid)) {
      showToast("danger", "Password does not meet requirements.");
      return;
    }
    
    setState({ ...state, loading: true });
    
    try {
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: state.email,
        password: state.password,
        options: {
          data: {
            name: state.name,
            phone: state.phone,
            company: state.company,
            job_title: state.jobTitle
          }
        }
      });
      
      if (error) {
        showToast("danger", error.message);
        return;
      }
      
      // Create user profile in the database
      if (data.user) {
        // Store user information
        localStorage.setItem("username", state.name);
        localStorage.setItem("userEmail", state.email);
        
        // Create user profile in Supabase database
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: data.user.id,
              name: state.name,
              email: state.email,
              phone: state.phone,
              company: state.company,
              job_title: state.jobTitle
            }
          ]);
          
        if (profileError) {
          console.error("Error creating profile:", profileError);
        }
        
        showToast("success", "Account created successfully! Please check your email to verify your account.");
        
        // Redirect to login after a delay
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      showToast("danger", "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Title title="Sign Up" />
      {state.alertMsg && <Alert type={state.alertType}>{state.alertMsg}</Alert>}
      }
      {state.loading && (
        <div className="fixed w-full h-full flex justify-center items-center bg-black bg-opacity-30 z-50">
          <Loader />
        </div>
      )}
      
      <div className="pb-1 md:pb-4 pt-10 md:px-10 lg:px-16">
        <div className="md:p-4 lg:p-10 p-4 bg-base-100 text-base-content op-card shadow-md">
          <div className="w-[250px] h-[66px] inline-block overflow-hidden">
            {image && (
              <img
                src={image}
                className="object-contain h-full"
                alt="applogo"
              />
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
            <div>
              <form onSubmit={handleSubmit}>
                <h2 className="text-[30px] mt-6">{t("create-account")}</h2>
                <span className="text-[12px] text-[#878787]">
                  {t("signup-description")}
                </span>
                
                <div className="w-full my-4 op-card bg-base-100 shadow-md outline outline-1 outline-slate-300/50">
                  <div className="px-6 py-4">
                    <label className="block text-xs">{t("name")}</label>
                    <input
                      type="text"
                      name="name"
                      className="op-input op-input-bordered op-input-sm w-full"
                      value={state.name}
                      onChange={handleChange}
                      onInvalid={(e) => e.target.setCustomValidity(t("input-required"))}
                      onInput={(e) => e.target.setCustomValidity("")}
                      required
                    />
                    <hr className="my-2 border-none" />
                    
                    <label className="block text-xs">{t("email")}</label>
                    <input
                      type="email"
                      name="email"
                      className="op-input op-input-bordered op-input-sm w-full"
                      value={state.email}
                      onChange={handleChange}
                      onInvalid={(e) => e.target.setCustomValidity(t("input-required"))}
                      onInput={(e) => e.target.setCustomValidity("")}
                      required
                    />
                    <hr className="my-2 border-none" />
                    
                    <label className="block text-xs">{t("phone")}</label>
                    <input
                      type="tel"
                      name="phone"
                      className="op-input op-input-bordered op-input-sm w-full"
                      value={state.phone}
                      onChange={handleChange}
                      placeholder={t("phone-optional")}
                    />
                    <hr className="my-2 border-none" />
                    
                    <label className="block text-xs">{t("company")}</label>
                    <input
                      type="text"
                      name="company"
                      className="op-input op-input-bordered op-input-sm w-full"
                      value={state.company}
                      onChange={handleChange}
                      placeholder={t("company-optional")}
                    />
                    <hr className="my-2 border-none" />
                    
                    <label className="block text-xs">{t("job-title")}</label>
                    <input
                      type="text"
                      name="jobTitle"
                      className="op-input op-input-bordered op-input-sm w-full"
                      value={state.jobTitle}
                      onChange={handleChange}
                      placeholder={t("job-title-optional")}
                    />
                    <hr className="my-2 border-none" />
                    
                    <label className="block text-xs">{t("password")}</label>
                    <div className="relative">
                      <input
                        type={state.passwordVisible ? "text" : "password"}
                        name="password"
                        className="op-input op-input-bordered op-input-sm w-full"
                        value={state.password}
                        onChange={handleChange}
                        onInvalid={(e) => e.target.setCustomValidity(t("input-required"))}
                        onInput={(e) => e.target.setCustomValidity("")}
                        required
                      />
                      <span
                        className="absolute cursor-pointer top-[50%] right-[10px] -translate-y-[50%] text-base-content"
                        onClick={() => togglePasswordVisibility('password')}
                      >
                        {state.passwordVisible ? (
                          <i className="fa-light fa-eye-slash" />
                        ) : (
                          <i className="fa-light fa-eye" />
                        )}
                      </span>
                    </div>
                    
                    {state.password.length > 0 && (
                      <div className="mt-1 text-[11px]">
                        <p className={`${lengthValid ? "text-green-600" : "text-red-600"}`}>
                          {lengthValid ? "✓" : "✗"} {t("password-length")}
                        </p>
                        <p className={`${caseDigitValid ? "text-green-600" : "text-red-600"}`}>
                          {caseDigitValid ? "✓" : "✗"} {t("password-case")}
                        </p>
                        <p className={`${specialCharValid ? "text-green-600" : "text-red-600"}`}>
                          {specialCharValid ? "✓" : "✗"} {t("password-special-char")}
                        </p>
                      </div>
                    )}
                    <hr className="my-2 border-none" />
                    
                    <label className="block text-xs">{t("confirm-password")}</label>
                    <div className="relative">
                      <input
                        type={state.confirmPasswordVisible ? "text" : "password"}
                        name="confirmPassword"
                        className="op-input op-input-bordered op-input-sm w-full"
                        value={state.confirmPassword}
                        onChange={handleChange}
                        onInvalid={(e) => e.target.setCustomValidity(t("input-required"))}
                        onInput={(e) => e.target.setCustomValidity("")}
                        required
                      />
                      <span
                        className="absolute cursor-pointer top-[50%] right-[10px] -translate-y-[50%] text-base-content"
                        onClick={() => togglePasswordVisibility('confirmPassword')}
                      >
                        {state.confirmPasswordVisible ? (
                          <i className="fa-light fa-eye-slash" />
                        ) : (
                          <i className="fa-light fa-eye" />
                        )}
                      </span>
                    </div>
                    
                    {state.confirmPassword && !passwordsMatch && (
                      <p className="text-red-600 text-[11px] mt-1">
                        {t("passwords-dont-match")}
                      </p>
                    )}
                    
                    <div className="mt-2.5 ml-1 flex flex-row items-center">
                      <input
                        type="checkbox"
                        className="op-checkbox op-checkbox-sm"
                        id="subscribeToNewsletter"
                        checked={isSubscribeNews}
                        onChange={(e) => setIsSubscribeNews(e.target.checked)}
                      />
                      <label
                        className="text-xs cursor-pointer ml-1 mb-0"
                        htmlFor="subscribeToNewsletter"
                      >
                        {t("subscribe-to-newsletter")}
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-center text-xs font-bold">
                  <button
                    type="submit"
                    className="op-btn op-btn-primary"
                    disabled={state.loading}
                  >
                    {state.loading ? t("loading") : t("sign-up")}
                  </button>
                  
                  <NavLink to="/" className="op-btn op-btn-secondary">
                    {t("login")}
                  </NavLink>
                </div>
              </form>
            </div>
            
            {width >= 768 && (
              <div className="self-center">
                <div className="mx-auto md:w-[300px] lg:w-[500px]">
                  <img src={login_img} alt="login" width="100%" />
                </div>
              </div>
            )}
          </div>
        </div>
        <SelectLanguage />
      </div>
    </div>
  );
}

export default Signup;