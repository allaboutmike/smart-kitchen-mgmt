import React from 'react'

interface SideNavBarButtonProps {
    svgIcon: React.ReactNode;
    text: string;
}
export default function SideNavBarButton({svgIcon, text}: SideNavBarButtonProps) {
  return (
    <button className="side-nav-bar-button">
      {svgIcon}
      <div>{text}</div>
    </button>
  )
}
