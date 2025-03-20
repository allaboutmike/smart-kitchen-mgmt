"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

// Define types for our notification data
interface NotificationBase {
  id: number;
  type: string;
  message: string;
  severity: 'critical' | 'warning' | 'success' | 'info';
}

interface InventoryNotification extends NotificationBase {
  type: 'inventory';
  item: string;
}

interface AlertNotification extends NotificationBase {
  type: 'alert';
}

type Notification = InventoryNotification | AlertNotification;

const RestaurantDashboard: React.FC = () => {
  // State for notifications with proper typing
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to get notification style based on severity
  const getNotificationStyle = (severity: Notification['severity']): string => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 border-l-4 border-red-500';
      case 'warning':
        return 'bg-yellow-50 border-l-4 border-yellow-500';
      case 'success':
        return 'bg-green-50 border-l-4 border-green-500';
      case 'info':
      default:
        return 'bg-blue-50 border-l-4 border-blue-500';
    }
  };

  // Helper function to check if an inventory notification is for low inventory
  const isLowInventory = (notification: Notification): boolean => {
    if (notification.type === 'inventory') {
      return notification.severity === 'warning' || notification.severity === 'critical';
    }
    return false;
  };

  // Simulate fetching notifications from backend
  useEffect(() => {
    const fetchNotifications = async (): Promise<void> => {
      setIsLoading(true);
      try {
        // In a real implementation, replace this with actual API call
        // something like const response = await fetch('/api/notifications');
        // const data: Notification[] = await response.json();
        
        // Simulated backend response with more mock data
        const data: Notification[] = [
          { id: 1, item: 'Tomato', type: 'inventory', message: 'inventory is getting low.', severity: 'warning' },
          { id: 2, item: 'Bun', type: 'inventory', message: 'inventory is getting low.', severity: 'warning' },
          { id: 3, message: 'Heavy Traffic is expected tomorrow starting at 2pm.', type: 'alert', severity: 'info' },
          { id: 4, item: 'Lettuce', type: 'inventory', message: 'inventory is critically low.', severity: 'critical' },
          { id: 5, message: 'New employee training scheduled for Friday at 9am.', type: 'alert', severity: 'info' },
          { id: 6, item: 'Cheese', type: 'inventory', message: 'inventory has been restocked.', severity: 'success' },
          { id: 7, message: 'System maintenance scheduled for tonight at 2am.', type: 'alert', severity: 'warning' },
          { id: 8, item: 'Chicken', type: 'inventory', message: 'inventory is getting low.', severity: 'warning' },
          { id: 9, message: 'New menu items have been added to the system.', type: 'alert', severity: 'success' },
          { id: 10, item: 'Fries', type: 'inventory', message: 'inventory is getting low.', severity: 'warning' }
        ];
        
        // Delay to simulate network request
        setTimeout(() => {
          setNotifications(data);
          setIsLoading(false);
        }, 500);
      } catch {
        // Error caught but not used
        setError('Failed to load notifications. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const removeNotification = (id: number): void => {
    // In a real implementation, might want to call an API to mark as read/dismissed
    // Example: await fetch(`/api/notifications/${id}`, { method: 'DELETE' });
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const handlePlaceOrder = (item: string): void => {
    // In a real implementation, would navigate to order page or open modal
    console.log(`Placing order for ${item}`);
    // Example: router.push(`/inventory/order/${item.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-xl font-bold italic">Welcome Back!</h1>
        <span>
          Click <Link className="font-semibold link" href="/pos">Here</Link> to visit the POS page.
        </span>
      </div>

      {/* Notification Hub */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Notification Hub</h2>
        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm overflow-y-auto" style={{ maxHeight: 'calc(3 * 90px)' }}>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-md">
              {error}
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              No new notifications at this time
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`mb-3 rounded-md overflow-hidden ${getNotificationStyle(notification.severity)}`}
              >
                <div className="flex justify-between items-center p-4">
                  <div className="flex-1">
                    {notification.type === 'inventory' ? (
                      <p className="text-gray-800">
                        Your <span className="font-bold">{notification.item}</span> {notification.message}{' '}
                        {isLowInventory(notification) && (
                          <button 
                            onClick={() => handlePlaceOrder(notification.item)}
                            className="text-blue-600 font-medium hover:underline focus:outline-none"
                          >
                            Place Order.
                          </button>
                        )}
                      </p>
                    ) : (
                      <p className="text-gray-800">{notification.message}</p>
                    )}
                  </div>
                  <button 
                    onClick={() => removeNotification(notification.id)}
                    className="ml-4 text-gray-700 font-bold hover:bg-gray-200 h-8 w-8 flex items-center justify-center rounded-full focus:outline-none"
                    aria-label="Dismiss notification"
                  >
                    X
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Stay Connected */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* New Updates */}
          <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm hover:shadow transition-shadow duration-200">
            <div className="flex items-center justify-center mb-4">
              <span className="text-yellow-500 text-2xl mr-2">🔔</span>
              <h3 className="text-lg font-bold">New Updates</h3>
            </div>
            <p className="text-center">
              Get ready for the next phaser of Dine Flow with online ordering dashboards.
            </p>
          </div>

          {/* Blog Articles */}
          <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm hover:shadow transition-shadow duration-200">
            <div className="flex items-center justify-center mb-4">
              <span className="text-blue-500 text-2xl mr-2">📘</span>
              <h3 className="text-lg font-bold">Blog Articles</h3>
            </div>
            <p className="text-center">
              Check out the Dine Flow blog for daily articles on restaurant management and trending subjects.
            </p>
          </div>

          {/* Video Tutorials */}
          <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm hover:shadow transition-shadow duration-200">
            <div className="flex items-center justify-center mb-4">
              <span className="text-red-500 text-2xl mr-2">📹</span>
              <h3 className="text-lg font-bold">Video Tutorials</h3>
            </div>
            <p className="text-center">
              Feeling stuck. New video tutorials and walkthroughs in our video library.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;