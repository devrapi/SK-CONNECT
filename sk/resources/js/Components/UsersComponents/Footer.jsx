import React from "react";
import { Typography, IconButton } from "@material-tailwind/react";

const links = [
  { title: "Company", href: "#" },
  { title: "About Us", href: "#" },
  { title: "Team", href: "#" },
  { title: "Products", href: "#" },
  { title: "Blog", href: "#" },
  { title: "Pricing", href: "#" },
];

const socialMedia = [
  { icon: "fa-brands fa-twitter", href: "https://twitter.com" },
  { icon: "fa-brands fa-linkedin", href: "https://linkedin.com" },
  { icon: "fa-brands fa-facebook", href: "https://facebook.com" },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-green-200 py-16">
      <div className="container mx-auto px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-12 lg:gap-8">
          {/* Links Section */}
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-4 font-semibold text-lg text-gray-700"
            >
              Quick Links
            </Typography>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <Typography
                    as="a"
                    href={link.href}
                    color="gray"
                    className="text-gray-600 transition hover:text-gray-900"
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
              color="blue-gray"
              className="mb-4 font-semibold text-lg text-gray-700"
            >
              Follow Us
            </Typography>
            <div className="flex items-center justify-center gap-4">
              {socialMedia.map((media, index) => (
                <IconButton
                  key={index}
                  as="a"
                  href={media.href}
                  variant="text"
                  color="gray"
                  ripple={false}
                >
                  <i className={`${media.icon} text-lg text-gray-600 hover:text-gray-900`} />
                </IconButton>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-4 font-semibold text-lg text-gray-700"
            >
              Contact Us
            </Typography>
            <Typography className="text-gray-600">
              1234 SK Connect Avenue,
              <br />
              Cityname, Country
            </Typography>
            <Typography
              as="a"
              href="mailto:support@skconnect.com"
              className="block mt-2 text-gray-600 transition hover:text-gray-900"
            >
              support@skconnect.com
            </Typography>
            <Typography
              as="a"
              href="tel:+1234567890"
              className="block text-gray-600 transition hover:text-gray-900"
            >
              +1 (234) 567-890
            </Typography>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-300"></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <Typography
            color="gray"
            className="text-sm text-center lg:text-left"
          >
            Copyright &copy; {currentYear} SK Connect. All Rights Reserved.
          </Typography>
          <ul className="flex flex-wrap items-center gap-4 mt-4 lg:mt-0">
            <li>
              <Typography
                as="a"
                href="#"
                color="gray"
                className="text-sm transition hover:text-gray-900"
              >
                Privacy Policy
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="#"
                color="gray"
                className="text-sm transition hover:text-gray-900"
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
