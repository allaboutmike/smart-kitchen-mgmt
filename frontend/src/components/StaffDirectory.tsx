"use client";

import React, { useState } from 'react';
import NavigationTabs from './NavigationTabs';
import StaffDetailsModal from './StaffDetailsModal';

interface StaffDirectoryProps {
    hideNavigation?: boolean;
}

interface StaffMember {
    id: number;
    name: string;
    position: string;
    tier: string;
    startDate?: string;
    employmentType?: string;
    availableHours?: {
        [key: string]: string;
    };
    comments?: string;
}

const StaffDirectory: React.FC<StaffDirectoryProps> = ({ hideNavigation = false }) => {
    const [activeTab, setActiveTab] = useState('Staff and Team');
    const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // random staff comments for staff; this can be updated later with real data from DB
    const staffComments = [
        "Employee of the month for January 2025; Excellent leadership skills and team management.",
        "Taught by Danny himself on how to properly fry chicken wings.",
        "Currently enrolled in management training program. Expected completion: August 2025.",
        "Fluent in Bovine and Fowl. Assists with translation when needed.",
        "Part-time student at Barn State University, pursuing degree in Clucking Administration.",
        "Previously worked at Chicken King Restaurant Chain for 5 years as assistant manager.",
        "Specialized in inventory management and supply chain optimization.",
        "Typically works morning shifts. Prefers super early schedule due to hen commitments.",
        "Handles most of the social media marketing and promotions for the Pasture location.",
        "Currently mentoring two chick staff members.",
        "Handles special events and catering coordination including egg revealing parties.",
        "Recently relocated from the Coop branch; experience with multiple store layouts.",
        "Working on developing new menu items with Danny himself."
    ];

    // Use Fisher-Yates shuffle algorithm to randomize the comments
    const shuffleArray = (array: string[]) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Shuffle the comments once to ensure randomness but consistency across renders
    const shuffledComments = shuffleArray(staffComments);

    // Mock data for the staff directory with extended information
    const staffMembers: StaffMember[] = [
        {
            //Jenny Allen's will be same since she's big boss 
            id: 1,
            name: 'Jenny Allen',
            position: 'General Manager',
            tier: 'leadership',
            startDate: '03/25/1996',
            employmentType: 'Full Time',
            availableHours: {
                'Monday': '6am-7pm',
                'Tuesday': '6am - 7pm',
                'Wednesday': '6am - 7pm',
                'Thursday': '6am - 7pm',
                'Friday': '6am - 7pm',
                'Saturday': '6am - 7pm',
                'Sunday': '6am - 7pm'
            },
            comments: "Has been with the company since its founding. Excellent at staff development and retention. Known for implementing efficient scheduling systems."
        },
        {
            id: 2,
            name: 'Sarah Brent',
            position: 'Manager',
            tier: 'management',
            startDate: '05/12/2005',
            employmentType: 'Full Time',
            availableHours: {
                'Monday': '8am-4pm',
                'Tuesday': '8am-4pm',
                'Wednesday': '8am-4pm',
                'Thursday': '8am-4pm',
                'Friday': '8am-4pm'
            },
            comments: shuffledComments[0]
        },
        {
            id: 3,
            name: 'Thoman Hart',
            position: 'Manager',
            tier: 'management',
            startDate: '11/05/2010',
            employmentType: 'Full Time',
            availableHours: {
                'Monday': '2pm-10pm',
                'Tuesday': '2pm-10pm',
                'Wednesday': '2pm-10pm',
                'Thursday': '2pm-10pm',
                'Friday': '2pm-10pm'
            },
            comments: shuffledComments[1]
        },
        {
            id: 4,
            name: 'Dan Carter',
            position: 'FT Staff',
            tier: 'staff',
            startDate: '06/15/2018',
            employmentType: 'Full Time',
            availableHours: {
                'Monday': '9am-5pm',
                'Tuesday': '9am-5pm',
                'Wednesday': '9am-5pm',
                'Thursday': '9am-5pm',
                'Friday': '9am-5pm'
            },
            comments: shuffledComments[2]
        },
        {
            id: 5,
            name: 'Kiana Stock',
            position: 'FT Staff',
            tier: 'staff',
            startDate: '03/12/2020',
            employmentType: 'Full Time',
            availableHours: {
                'Monday': '11am-7pm',
                'Tuesday': '11am-7pm',
                'Thursday': '11am-7pm',
                'Friday': '11am-7pm',
                'Saturday': '10am-6pm'
            },
            comments: shuffledComments[3]
        },
        {
            id: 6,
            name: 'Tom Cruise',
            position: 'FT Staff',
            tier: 'staff',
            startDate: '09/22/2021',
            employmentType: 'Full Time',
            availableHours: {
                'Tuesday': '8am-4pm',
                'Wednesday': '8am-4pm',
                'Thursday': '8am-4pm',
                'Friday': '8am-4pm',
                'Saturday': '8am-4pm'
            },
            comments: shuffledComments[4]
        },
        {
            id: 7,
            name: 'Dan',
            position: 'PT',
            tier: 'staff',
            startDate: '04/01/2023',
            employmentType: 'Part Time',
            availableHours: {
                'Friday': '4pm-10pm',
                'Saturday': '12pm-8pm',
                'Sunday': '12pm-8pm'
            },
            comments: shuffledComments[5]
        }
    ];

    // Group staff by tier for display
    const leadershipStaff = staffMembers.filter(member => member.tier === 'leadership');
    const managementStaff = staffMembers.filter(member => member.tier === 'management');
    const regularStaff = staffMembers.filter(member => member.tier === 'staff');

    // Function to handle staff card click
    const handleStaffClick = (staff: StaffMember) => {
        setSelectedStaff(staff);
        setIsModalOpen(true);
    };

    // Staff profile card component
    interface StaffCardProps {
        name: string;
        position: string;
        staff: StaffMember;
    }

    const StaffCard: React.FC<StaffCardProps> = ({ name, position, staff }) => (
        <div
            className="flex flex-col items-center mr-6 mb-8 cursor-pointer hover:opacity-90"
            onClick={() => handleStaffClick(staff)}
        >
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
                                    <StaffCard
                                        key={staff.id}
                                        name={staff.name}
                                        position={staff.position}
                                        staff={staff}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Management */}
                    <div className="mb-8">
                        {managementStaff.length > 0 && (
                            <div className="flex flex-wrap">
                                {managementStaff.map(staff => (
                                    <StaffCard
                                        key={staff.id}
                                        name={staff.name}
                                        position={staff.position}
                                        staff={staff}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Staff */}
                    <div>
                        {regularStaff.length > 0 && (
                            <div className="flex flex-wrap">
                                {regularStaff.map(staff => (
                                    <StaffCard
                                        key={staff.id}
                                        name={staff.name}
                                        position={staff.position}
                                        staff={staff}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Staff Details Modal */}
            <StaffDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                staffMember={selectedStaff}
            />
        </div>
    );
};

export default StaffDirectory;