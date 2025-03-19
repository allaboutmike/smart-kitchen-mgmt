"use client";

import React, { useState } from 'react';
import NavigationTabs from './NavigationTabs';

interface StaffDirectoryProps {
  hideNavigation?: boolean;
}

const StaffDirectory: React.FC<StaffDirectoryProps> = ({ hideNavigation = false }) => {
  const [activeTab, setActiveTab] = useState('Staff and Team');

  // Mock data for the staff directory
  const staffMembers = [
    {
      id: 1,
      name: 'Jenny Allen',
      position: 'General Manager',
      tier: 'leadership'
    },
    {
      id: 2,
      name: 'Sarah Brent',
      position: 'Manager',
      tier: 'management'
    },
    {
      id: 3,
      name: 'Thoman Hart',
      position: 'Manager',
      tier: 'management'
    },
    {
      id: 4,
      name: 'Dan Carter',
      position: 'FT Staff',
      tier: 'staff'
    },
    {
      id: 5,
      name: 'Kiana Stock',
      position: 'FT Staff',
      tier: 'staff'
    },
    {
      id: 6,
      name: 'Tom Cruise',
      position: 'FT Staff',
      tier: 'staff'
    },
    {
      id: 7,
      name: 'Dan',
      position: 'PT',
      tier: 'staff'
    }
  ];

  // Group staff by tier for display
  const leadershipStaff = staffMembers.filter(member => member.tier === 'leadership');
  const managementStaff = staffMembers.filter(member => member.tier === 'management');
  const regularStaff = staffMembers.filter(member => member.tier === 'staff');

  // Staff profile card component
  interface StaffCardProps {
    name: string;
    position: string;
  }

  const StaffCard: React.FC<StaffCardProps> = ({ name, position }) => (
    <div className="flex flex-col items-center mr-6 mb-8">
      <div className="w-36 h-36 bg-gray-100 border border-gray-200 rounded-lg mb-2 flex items-center justify-center">
        <p className="text-sm text-gray-800">Picture Here</p>
      </div>
      <h3 className="font-medium text-gray-800">{name}</h3>
      <p className="text-gray-600 italic">{position}</p>
    </div>
  );

  return (
    <div className="w-full max-w-[1000px] mx-auto flex flex-col bg-gray-50">
      {!hideNavigation && (
        <>
          {/* Account Number Header */}
          <div className="text-right p-4">
            <p className="text-sm text-gray-700">Account Number: A802JDJKH20978D</p>
          </div>

          {/* Navigation Tabs Component */}
          <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )}

      {/* Main Content */}
      <div className="px-4 pb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Staff Directory</h1>
        </div>

        {/* Staff Listing */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          {/* Leadership */}
          <div className="mb-8">
            {leadershipStaff.length > 0 && (
              <div className="flex flex-wrap">
                {leadershipStaff.map(staff => (
                  <StaffCard key={staff.id} name={staff.name} position={staff.position} />
                ))}
              </div>
            )}
          </div>

          {/* Management */}
          <div className="mb-8">
            {managementStaff.length > 0 && (
              <div className="flex flex-wrap">
                {managementStaff.map(staff => (
                  <StaffCard key={staff.id} name={staff.name} position={staff.position} />
                ))}
              </div>
            )}
          </div>

          {/* Staff */}
          <div>
            {regularStaff.length > 0 && (
              <div className="flex flex-wrap">
                {regularStaff.map(staff => (
                  <StaffCard key={staff.id} name={staff.name} position={staff.position} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDirectory;