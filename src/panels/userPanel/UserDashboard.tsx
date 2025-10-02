import React from "react";
import { Link } from "react-router-dom";
import ImageComponent from "../../components/ImageComponent";
import CommonCard from "../../components/common/cards/common-card";
import UserFooter from "../../components/headers/UserFooter";
import CommonButton from "../../components/common/buttons/CommonButton";

const UserDashboard = () => {
  return (
    <div className="w-full">
      {/* Banner Section */}
      <div
        className="dashboard_banner min-h-screen"
        style={{
          backgroundImage: "url('/hero-banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <div className="container">
          <div className="banner_content">
            <div className="banner_content_box flex flex-col justify-center items-center py-[70px]">
              <div className="px-[20px] py-[8px] rounded-[100px] bg_morphism banner_content_caption text-[18px] flex items-center gap-2">
                <ImageComponent src="../hand-icon.svg" alt="Icon" className="w-6 p-0 m-0" />
                <p className="">Hi, what are you looking for today?</p>
              </div>
              <h1 className="banner_content_heading text-[65px] leading-[100%] text-center mb-[20px]">Discover Premium <br />Properties in 3D</h1>
              <div className="banner_button">
                <Link to="">Explore Listings Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats_section  border-b border-[#DCD8D5]">
        <div className="container">
          <div className="stats_wrapper grid grid-cols-4">
            <div className="stats_item border-r border-[#DCD8D5]">
              <div className="stats_item_box flex flex-col items-center py-[40px] px-[40px]">
                <h2 className="text-[40px] leading-[48px] text-[var(--color-heading)]">
                  50+
                </h2>
                <p className="text-[var(--color-heading)]">Project Completed</p>
              </div>
            </div>
            <div className="stats_item border-r border-[#DCD8D5]">
              <div className="stats_item_box flex flex-col items-center py-[40px] px-[40px]">
                <h2 className="text-[40px] leading-[48px] text-[var(--color-heading)]">
                  100+
                </h2>
                <p className="text-[var(--color-heading)]">Expert Teams</p>
              </div>
            </div>
            <div className="stats_item border-r border-[#DCD8D5]">
              <div className="stats_item_box flex flex-col items-center py-[40px] px-[40px]">
                <h2 className="text-[40px] leading-[48px] text-[var(--color-heading)]">
                  $3.5M
                </h2>
                <p className="text-[var(--color-heading)]">Average Value</p>
              </div>
            </div>
            <div className="stats_item ">
              <div className="stats_item_box flex flex-col items-center py-[40px] px-[40px]">
                <h2 className="text-[40px] leading-[48px] text-[var(--color-heading)]">
                  $49.9M
                </h2>
                <p className="text-[var(--color-heading)]">Highest Value</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Requset Demo Section */}
      <div className="request_demo_section mt-[50px]">
        <div className="container">
          <div className="request_demo_wrapper grid grid-cols-2 gap-[40px]">
            <div className="left_container">
              <ImageComponent
                src="../banner-0.png"
                alt="Banner Image"
                className="object-cover"
              />
            </div>
            <div className="right_container h-full flex flex-col justify-between">
              <div className="right_container_content pb-[150px]">
                <h2 className="text-[42px] text-[var(--color-heading)] leading-[100%] mb-[30px]">
                  All-in-One Real Estate Platform
                </h2>
                <p className="text-[20px] text-[var(--color-heading)] leading-[28px] mb-[30px]">
                  From interactive 3D visualization to secure booking and
                  agreements, Propti simplifies the property journey for
                  developers and buyers alike.
                </p>
                <div>
                  {/* <Link to="" /> */}
                  <CommonButton
                        label="Request a Demo"
                        className="py-3 w-auto rounded-[50px]"
                        type="button"
                    />
                </div>
              </div>
              <div className="right_container_banner">
                <ImageComponent src="../banner-1.png" alt="Banner Image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="working_cards_section mt-[50px]">
        <div className="container">
          {/* Section Heading */}
          <h2 className="text-[42px] text-[var(--color-heading)] leading-[100%] mb-[30px]">
            How it works
          </h2>

          <div className="space-y-8">
            {/* Row 1 */}
            <div className="p-[10px] ps-0 grid md:grid-cols-2 gap-6 bg-white text-black rounded-2xl overflow-hidden border-b border-white/30">
              {/* Left Column */}
              <div className="p-8 flex flex-col justify-between">
                <div className="mb-4">
                  <span className="inline-block items-center justify-center">
                    <ImageComponent src="../card-icon1.svg" alt="Icon" className="p-0"/>
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Project Page Builder
                  </h3>
                  <p className="text-gray-700">
                    Create a dedicated digital showcase for every housing
                    project with responsive layouts tailored to all devices.
                    Highlight verified documents, approvals, and property
                    details in a structured format. Add immersive media such as
                    image galleries, floor plans, and walkthrough videos.
                  </p>
                </div>
              </div>

              {/* Right Column (Image) */}
              <div className="h-full rounded-[8px] overflow-hidden">
                <img
                  src="../card-img4.png"
                  alt="Project Page Builder"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Row 1 */}
            <div className="p-[10px] ps-0 grid md:grid-cols-2 gap-6 bg-white text-black rounded-2xl overflow-hidden border-b border-white/30">
              {/* Left Column */}
              <div className="p-8 flex flex-col justify-between">
                <div className="mb-4">
                  <span className="inline-block items-center justify-center">
                    <ImageComponent src="../card-icon1.svg" alt="Icon" className="p-0"/>
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Project Page Builder
                  </h3>
                  <p className="text-gray-700">
                    Create a dedicated digital showcase for every housing
                    project with responsive layouts tailored to all devices.
                    Highlight verified documents, approvals, and property
                    details in a structured format. Add immersive media such as
                    image galleries, floor plans, and walkthrough videos.
                  </p>
                </div>
              </div>

              {/* Right Column (Image) */}
              <div className="h-full rounded-[8px] overflow-hidden">
                <img
                  src="../card-img4.png"
                  alt="Project Page Builder"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Row 1 */}
            <div className="p-[10px] ps-0 grid md:grid-cols-2 gap-6 bg-white text-black rounded-2xl overflow-hidden border-b border-white/30">
              {/* Left Column */}
              <div className="p-8 flex flex-col justify-between">
                <div className="mb-4">
                  <span className="inline-block items-center justify-center">
                    <ImageComponent src="../card-icon1.svg" alt="Icon" className="p-0"/>
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Project Page Builder
                  </h3>
                  <p className="text-gray-700">
                    Create a dedicated digital showcase for every housing
                    project with responsive layouts tailored to all devices.
                    Highlight verified documents, approvals, and property
                    details in a structured format. Add immersive media such as
                    image galleries, floor plans, and walkthrough videos.
                  </p>
                </div>
              </div>

              {/* Right Column (Image) */}
              <div className="h-full rounded-[8px] overflow-hidden">
                <img
                  src="../card-img4.png"
                  alt="Project Page Builder"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Listing Section */}
      <div className="property_listing_section my-[50px]">
        <div className="container">
          <div className="property_listing_container">
            <div className="heading_section mb-[30px]">
              <h2 className="section_heading text-[48px] leading-[53px] text-[var(--color-heading)]">
                Smart Features That <br />
                Differentiate Propti
              </h2>
            </div>
            <div className="property_listing_wrapper grid grid-cols-3 gap-[30px]">
              <CommonCard
                image="/card-img.png"
                title="Skyline Residences"
                subtitle="Premium Apartment Complex"
                location="Mumbai, Bandra West"
                price="$250k - $420k"
                status="Available"
                className=""
              />
              <CommonCard
                image="/card-img2.png"
                title="Skyline Residences"
                subtitle="Premium Apartment Complex"
                location="Mumbai, Bandra West"
                price="$250k - $420k"
                status="Available"
                className=""
              />
              <CommonCard
                image="/card-img3.png"
                title="Skyline Residences"
                subtitle="Premium Apartment Complex"
                location="Mumbai, Bandra West"
                price="$250k - $420k"
                status="Available"
                className=""
              />
            </div>
          </div>
        </div>
      </div>

      <UserFooter />
    </div>
  );
};

export default UserDashboard;
