"use client";

import React from 'react';
import Image from 'next/image';

interface StaffDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  staffMember: {
    name: string;
    position: string;
    imageUrl?: string;
    startDate?: string;
    employmentType?: string;
    availableHours?: {
      [key: string]: string;
    };
    comments?: string;
  } | null;
}

const StaffDetailsModal: React.FC<StaffDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  staffMember 
}) => {
  if (!isOpen || !staffMember) return null;

  // Function to get initials from name (for placeholder)
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  // Format start date to show years of service
  const formatStartDate = (startDate?: string) => {
    if (!startDate) return 'N/A';
    
    const start = new Date(startDate);
    const now = new Date();
    const years = now.getFullYear() - start.getFullYear();
    
    return `${startDate} (${years} years)`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[500px] max-w-full max-h-[90vh] overflow-y-auto">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-blue-500">{staffMember.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>
        
        {/* Staff Details */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
            {/* Image */}
            <div className="w-36 h-36 bg-gray-100 border border-gray-200 rounded-lg mb-4 sm:mb-0 sm:mr-6 overflow-hidden flex-shrink-0">
              {staffMember.imageUrl ? (
                <Image
                  src={staffMember.imageUrl}
                  alt={`${staffMember.name} profile photo`}
                  width={144}
                  height={144}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{getInitials(staffMember.name)}</div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Basic Info */}
            <div className="text-center sm:text-left">
              <p className="font-semibold text-lg text-blue-600 mb-2">{staffMember.position}</p>
              
              <div className="mt-4">
                <p className="font-medium text-gray-700">Start Date:</p>
                <p className="text-gray-600">{formatStartDate(staffMember.startDate)}</p>
              </div>
              
              <div className="mt-2">
                <p className="font-medium text-gray-700">Employment Type:</p>
                <p className="text-gray-600">{staffMember.employmentType || 'N/A'}</p>
              </div>
            </div>
          </div>
          
          {/* Available Hours */}
          <div className="mt-6">
            <p className="font-medium text-gray-700 text-lg border-b pb-2 mb-2">Available Hours:</p>
            {staffMember.availableHours ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(staffMember.availableHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between p-2 bg-gray-50 rounded">
                    <span className="font-medium">{day}:</span>
                    <span>{hours}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No availability information</p>
            )}
          </div>
          
          {/* Comments */}
          <div className="mt-6">
            <p className="font-medium text-gray-700 text-lg border-b pb-2 mb-2">Comments:</p>
            <p className="text-gray-600 p-2 bg-gray-50 rounded min-h-[50px]">
              {staffMember.comments || 'No comments available'}
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffDetailsModal;