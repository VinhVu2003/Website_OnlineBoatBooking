import "../../assets/css/home/449d75fe856c6532.css";
import "../../assets/css/home/821eb5f7bd1985b1.css";
import logo from "../../assets/img/black_logo.webp";
import { Link } from "react-router-dom";
const Header = function () {
  return (
    <>
      <div className="Header_wrapper__IXtx_ Header_home-header__haQj4" style={{ position: "sticky", top: 0 ,zIndex: 1000 }}>
        <div className="container flex justify-between align-center Header_container__jM6_b">
          <div className="flex align-center gap-40 h-full">
            <div className="Header_logo__tC3WE">
              <a href="/user/home">
                <span
                  style={{
                    boxSizing: "border-box",
                    display: "inline-block",
                    overflow: "hidden",
                    width: "initial",
                    height: "initial",
                    background: "none",
                    opacity: 1,
                    border: 0,
                    margin: 0,
                    padding: 0,
                    position: "relative",
                    maxWidth: "100%",
                  }}
                >
                  <span
                    style={{
                      boxSizing: "border-box",
                      display: "block",
                      width: "initial",
                      height: "initial",
                      background: "none",
                      opacity: 1,
                      border: 0,
                      margin: 0,
                      padding: 0,
                      maxWidth: "100%",
                    }}
                  >
                    <img
                      style={{
                        display: "block",
                        maxWidth: "100%",
                        width: "initial",
                        height: "initial",
                        background: "none",
                        opacity: 1,
                        border: 0,
                        margin: 0,
                        padding: 0,
                      }}
                      alt=""
                      aria-hidden="true"
                      src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27156%27%20height=%2742%27/%3e"
                    />
                  </span>
                  <img
                    src={logo}
                    decoding="async"
                    data-nimg="intrinsic"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      boxSizing: "border-box",
                      padding: 0,
                      border: "none",
                      margin: "auto",
                      display: "block",
                      width: 0,
                      height: 0,
                      minWidth: "100%",
                      maxWidth: "100%",
                      minHeight: "100%",
                      maxHeight: "100%",
                    }}
                  />
                  <noscript>
                    &lt;img
                    srcSet="/_next/image?url=%2Fblack-logo.png&amp;amp;w=256&amp;amp;q=75
                    1x,
                    /_next/image?url=%2Fblack-logo.png&amp;amp;w=384&amp;amp;q=75
                    2x"
                    src="/_next/image?url=%2Fblack-logo.png&amp;amp;w=384&amp;amp;q=75"
                    decoding="async" data-nimg="intrinsic"
                    style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%"
                    loading="lazy"/&gt;
                  </noscript>
                </span>
              </a>
            </div>
            <div className="flex gap-24 h-full align-center cursor-pointer Header_nav-container__MeHQZ">
              <div className=" Header_menu__jRq_R h-full flex align-center ">
              <Link to={`/user/search`}>
                <label htmlFor="" className="md">
                  Tìm du thuyền
                </label>
              </Link>
              </div>
              <div className=" Header_menu__jRq_R h-full flex align-center ">
                <label htmlFor="" className="md">
                  Tìm vé máy bay
                </label>
              </div>
              <div className=" Header_menu__jRq_R h-full flex align-center ">
                <label htmlFor="" className="md">
                  Tìm khách sạn
                </label>
              </div>
              <div className=" Header_menu__jRq_R h-full flex align-center ">
                <label htmlFor="" className="md">
                  Doanh nghiệp
                </label>
              </div>
              <div className=" Header_menu__jRq_R h-full flex align-center ">
                <label htmlFor="" className="md">
                  Blog
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-16 align-center">
            <div className="Header_menu__jRq_R"> </div>
            <div className="Header_phone__W1bq7">
              <div className="Header_phone-icon__x1ti3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M21.384,17.752a2.108,2.108,0,0,1-.522,3.359,7.543,7.543,0,0,1-5.476.642C10.5,20.523,3.477,13.5,2.247,8.614a7.543,7.543,0,0,1,.642-5.476,2.108,2.108,0,0,1,3.359-.522L8.333,4.7a2.094,2.094,0,0,1,.445,2.328A3.877,3.877,0,0,1,8,8.2c-2.384,2.384,5.417,10.185,7.8,7.8a3.877,3.877,0,0,1,1.173-.781,2.092,2.092,0,0,1,2.328.445Z" />
                </svg>
              </div>
              <a href="tel:0922222016">Hotline: 0922222016</a>
            </div>
            <div>
              <button
                type="button"
                className="Button_button__QHarr  Button_button-sm__ljQtM Button_button-color__7QnYK  "
              >
                <div className="label sm">Liên hệ Mixivivu</div>
              </button>
            </div>
            <div className="Header_menu-mb__P5vxd">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 7C4 5.34315 5.34315 4 7 4C8.65685 4 10 5.34315 10 7C10 8.65685 8.65685 10 7 10C5.34315 10 4 8.65685 4 7Z"
                    stroke="#1D2939"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 7C14 5.34315 15.3431 4 17 4C18.6569 4 20 5.34315 20 7C20 8.65685 18.6569 10 17 10C15.3431 10 14 8.65685 14 7Z"
                    stroke="#1D2939"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 17C14 15.3431 15.3431 14 17 14C18.6569 14 20 15.3431 20 17C20 18.6569 18.6569 20 17 20C15.3431 20 14 18.6569 14 17Z"
                    stroke="#1D2939"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 17C4 15.3431 5.34315 14 7 14C8.65685 14 10 15.3431 10 17C10 18.6569 8.65685 20 7 20C5.34315 20 4 18.6569 4 17Z"
                    stroke="#1D2939"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* ---end_Header */}
        </div>
      </div>
    </>
  );
};
export default Header;
