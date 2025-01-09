import React from "react";
import { Typography, IconButton } from "@material-tailwind/react";

const links = [
  { title: "Company", href: "#" },
  { title: "About Us", href: "#" },
  { title: "Team", href: "#" },
  { title: "Blog", href: "#" },
];

const socialMedia = [
  { icon: "/img/facebook.png", href: "https://facebook.com" },
  { icon: "/img/instagram.png", href: "https://twitter.com" },
  { icon: "/img/gmail.png", href: "https://linkedin.com" },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="py-16 text-gray-100 bg-gray-900">
      <div className="container px-8 mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-12 lg:gap-8">
          {/* Links Section */}
          <div>
            <Typography
              variant="h6"
              className="mb-4 text-lg font-semibold text-gray-100"
            >
              Quick Links
            </Typography>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <Typography
                    as="a"
                    href={link.href}
                    className="text-gray-400 transition hover:text-gray-100"
                  >
                    {link.title}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="text-center">
            <Typography
              variant="h6"
              className="mb-4 text-lg font-semibold text-gray-100"
            >
              Follow Us
            </Typography>
            <div className="flex items-center justify-center w-full gap-4">
              {socialMedia.map((media, index) => (
                <IconButton
                  key={index}
                  as="a"
                  href={media.href}
                  variant="text"
                  ripple={false}
                >
                  {media.icon.startsWith("/img") ? (
                    <img
                      src={media.icon}
                      alt="social-icon"
                      className="w-6 h-6 transition hover:opacity-80"
                    />
                  ) : (
                    <i
                      className={`${media.icon} text-lg text-gray-400 hover:text-gray-100`}
                    />
                  )}
                </IconButton>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <Typography
              variant="h6"
              className="mb-4 text-lg font-semibold text-gray-100"
            >
              Contact Us
            </Typography>
            <Typography className="text-gray-400">
              Brgy. San Nicolas 1 ,
              <br />
              City of Dasmariñas Cavite, Philippines
            </Typography>
            <Typography
              as="a"
              href="mailto:support@skconnect.com"
              className="block mt-2 text-gray-400 transition hover:text-gray-100"
            >
              kabataangUno@gmail.com
            </Typography>
            <Typography
              as="a"
              href="tel:+1234567890"
              className="block text-gray-400 transition hover:text-gray-100"
            >
              +1 (234) 567-890
            </Typography>
            <Typography className="mt-4 text-gray-400">
              Operating Hours: Mon-Fri, 8:00 AM - 5:00 PM
            </Typography>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-700"></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <Typography className="text-sm text-center text-gray-400 lg:text-left">
            Copyright &copy; {currentYear} SK Connect. All Rights Reserved.
          </Typography>
          <ul className="flex flex-wrap items-center gap-4 mt-4 lg:mt-0">
            <li>
              <Typography
                as="a"
                href="#"
                className="text-sm text-gray-400 transition hover:text-gray-100"
              >
                Privacy Policy
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="#"
                className="text-sm text-gray-400 transition hover:text-gray-100"
              >
                Terms of Service
              </Typography>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
