import React from 'react'

export default function SideNavBar({children}: {children: React.ReactNode}) {
  return (
    <div className="side-nav-bar">
      {children}
    </div>
  )
}
