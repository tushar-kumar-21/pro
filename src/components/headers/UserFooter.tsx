import React from "react";
import { Link } from "react-router-dom";
import ImageComponent from "../ImageComponent";

export default function UserFooter() {
  const footerMenus = [
    {
      title: "Contact & Utility",
      items: [
        { label: "Contact Page", to: "/contact" },
        { label: "Markus Trandem", to: "#" },
        { label: "General Manager", to: "#" },
        { label: "markus@propti.no", to: "mailto:markus@propti.no" },
        { label: "Tel: +47 468 38 614", to: "tel:+4746838614" },
      ],
    },
    {
      title: "Main Pages",
      items: [
        { label: "Home", to: "/" },
        { label: "Properties", to: "/properties" },
        { label: "Cart", to: "/cart" },
      ],
    },
    {
      title: "Legal",
      items: [
        { label: "Privacy Policy", to: "/privacy-policy" },
        { label: "Terms & Condition", to: "/terms" },
        { label: "Help & Support", to: "/help" },
      ],
    },
  ];

  return (
    <div className="relative flex flex-col">
      {/* Hero Section */}
      <div
        className="relative flex-1 flex flex-col justify-center items-center text-center text-white bg-cover bg-center min-h-screen"
        style={{ backgroundImage: "url('../footer-banner.png')" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(17, 17, 17, 0) 25%, #111111 100%)",
          }}
        />
        <div className="relative z-10 max-w-2xl px-4 h-screen py-[80px]">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Find Your Perfect Property Now!
          </h2>
          <p className="text-gray-200 mb-6">
            Browse our latest listings and take the next step toward your dream
            home.
          </p>
          <button className="bg-white text-black px-6 py-3 rounded-lg font-medium shadow hover:bg-gray-200 transition">
            Start Your Search
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="footer_logo_section">
            <Link to="/" className="w-50 inline-block">
              <ImageComponent
                src="../logo-white.svg"
                alt="Logo"
                className=""
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-[40px]">
            {/* Logo & Description */}
            <div>
              <p className="text-sm mb-4">
                The digital home experience of the future
              </p>
              <p className="text-sm">Org.nr: 123 456 789</p>
              <p className="text-sm">Sagveien 66 E</p>
              <p className="text-sm">1555 Son</p>
            </div>

            {/* Dynamic Menus */}
            {footerMenus.map((menu, idx) => (
              <div key={idx}>
                <h3 className="font-semibold mb-4">{menu.title}</h3>
                <ul className="space-y-2 text-sm">
                  {menu.items.map((item, i) =>
                    item.to.startsWith("http") ||
                    item.to.startsWith("mailto:") ||
                    item.to.startsWith("tel:") ? (
                      <li key={i}>
                        <a href={item.to} className="hover:text-white">
                          {item.label}
                        </a>
                      </li>
                    ) : (
                      <li key={i}>
                        <Link to={item.to} className="hover:text-white">
                          {item.label}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className=" mt-10 flex flex-col md:flex-row items-center justify-between px-[20px] py-[15px] bg-[#1B1B1B] rounded-[16px]">
            <p className="test-[16px]">Made in 2025 by Designoweb</p>
            <div className="flex gap-[10px]">
              <a href="#" aria-label="Instagram" className="hover:text-white">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 12.5728C22 7.01623 17.5229 2.51172 12 2.51172C6.47715 2.51172 2 7.01623 2 12.5728C2 17.5945 5.65684 21.7569 10.4375 22.5117V15.4811H7.89844V12.5728H10.4375V10.3562C10.4375 7.83468 11.9305 6.44184 14.2146 6.44184C15.3088 6.44184 16.4531 6.63835 16.4531 6.63835V9.11433H15.1922C13.95 9.11433 13.5625 9.88994 13.5625 10.6856V12.5728H16.3359L15.8926 15.4811H13.5625V22.5117C18.3432 21.7569 22 17.5947 22 12.5728Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-white">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 3.51172H8C5.23858 3.51172 3 5.7503 3 8.51172V16.5117C3 19.2731 5.23858 21.5117 8 21.5117H16C18.7614 21.5117 21 19.2731 21 16.5117V8.51172C21 5.7503 18.7614 3.51172 16 3.51172ZM19.25 16.5117C19.2445 18.3043 17.7926 19.7562 16 19.7617H8C6.20735 19.7562 4.75549 18.3043 4.75 16.5117V8.51172C4.75549 6.71907 6.20735 5.26721 8 5.26172H16C17.7926 5.26721 19.2445 6.71907 19.25 8.51172V16.5117ZM16.75 8.76172C17.3023 8.76172 17.75 8.314 17.75 7.76172C17.75 7.20944 17.3023 6.76172 16.75 6.76172C16.1977 6.76172 15.75 7.20944 15.75 7.76172C15.75 8.314 16.1977 8.76172 16.75 8.76172ZM12 8.01172C9.51472 8.01172 7.5 10.0264 7.5 12.5117C7.5 14.997 9.51472 17.0117 12 17.0117C14.4853 17.0117 16.5 14.997 16.5 12.5117C16.5027 11.3174 16.0294 10.1713 15.1849 9.3268C14.3404 8.48231 13.1943 8.00906 12 8.01172ZM9.25 12.5117C9.25 14.0305 10.4812 15.2617 12 15.2617C13.5188 15.2617 14.75 14.0305 14.75 12.5117C14.75 10.9929 13.5188 9.76172 12 9.76172C10.4812 9.76172 9.25 10.9929 9.25 12.5117Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="#" aria-label="Youtube" className="hover:text-white">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.5931 7.47156C21.4792 7.04896 21.2566 6.66357 20.9475 6.35373C20.6383 6.04389 20.2534 5.82042 19.8311 5.70556C18.2651 5.27556 12.0001 5.26856 12.0001 5.26856C12.0001 5.26856 5.73609 5.26156 4.16909 5.67256C3.74701 5.79271 3.36291 6.01934 3.05365 6.3307C2.7444 6.64205 2.52037 7.02768 2.40309 7.45056C1.99009 9.01656 1.98609 12.2646 1.98609 12.2646C1.98609 12.2646 1.98209 15.5286 2.39209 17.0786C2.62209 17.9356 3.29709 18.6126 4.15509 18.8436C5.73709 19.2736 11.9851 19.2806 11.9851 19.2806C11.9851 19.2806 18.2501 19.2876 19.8161 18.8776C20.2386 18.7629 20.6238 18.5399 20.9337 18.2307C21.2436 17.9215 21.4675 17.5368 21.5831 17.1146C21.9971 15.5496 22.0001 12.3026 22.0001 12.3026C22.0001 12.3026 22.0201 9.03756 21.5931 7.47156ZM9.99609 15.2736L10.0011 9.27356L15.2081 12.2786L9.99609 15.2736Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
