"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useFetch } from '../customHooks/useFetch';

// Define types for our forecast and stock data
interface ForecastItem {
  id: number;
  itemId: string;
  name: string;
  quantity: number;
  bulkOrderQuantity?: number;
}

interface ForecastNotification {
  id: number;
  type: 'forecast';
  date: string;
  items: ForecastItem[];
  severity: 'info'; // Always set to info
}

// Interface for Traffic Forecast
interface TrafficForecastData {
  id: number;
  date: string;
  forecasted_increase: string;
  peak_hour: string;
  busy_periods: string;
  day_of_week: string;
}

// Forecast interface for API responses
interface Forecast {
  forecastid: number;
  recommendation: string;
  recommendationfor: string;
  createdat: string;
}

// Define types for stock data from the endpoint
interface StockItem {
  stockid: number;
  quantity: number;
  cost: string;
  isexpired: boolean;
  receivedtimestamp: string;
  expirationdate: string;
}

interface Ingredient {
  ingredientid: number;
  ingredientname: string;
  bulkOrderQuantity: number;
  stock: StockItem[];
  thresholdquantity: number;
  category: string;
  costperunit: string;
  shelflife: number;
  servingSize: string;
}

interface StockData {
  stock: Ingredient[];
}

// Defining a type for forecast API response 
interface ForecastResponse {
  forecasts?: Forecast[];
  forecast?: Forecast | Forecast[];
  forecastid?: number;
  recommendation?: string;
  recommendationfor?: string;
  createdat?: string;
}

