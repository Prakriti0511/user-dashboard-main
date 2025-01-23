// Defining client-side component for user activities
"use client"
import React, { useState, useEffect } from 'react';

// Activities component to display user activities
export default function Activities() {
  const [activities, setActivities] = useState([]); // State to store activities
  const [searchText, setSearchText] = useState(''); // Search input state

  // Fetch user activities from the mock API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div className="mx-4 lg:mx-0">
      <h2 className="text-3xl lg:text-4xl font-bold text-background mt-6 mb-4">User Activities</h2>
      <hr />
      <div className="md:flex justify-start items-center mt-8 mb-6">
        {/* Search input */}
        <label className="pr-2 md:px-3 py-2" htmlFor="search">
          Search :
        </label>
        <input
          className="py-1 px-3 rounded-lg border border-zinc-200 focus:outline-1 outline-background"
          type="text"
          id="search"
          name="search"
          placeholder="Search by title"
          value={searchText} // Set initial value from search state
          onChange={(event) => setSearchText(event.target.value)} // Update search state on input change
        />
      </div>

      <div className="mb-6">
        {/* Display filtered activities */}
        {activities
          .filter((activity) => {
            if (!searchText) return true; // Show all activities if search term is empty
            return activity.title.toLowerCase().includes(searchText.toLowerCase());
          })
          .map((activity) => (
            <div
              key={activity.id}
              className="border rounded-lg p-4 mb-4 shadow-sm bg-white"
            >
              <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
              <p className="text-gray-600">{activity.body}</p>
              <p className="text-gray-400 text-sm mt-2">Post ID: {activity.id}</p>
            </div>
          ))}

        {/* Show message if no activities match the search */}
        {activities.length > 0 && !activities.some(activity => activity.title.toLowerCase().includes(searchText.toLowerCase())) && (
          <p className="text-gray-500">No activities match your search.</p>
        )}
      </div>
    </div>
  );
}
