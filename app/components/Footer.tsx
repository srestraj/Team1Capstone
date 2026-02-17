const Footer = () => {
  return (
    <footer className="bg-[#F0F0F0]">
      {/* Newsletter Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-black rounded-2xl px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="text-white text-3xl md:text-4xl font-extrabold uppercase tracking-tight max-w-md text-center md:text-left">
            Stay upto date about our latest offers
          </h2>
          <div className="flex flex-col gap-3 w-full md:w-auto min-w-[320px]">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-white rounded-full py-3 pl-12 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <button className="w-full bg-white text-black font-medium rounded-full py-3 px-6 hover:bg-gray-100 transition">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-extrabold text-black tracking-tight">SHOP.CO</h3>
            <p className="mt-4 text-gray-500 text-sm leading-relaxed max-w-xs">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-black hover:bg-black hover:text-white transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-black hover:bg-black hover:text-white transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-black hover:bg-black hover:text-white transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-medium text-black uppercase tracking-wider text-sm mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-500 hover:text-black transition text-sm">About</a></li>
                <li><a href="#" className="text-gray-500 hover:text-black transition text-sm">Features</a></li>
                <li><a href="#" className="text-gray-500 hover:text-black transition text-sm">Works</a></li>
                <li><a href="#" className="text-gray-500 hover:text-black transition text-sm">Career</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-black uppercase tracking-wider text-sm mb-4">Help</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-500 hover:text-black transition text-sm">Customer Support</a></li>
                <li><a href="#" className="text-gray-500 hover:text-black transition text-sm">Delivery Details</a></li>
                <li><a href="#" className="text-gray-500 hover:text-black transition text-sm">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-500 hover:text-black transition text-sm">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-black uppercase tracking-wider text-sm mb-4">FAQ</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-500 hover:text-black transition text-sm">Account</a></li>
                <li><a href="#" className="text-gray-500 hover:text-black transition text-sm">Manage Deliveries</a></li>
                <li><a href="#" className="text-gray-500 hover:text-black transition text-sm">Orders</a></li>
                <li><a href="#" className="text-gray-500 hover:text-black transition text-sm">Payments</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-black uppercase tracking-wider text-sm mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-500 hover:text-black transition text-sm">Free eBooks</a></li>
                <li><a href="#" className="text-gray-500 hover:text-black transition text-sm">Development Tutorial</a></li>
                <li><a href="#" className="text-gray-500 hover:text-black transition text-sm">How to - Blog</a></li>
                <li><a href="#" className="text-gray-500 hover:text-black transition text-sm">Youtube Playlist</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">Shop.co © 2000-2023. All Rights Reserved</p>
          <div className="flex items-center gap-3">
            <div className="bg-white rounded px-2 py-1">
              <svg className="h-6 w-auto" viewBox="0 0 48 16" fill="none">
                <rect width="48" height="16" rx="2" fill="white"/>
                <path d="M17.5 8C17.5 9.5 16.5 10.5 15 10.5C13.5 10.5 12.5 9.5 12.5 8C12.5 6.5 13.5 5.5 15 5.5C16.5 5.5 17.5 6.5 17.5 8Z" fill="#EB001B"/>
                <path d="M24.5 8C24.5 9.5 23.5 10.5 22 10.5C20.5 10.5 19.5 9.5 19.5 8C19.5 6.5 20.5 5.5 22 5.5C23.5 5.5 24.5 6.5 24.5 8Z" fill="#F79E1B"/>
                <path d="M18.5 8C18.5 9.2 19.1 10.2 20 10.8C19.1 11.4 18 11.2 17.2 10.4C16.4 9.6 16.2 8.5 16.8 7.6C17.4 8.5 18.5 8 18.5 8Z" fill="#FF5F00"/>
                <text x="26" y="10" fontSize="6" fill="#1A1F71" fontWeight="bold">VISA</text>
              </svg>
            </div>
            <div className="bg-white rounded px-2 py-1">
              <svg className="h-6 w-auto" viewBox="0 0 48 16" fill="none">
                <rect width="48" height="16" rx="2" fill="white"/>
                <circle cx="19" cy="8" r="4" fill="#EB001B"/>
                <circle cx="25" cy="8" r="4" fill="#F79E1B"/>
                <path d="M22 5C23 6 23 10 22 11" stroke="#FF5F00" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="bg-white rounded px-2 py-1">
              <svg className="h-6 w-auto" viewBox="0 0 48 16" fill="none">
                <rect width="48" height="16" rx="2" fill="white"/>
                <text x="4" y="11" fontSize="7" fill="#003087" fontWeight="bold">Pay</text>
                <text x="20" y="11" fontSize="7" fill="#009CDE" fontWeight="bold">Pal</text>
              </svg>
            </div>
            <div className="bg-white rounded px-2 py-1">
              <svg className="h-6 w-auto" viewBox="0 0 48 16" fill="none">
                <rect width="48" height="16" rx="2" fill="white"/>
                <path d="M8 4C8 4 6 4 6 6V10C6 12 8 12 8 12H10V10H8V6H10V4H8Z" fill="black"/>
                <text x="14" y="11" fontSize="6" fill="black" fontWeight="500">Pay</text>
              </svg>
            </div>
            <div className="bg-white rounded px-2 py-1">
              <svg className="h-6 w-auto" viewBox="0 0 48 16" fill="none">
                <rect width="48" height="16" rx="2" fill="white"/>
                <text x="4" y="11" fontSize="6" fill="#4285F4" fontWeight="500">G</text>
                <text x="10" y="11" fontSize="5" fill="black" fontWeight="500">Pay</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;