const RestaurantDashboard: React.FC = () => {
  // State for forecast notifications - only keep what we actually use in the UI
  const [notifications, setNotifications] = useState<ForecastNotification[]>([]);
  const [trafficForecasts, setTrafficForecasts] = useState<TrafficForecastData[]>([]);
  const [dismissedNotifications, setDismissedNotifications] = useState<Set<number>>(new Set());
  const [dismissedTrafficForecasts, setDismissedTrafficForecasts] = useState<Set<number>>(new Set());
  
  // Use the useFetch hook to fetch forecast data with proper typing
  const { data: forecastData, isPending: forecastPending } = useFetch<ForecastResponse>('forecast');
  
  // Use the useFetch hook to fetch stock data
  const { data: stockData, isPending: stockPending } = useFetch<StockData>('stocks');

  // Update the loading state calculation
  const isLoading = forecastPending || stockPending;

  // Convert military time (24-hour format) to standard time (12-hour format with AM/PM)
  const convertToStandardTime = (militaryTime: string): string => {
    if (!militaryTime) return '';
    
    // Parse the hour from the militaryTime string
    const hour = parseInt(militaryTime.split(':')[0], 10);
    
    if (isNaN(hour)) return militaryTime; // Return original if parsing fails
    
    // Convert to standard time format
    const period = hour >= 12 ? 'PM' : 'AM';
    const standardHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
    
    return `${standardHour}:00 ${period}`;
  };
  
  // Convert a string of busy periods from military to standard time
  const convertBusyPeriodsToStandardTime = (busyPeriods: string): string => {
    if (!busyPeriods) return '';
    
    // Split the busy periods string by commas and process each period
    return busyPeriods.split(',').map(period => {
      period = period.trim();
      
      // Check if it's a range (contains a hyphen)
      if (period.includes('-')) {
        const [start, end] = period.split('-');
        return `${convertToStandardTime(start)}-${convertToStandardTime(end)}`;
      }
      
      // If it's a single time
      return convertToStandardTime(period);
    }).join(', ');
  };

  // Format date to a more readable format and highlight today
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    
    // Reset hours to compare just the dates
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    
    // Check if it's today
    if (compareDate.getTime() === today.getTime()) {
      return "Today";
    }
    
    // Check if it's tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (compareDate.getTime() === tomorrow.getTime()) {
      return "Tomorrow";
    }
    
    // Otherwise return formatted date
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };
  // Function to extract forecasts from the response - define as useCallback to prevent recreation
  const extractForecasts = useCallback((response: ForecastResponse | null): Forecast[] => {
    if (!response) return [];
    
    // Extract forecasts from various response formats
    let extractedForecasts: Forecast[] = [];
    
    // Case 1: response is an array of forecast objects
    if (Array.isArray(response)) {
      extractedForecasts = response;
    }
    // Case 2: response has a forecasts array property
    else if (response.forecasts && Array.isArray(response.forecasts)) {
      extractedForecasts = response.forecasts;
    }
    // Case 3: response has a forecast property that is an object
    else if (response.forecast) {
      if (Array.isArray(response.forecast)) {
        extractedForecasts = response.forecast;
      } else {
        extractedForecasts = [response.forecast];
      }
    }
    // Case 4: response is a single forecast object
    else if (response.forecastid && response.recommendation) {
      extractedForecasts = [response as Forecast];
    }
    // Case 5: response has a forecast property that is a string (needs JSON parsing)
    else if (typeof response === 'string') {
      try {
        const parsed = JSON.parse(response);
        return extractForecasts(parsed); // Recursively try to extract from parsed object
      } catch {
        console.error('Failed to parse forecast response string');
        return [];
      }
    }
    else {
      console.warn('Unexpected forecast response format:', response);
      return [];
    }
    
    // Get current date for filtering
    const currentDate = new Date();
    // Reset hours to start of day for proper comparison
    currentDate.setHours(0, 0, 0, 0);
    
    // Filter to only show future dates
    return extractedForecasts.filter(forecast => {
      const forecastDate = new Date(forecast.recommendationfor);
      // Reset hours to start of day for proper comparison
      forecastDate.setHours(0, 0, 0, 0);
      // Include forecasts for today and future
      return forecastDate >= currentDate;
    });
  }, []);
  
  // Extract traffic forecasts from forecast data - define as useCallback
  const processTrafficForecasts = useCallback((forecasts: Forecast[]): TrafficForecastData[] => {
    if (!forecasts || forecasts.length === 0) return [];
    
    return forecasts
      .filter(forecast => {
        try {
          const recommendationData = JSON.parse(forecast.recommendation);
          return recommendationData.type === 'traffic_forecast';
        } catch {
          return false;
        }
      })
      .map(forecast => {
        try {
          const recommendationData = JSON.parse(forecast.recommendation);
          const textRecommendation = recommendationData.text_recommendation || '';
          
          // Parse the traffic forecast information from text
          const trafficLevelMatch = textRecommendation.match(/Expect (\w+) traffic on (\w+)/);
          const forecastIncreaseMatch = textRecommendation.match(/Forecasting ([\d.]+)% above normal/);
          const peakHoursMatch = textRecommendation.match(/Peak hours expected around ([\d:]+)/);
          const busyPeriodsMatch = textRecommendation.match(/Multiple busy periods expected: ([^.]+)/);
          
          const dayOfWeek = trafficLevelMatch ? trafficLevelMatch[2] : '';
          const forecastedIncrease = forecastIncreaseMatch ? forecastIncreaseMatch[1] + '%' : '';
          const peakHour = peakHoursMatch ? peakHoursMatch[1] : '';
          const busyPeriods = busyPeriodsMatch ? busyPeriodsMatch[1] : '';
          
          return {
            id: forecast.forecastid,
            date: forecast.recommendationfor,
            forecasted_increase: forecastedIncrease,
            peak_hour: peakHour,
            busy_periods: busyPeriods,
            day_of_week: dayOfWeek
          };
        } catch {
          console.error('Failed to process traffic forecast');
          return {
            id: forecast.forecastid,
            date: forecast.recommendationfor,
            forecasted_increase: '',
            peak_hour: '',
            busy_periods: '',
            day_of_week: ''
          };
        }
      });
  }, []);

  // Process the forecast data into notifications with info severity - define as useCallback
  const processForecastData = useCallback((forecasts: Forecast[], ingredientMapData: Record<string, Ingredient>): ForecastNotification[] => {
    if (Object.keys(ingredientMapData).length === 0 || !forecasts || forecasts.length === 0) {
      return []; // Wait until we have ingredient data
    }
    
    // Filter out traffic forecasts
    const inventoryForecasts = forecasts.filter(forecast => {
      try {
        const recommendationObj = JSON.parse(forecast.recommendation);
        return !recommendationObj.type || recommendationObj.type !== 'traffic_forecast';
      } catch {
        return true; // If we can't parse, assume it's an inventory forecast
      }
    });
    
    if (inventoryForecasts.length === 0) {
      return [];
    }
    
    return inventoryForecasts.map(forecast => {
      try {
        const recommendationObj = JSON.parse(forecast.recommendation);
        
        // Convert recommendations to array of items
        const items: ForecastItem[] = Object.entries(recommendationObj)
          .filter(([key]) => key !== 'type' && key !== 'text_recommendation')
          .map(([itemId, quantity]) => {
            const ingredient = ingredientMapData[itemId];
            return {
              id: parseInt(itemId),
              itemId,
              name: ingredient ? ingredient.ingredientname : `Item ${itemId}`,
              quantity: quantity as number,
              bulkOrderQuantity: ingredient ? ingredient.bulkOrderQuantity : 0
            };
          })
          .filter(item => item.quantity > 0.8) // Only show items with significant quantities
          .sort((a, b) => b.quantity - a.quantity) // Sort by quantity in descending order
          .slice(0, 5); // Take top 5 items
        
        return {
          id: forecast.forecastid,
          type: 'forecast' as const, // Using const assertion
          date: forecast.recommendationfor,
          items,
          severity: 'info' as const // Using const assertion
        };
      } catch {
        console.error('Failed to process forecast data');
        return {
          id: forecast.forecastid,
          type: 'forecast' as const,
          date: forecast.recommendationfor,
          items: [],
          severity: 'info' as const
        };
      }
    }).filter(notification => notification.items.length > 0); // Only return notifications with items
  }, []);

  // Handler functions for dismissing notifications
  const handleDismissNotification = (id: number): void => {
    setDismissedNotifications(prev => new Set([...prev, id]));
  };
  
  // Handler for dismissing traffic forecasts
  const handleDismissTrafficForecast = (id: number): void => {
    setDismissedTrafficForecasts(prev => new Set([...prev, id]));
  };

  // Single useEffect to handle all data processing
  useEffect(() => {
    // Skip if we don't have any data yet
    if (!forecastData || !stockData) {
      return;
    }
    
    // Step 1: Create ingredient map
    const ingredientMap: Record<string, Ingredient> = {};
    stockData.stock.forEach(ingredient => {
      ingredientMap[ingredient.ingredientid.toString()] = ingredient;
    });
    
    // Step 2: Extract forecasts
    const extractedForecasts = extractForecasts(forecastData);
    
    // Step 3: Process traffic forecasts
    const processedTrafficForecasts = processTrafficForecasts(extractedForecasts);
    
    // Step 4: Process inventory forecasts
    const processedNotifications = processForecastData(extractedForecasts, ingredientMap);
    
    // Step 5: Update all state at once to prevent re-renders
    setTrafficForecasts(processedTrafficForecasts);
    setNotifications(processedNotifications);
    
  }, [forecastData, stockData, extractForecasts, processTrafficForecasts, processForecastData]);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-xl font-bold italic text-center">Welcome Back!</h1>
      </div>

      {/* Notification Hub - Now showing all Forecasts */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Upcoming Inventory Forecasts</h2>
        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm overflow-y-auto" style={{ maxHeight: 'calc(3 * 160px)' }}>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            notifications.filter(notification => !dismissedNotifications.has(notification.id)).length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No upcoming forecast recommendations available at this time
              </div>
            ) : (
              notifications
                .filter(notification => !dismissedNotifications.has(notification.id))
                .map(notification => (
                <div 
                  key={notification.id} 
                  className="mb-3 rounded-md overflow-hidden bg-blue-50 border-l-4 border-blue-500"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800 text-lg">
                        {formatDate(notification.date) === "Today" ? "Today's" : 
                         formatDate(notification.date) === "Tomorrow" ? "Tomorrow's" : 
                         formatDate(notification.date) + "'s"} Recommended Prep Quantities
                      </h3>
                      <button 
                        onClick={() => handleDismissNotification(notification.id)}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                        aria-label="Dismiss notification"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="text-gray-600 mb-3">
                      For {new Date(notification.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}, you should prepare:
                    </div>
                    
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      {notification.items.map((item) => (
                        <li key={item.id} className="text-gray-800">
                          <span className="font-medium">{item.name}</span>: {Math.ceil(item.quantity)} units
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </div>
      
      {/* Traffic Forecasts */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Upcoming Traffic Forecasts</h2>
        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm overflow-y-auto" style={{ maxHeight: 'calc(2 * 160px)' }}>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            trafficForecasts.filter(forecast => !dismissedTrafficForecasts.has(forecast.id)).length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No upcoming traffic forecasts available at this time
              </div>
            ) : (
              trafficForecasts
                .filter(trafficForecast => !dismissedTrafficForecasts.has(trafficForecast.id))
                .map((trafficForecast) => (
                <div 
                  key={trafficForecast.id} 
                  className="mb-3 rounded-md overflow-hidden bg-blue-50 border-l-4 border-blue-500"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800 text-lg">
                        {formatDate(trafficForecast.date) === "Today" ? "Today's" : 
                         formatDate(trafficForecast.date) === "Tomorrow" ? "Tomorrow's" : 
                         trafficForecast.day_of_week + "'s"} Traffic Forecast
                      </h3>
                      <button 
                        onClick={() => handleDismissTrafficForecast(trafficForecast.id)}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                        aria-label="Dismiss traffic forecast"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="text-gray-600 mb-3">
                      For {new Date(trafficForecast.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}:
                    </div>
                    
                    <div className="mb-4 space-y-2">
                      <div className="text-gray-800">
                        <span className="font-medium">Forecasted Increase:</span> {trafficForecast.forecasted_increase} above normal
                      </div>
                      
                      {trafficForecast.peak_hour && (
                        <div className="text-gray-800">
                          <span className="font-medium">Peak Hours:</span> {convertToStandardTime(trafficForecast.peak_hour)}
                        </div>
                      )}
                      
                      {trafficForecast.busy_periods && (
                        <div className="text-gray-800">
                          <span className="font-medium">Busy Periods:</span> {convertBusyPeriodsToStandardTime(trafficForecast.busy_periods)}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p className="text-yellow-800 text-sm">
                        <span className="font-bold">Staff Recommendation:</span> Consider additional staffing and ingredient preparation for this busy period.
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </div>
      
      {/* Stay Connected */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Stay Connected</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* New Updates */}
          <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm hover:shadow transition-shadow duration-200">
            <div className="flex items-center justify-center mb-4">
              <span className="text-yellow-500 text-2xl mr-2">🔔</span>
              <h3 className="text-lg font-bold">New Updates</h3>
            </div>
            <p className="text-center">
              Get ready for the next phase of Dine Flow with online ordering dashboards.
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
              Feeling stuck? New video tutorials and walkthroughs in our video library.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;