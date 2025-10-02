import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { developerStaticRoutes } from '../../utils/urlHelper';

const Header = () => {
    const location = useLocation();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { path: developerStaticRoutes.toDashBoard(), label: 'Dashboard' },
        { path: developerStaticRoutes.toProjectsListing(), label: 'Project' },
        { path: '/properties', label: 'Properties' },
        { path: '/enquiries', label: 'Enquiries' },
        { path: '/configurator', label: 'Configurator' },
    ];

    const dropdownOptions = [
        { path: '/profile', label: 'Profile' },
        { path: '/settings', label: 'Settings' },
        { path: '/logout', label: 'Logout' },
    ];

    return (
        <header className='header_section top-4 mx-4 sticky z-30 '>
            <div className="bg-whitePrimary rounded-full shadow-md">
                <div className="mx-3 px-6 py-2">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-shrink-0">
                            <Link to="/" className="cursor-pointer">
                                <img
                                    className="h-5 w-auto"
                                    src="https://gold-sky-media.s3.eu-north-1.amazonaws.com/uploads/8750e5f5-9984-44f8-9b54-45c5cc64d7fc.png"
                                    alt="Propti"
                                />
                            </Link>
                        </div>
                        <nav className="hidden lg:flex items-center bg-gray-50 rounded-full p-1">
                            {navLinks?.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-4 py-2 text-sm font-medium rounded-full mx-1 transition-colors ${location.pathname.startsWith(link.path)
                                        ? 'bg-orangePrimary text-white'
                                        : 'text-black hover:bg-orangePrimary hover:text-white'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="hidden lg:flex items-center space-x-4">
                            <button className="text-gray-500 cursor-pointer">
                                <span>🇬🇧</span>
                            </button>
                            <button className="text-gray-500 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            <button className="text-gray-500 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>
                            <div
                                className="relative"
                                onMouseEnter={() => setDropdownOpen(true)}
                                onMouseLeave={() => setDropdownOpen(false)}
                            >
                                <button className="flex items-center cursor-pointer">
                                    <img
                                        className="h-8 w-8 rounded-full object-cover"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt="User"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <div
                                    className={`absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 z-10 transition-all duration-300 ease-in-out transform ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                        }`}
                                    style={{ pointerEvents: isDropdownOpen ? 'auto' : 'none' }}
                                >
                                    {dropdownOptions.map((option) => (
                                        <Link
                                            key={option.path}
                                            to={option.path}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            {option.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="lg:hidden flex items-center">
                            <button onClick={() => setMobileMenuOpen(true)} className="text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Mobile menu */}
                <div className={`fixed inset-0 bg-white z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
                    <div className="flex justify-end p-4">
                        <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <nav className="flex flex-col items-center mt-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`py-2 text-lg ${location.pathname.startsWith(link.path) ? 'text-orangePrimary' : 'text-black'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="mt-8">
                            <div
                                className="relative"
                            >
                                <div className="flex items-center cursor-pointer">
                                    <img
                                        className="h-12 w-12 rounded-full object-cover"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt="User"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-6 mt-8">
                            <button className="text-gray-500 cursor-pointer">
                                <span>🇬🇧</span>
                            </button>
                            <button className="text-gray-500 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            <button className="text-gray-500 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-8">
                            {dropdownOptions.map((option) => (
                                <Link
                                    key={option.path}
                                    to={option.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block py-2 text-lg text-gray-700"
                                >
                                    {option.label}
                                </Link>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;