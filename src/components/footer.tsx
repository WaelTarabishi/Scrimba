import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import MaxWidthWrapper from "@/lib/max-widht-wrapper";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Logo from "../../public/empty-cart.png";
const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 py-12">
      <MaxWidthWrapper className="px-5 md:px-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-bold text-yellow-500">
                Scrimba.
              </span>
              <p className="text-sm mb-4 mt-2">
                Elevate your style with our curated collection of trendy and
                comfortable clothing.
              </p>
              <div className="flex items-center">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="mr-2"
                />
                <Button variant="default" className="text-white">
                  Subscribe
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {["Home", "Products", "About Us", "Contact"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="hover:text-yellow-500 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">
                Customer Service
              </h4>
              <ul className="space-y-2">
                {["FAQ", "Shipping", "Returns", "Size Guide"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="hover:text-yellow-500 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                {[Facebook, Instagram, Twitter].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="hover:text-yellow-500 transition-colors p-2 bg-gray-200 rounded-full">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm">
            <p>
              &copy; {new Date().getFullYear()} Scrimba. All rights reserved.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
