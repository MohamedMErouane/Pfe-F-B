import React from "react";
import Link from "next/link";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, href }) => {
  const renderLink = href ? (
    <Link href={href} passHref>
      <div className="flex items-center py-2 px-4 text-gray-400 hover:text-white cursor-pointer">
        {icon}
        <span className="ml-2">{label}</span>
      </div>
    </Link>
  ) : (
    <div className="flex items-center py-2 px-4 text-gray-400 hover:text-white cursor-pointer">
      {icon}
      <span className="ml-2">{label}</span>
    </div>
  );

  return renderLink;
};

export default NavItem;
