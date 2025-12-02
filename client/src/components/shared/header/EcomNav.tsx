"use client";

import LoginModal from "@/components/models/LoginModel";
import { useUserStore } from "@/stores/user.store";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const EcomNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [becomeASeller, setBecomeASeller] = useState(false);
  const [searchTerm,setSearchTerm]=useState('');
  const user = useUserStore((s) => s.user);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


 




  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if ( currentScrollY > 50) {
        // Scrolling down
        console.log(currentScrollY);
        
        setShowTopBar(false);
      } else {
        // Scrolling up
        setShowTopBar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Bar with fixed height container to prevent jittering */}
      <div className="hidden md:block bg-white border-b border-gray-100 overflow-hidden transition-all duration-300 ease-in-out" 
           style={{ height: showTopBar ? '32px' : '0px' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-end mt-2 items-center space-x-2 text-sm text-gray-600">
            <Link href="#" className="hover:text-gray-800 transition-colors text-xs font-semibold">
              Track Order
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="#" className="hover:text-gray-800 transition-colors text-xs font-semibold">
              Store Locator
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/contact_us" className="hover:text-gray-800 transition-colors text-xs font-semibold">
              Contact Us
            </Link>
            { !user && <span className="text-gray-300">|</span>}
           {!user &&  <button className="hover:text-gray-800 cursor-pointer transition-colors text-xs font-semibold"
            onClick={() => {setIsOpen(true);setBecomeASeller(false)}}
            >
              Login
            </button>}
            { <span className="text-gray-300">|</span>}
           { <button className="hover:text-gray-800 cursor-pointer transition-colors text-xs font-semibold"
            onClick={() => {setIsOpen(true);setBecomeASeller(true)}}
            >
              Become a Seller
            </button>}
          </div>
        </div>
      </div>
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} becomeASeller = {becomeASeller}/>
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
           <Link href={"/"}>
             <Image height={200} width={200} alt="" src={"/viron.png"} />
           </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="flex space-x-4 items-center">
            <div className="hidden lg:flex items-center space-x-8">
              {["TRENDING 2025", "T-SHIRTS", "SHIRTS", "BOTTOMS", "JACKETS"].map(
                (item) => (
                  <Link
                    key={item}
                    href="#"
                    className="text-gray-700 text-xs tracking-wider font-sans hover:text-gray-900 font-bold transition-colors"
                  >
                    {item}
                  </Link>
                )
              )}
            </div>

            {/* Search Bar & Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden md:flex items-center relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search for products"
                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
                  />
                </div>
              </div>

              {/* Icons */}
              <div className="flex items-center space-x-1">
                <Link href="/account/wishlist" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Heart size={24} className="text-gray-600" />
                </Link>
                <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                  <ShoppingBag size={24} className="text-gray-600" />
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    2
                  </span>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="text-gray-600" />
                ) : (
                  <Menu size={24} className="text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for products"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
              onChange={(e) => setSearchTerm(e.target.value)}
           
           />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {["TRENDING 2025", "NEW ARRIVALS", "T-SHIRTS", "SHIRTS", "BOTTOMS", "JACKETS", "ACCESSORIES"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                >
                  {item}
                </Link>
              )
            )}

            {/* Mobile Top Bar Links */}
            <div className="pt-4 border-t border-gray-200 mt-4">
              {["Track Order", "Store Locator", "Contact Us", "Login"].map((text) => (
                <Link
                  key={text}
                  href="#"
                  className="block px-3 py-2 text-gray-600 hover:text-gray-800 rounded-lg transition-colors text-sm"
                >
                  {text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default EcomNav;