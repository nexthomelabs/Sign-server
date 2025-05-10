import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useDispatch } from "react-redux";
import Title from "../components/Title";
import { NavLink, useNavigate, useLocation } from "react-router";
import login_img from "../assets/images/login_img.svg";
import { useWindowSize } from "../hook/useWindowSize";
import ModalUi from "../primitives/ModalUi";
import { emailRegex } from "../constant/const";
import Alert from "../primitives/Alert";
import { appInfo } from "../constant/appinfo";
import { fetchAppInfo } from "../redux/reducers/infoReducer";
import { showTenant } from "../redux/reducers/ShowTenant";
import { getAppLogo, saveLanguageInLocal } from "../constant/Utils";
import Loader from "../primitives/Loader";
import { useTranslation } from "react-i18next";
import SelectLanguage from "../components/pdf/SelectLanguage";

function Login() {
  const appName = "Nexthomelabs Sign";
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const username = localStorage.getItem("username") || "";
  const image = localStorage.getItem("profileImg") || "";
  const [state, setState] = useState({
    email: "",
    alertType: "success",
    alertMsg: "",
    password: "",
    passwordVisible: false,
    loading: false,
    thirdpartyLoader: false
  });
  const [userDetails, setUserDetails] = useState({
    Company: "",
    Destination: ""
  });
  const [isModal, setIsModal] = useState(false);
  const [image, setImage] = useState();
  const [errMsg, setErrMsg] = useState();

  useEffect(() => {
    checkUserExt();
    // eslint-disable-next-line
  }, []);

  const showToast = (type, msg) => {
    setState({ ...state, loading: false, alertType: type, alertMsg: msg });
    setTimeout(() => setState(prev => ({ ...prev, alertMsg: "" })), 2000);
  };
  
  const checkUserExt = async () => {
    const app = await getAppLogo();
    if (app?.error === "invalid_json") {
      setErrMsg(t("server-down", { appName: appName }));
    } else if (app?.user === "not_exist") {
      navigate("/addadmin");
    }
    if (app?.logo) {
      setImage(app?.logo);
    } else {
      setImage(appInfo?.applogo || undefined);
    }
    
    // Check if user is already logged in
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      setState({ ...state, loading: true });
      navigate("/dashboard/35KBoSgoAK");
    }
    
    dispatch(fetchAppInfo());
  };
  
  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "email") {
      value = value?.toLowerCase()?.replace(/\s/g, "");
    }
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!emailRegex.test(state.email)) {
      showToast("danger", "Please enter a valid email address.");
      return;
    }

    const { email, password } = state;
    if (!email || !password) {
      return;
    }

    try {
      setState({ ...state, loading: true });
      localStorage.setItem("appLogo", appInfo.applogo);
      
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        showToast("danger", error.message);
        return;
      }
      
      if (data.user) {
        // Get user profile from Supabase
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (profileData) {
          localStorage.setItem("username", profileData.name);
          localStorage.setItem("userEmail", email);
          localStorage.setItem("accesstoken", data.session.access_token);
          
          if (profileData.profile_pic) {
            localStorage.setItem("profileImg", profileData.profile_pic);
          } else {
            localStorage.setItem("profileImg", "");
          }
          
          // Set tenant info if available
          if (profileData.tenant_id) {
            localStorage.setItem("TenantId", profileData.tenant_id);
            dispatch(showTenant(profileData.tenant_name || ""));
            localStorage.setItem("TenantName", profileData.tenant_name || "");
          }
          
          // Set default landing page
          localStorage.setItem("PageLanding", "35KBoSgoAK");
          localStorage.setItem("defaultmenuid", "VPh91h0ZHk");
          localStorage.setItem("pageType", "dashboard");
          
          // Redirect to dashboard or previous location
          const redirectUrl = location?.state?.from || "/dashboard/35KBoSgoAK";
          navigate(redirectUrl);
        } else {
          // If profile doesn't exist, create one
          setIsModal(true);
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      showToast("danger", "An unexpected error occurred. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setState({ ...state, passwordVisible: !state.passwordVisible });
  };

  const handleSubmitbtn = async (e) => {
    e.preventDefault();
    if (userDetails.Destination && userDetails.Company) {
      setState({ ...state, thirdpartyLoader: true });
      
      try {
        // Create user profile
        const { data: userData } = await supabase.auth.getUser();
        
        if (userData?.user) {
          const { error } = await supabase
            .from('profiles')
            .insert([
              {
                id: userData.user.id,
                name: userData.user.user_metadata?.name || "",
                email: userData.user.email,
                phone: userData.user.user_metadata?.phone || "",
                company: userDetails.Company,
                job_title: userDetails.Destination
              }
            ]);
            
          if (error) {
            console.error("Error creating profile:", error);
            showToast("danger", error.message);
          } else {
            localStorage.setItem("username", userData.user.user_metadata?.name || "");
            navigate("/dashboard/35KBoSgoAK");
          }
        }
      } catch (error) {
        console.error("Error creating profile:", error);
        showToast("danger", "Failed to create user profile");
      } finally {
        setState({ ...state, thirdpartyLoader: false });
      }
    } else {
      showToast("warning", t("fill-required-details!"));
    }
  };

  const logOutUser = async () => {
    setIsModal(false);
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.log("Err while logging out", err);
    }
    
    let appdata = localStorage.getItem("userSettings");
    let applogo = localStorage.getItem("appLogo");
    let defaultmenuid = localStorage.getItem("defaultmenuid");
    let PageLanding = localStorage.getItem("PageLanding");
    let baseUrl = localStorage.getItem("baseUrl");
    let appid = localStorage.getItem("parseAppId");

    localStorage.clear();
    saveLanguageInLocal(i18n);

    localStorage.setItem("appLogo", applogo);
    localStorage.setItem("defaultmenuid", defaultmenuid);
    localStorage.setItem("PageLanding", PageLanding);
    localStorage.setItem("userSettings", appdata);
    localStorage.setItem("baseUrl", baseUrl);
    localStorage.setItem("parseAppId", appid);
  };

  return errMsg ? (
    <div className="h-screen flex justify-center text-center items-center p-4 text-gray-500 text-base">
      {errMsg}
    </div>
  ) : (
    <div>
      <Title title="Login" />
      {state.alertMsg && <Alert type={state.alertType}>{state.alertMsg}</Alert>}
      }
      {state.loading && (
        <div
          aria-live="assertive"
          className="fixed w-full h-full flex justify-center items-center bg-black bg-opacity-30 z-50"
        >
          <Loader />
        </div>
      )}
      {appInfo && appInfo.appId ? (
        <>
          <div
            aria-labelledby="loginHeading"
            role="region"
            className="pb-1 md:pb-4 pt-10 md:px-10 lg:px-16 h-full"
          >
            <div className="md:p-4 lg:p-10 p-4 bg-base-100 text-base-content op-card">
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
                  <form onSubmit={handleSubmit} aria-label="Login Form">
                    <h1 className="text-[30px] mt-6">{t("welcome")}</h1>
                    <fieldset>
                      <legend className="text-[12px] text-[#878787]">
                        {t("Login-to-your-account")}
                      </legend>
                      <div className="w-full px-6 py-3 my-1 op-card bg-base-100 shadow-md outline outline-1 outline-slate-300/50">
                        <label className="block text-xs" htmlFor="email">
                          {t("email")}
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="op-input op-input-bordered op-input-sm focus:outline-none hover:border-base-content w-full text-xs"
                          name="email"
                          autoComplete="username"
                          value={state.email}
                          onChange={handleChange}
                          required
                          onInvalid={(e) =>
                            e.target.setCustomValidity(t("input-required"))
                          }
                          onInput={(e) => e.target.setCustomValidity("")}
                        />
                        <hr className="my-1 border-none" />
                        <label className="block text-xs" htmlFor="password">
                          {t("password")}
                        </label>
                        <div className="relative">
                          <input
                            id="password"
                            type={state.passwordVisible ? "text" : "password"}
                            className="op-input op-input-bordered op-input-sm focus:outline-none hover:border-base-content w-full text-xs"
                            name="password"
                            value={state.password}
                            autoComplete="current-password"
                            onChange={handleChange}
                            onInvalid={(e) =>
                              e.target.setCustomValidity(t("input-required"))
                            }
                            onInput={(e) => e.target.setCustomValidity("")}
                            required
                          />
                          <span
                            className="absolute cursor-pointer top-[50%] right-[10px] -translate-y-[50%] text-base-content"
                            onClick={togglePasswordVisibility}
                          >
                            {state.passwordVisible ? (
                              <i className="fa-light fa-eye-slash text-xs pb-1" />
                            ) : (
                              <i className="fa-light fa-eye text-xs pb-1 " />
                            )}
                          </span>
                        </div>

                        <div className="relative mt-1">
                          <NavLink
                            to="/forgetpassword"
                            className="text-[13px] op-link op-link-primary underline-offset-1 focus:outline-none ml-1"
                          >
                            {t("forgot-password")}
                          </NavLink>
                        </div>
                      </div>
                    </fieldset>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-center text-xs font-bold mt-2">
                      <button
                        type="submit"
                        className="op-btn op-btn-primary"
                        disabled={state.loading}
                      >
                        {state.loading ? t("loading") : t("login")}
                      </button>
                      
                      <NavLink to="/signup" className="op-btn op-btn-secondary">
                        {t("sign-up")}
                      </NavLink>
                    </div>
                  </form>
                </div>
                {width >= 768 && (
                  <div className="place-self-center">
                    <div className="mx-auto md:w-[300px] lg:w-[400px] xl:w-[500px]">
                      <img
                        src={login_img}
                        alt="The image illustrates a person from behind, seated at a desk with a four-monitor computer setup, in an environment with a light blue and white color scheme, featuring a potted plant to the right."
                        width="100%"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <SelectLanguage />
            {state.alertMsg && (
              <Alert type={state.alertType}>{state.alertMsg}</Alert>
            )}
          </div>
          <ModalUi
            isOpen={isModal}
            title={t("additional-info")}
            showClose={false}
          >
            <form className="px-4 py-3 text-base-content">
              <div className="mb-3">
                <label
                  htmlFor="Company"
                  style={{ display: "flex" }}
                  className="block text-xs text-gray-700 font-semibold"
                >
                  {t("company")}{" "}
                  <span className="text-[red] text-[13px]">*</span>
                </label>
                <input
                  type="text"
                  className="op-input op-input-bordered op-input-sm focus:outline-none hover:border-base-content w-full text-xs"
                  id="Company"
                  value={userDetails.Company}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      Company: e.target.value
                    })
                  }
                  onInvalid={(e) =>
                    e.target.setCustomValidity(t("input-required"))
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="JobTitle"
                  style={{ display: "flex" }}
                  className="block text-xs text-gray-700 font-semibold"
                >
                  {t("job-title")}
                  <span className="text-[red] text-[13px]">*</span>
                </label>
                <input
                  type="text"
                  className="op-input op-input-bordered op-input-sm focus:outline-none hover:border-base-content w-full text-xs"
                  id="JobTitle"
                  value={userDetails.Destination}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      Destination: e.target.value
                    })
                  }
                  onInvalid={(e) =>
                    e.target.setCustomValidity(t("input-required"))
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                  required
                />
              </div>
              <div className="mt-4 gap-2 flex flex-row">
                <button
                  type="button"
                  className="op-btn op-btn-primary"
                  onClick={(e) => handleSubmitbtn(e)}
                >
                  {t("login")}
                </button>
                <button
                  type="button"
                  className="op-btn op-btn-ghost"
                  onClick={logOutUser}
                >
                  {t("cancel")}
                </button>
              </div>
            </form>
          </ModalUi>
        </>
      ) : (
        <div
          aria-live="assertive"
          className="fixed w-full h-full flex justify-center items-center z-50"
        >
          <Loader />
        </div>
      )}
    </div>
  );
}
export default Login;