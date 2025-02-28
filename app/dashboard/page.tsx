'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { SimulationRun } from '../../components/RunSelector';

export default function DashboardPage() {
  // State for edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRun, setEditingRun] = useState<SimulationRun | null>(null);
  const [description, setDescription] = useState('');

  // Fetch all simulation runs
  const { data: runs, error, isLoading, refetch } = useQuery({
    queryKey: ['runs'],
    queryFn: async () => {
      const response = await fetch('/api/checkpoints');
      if (!response.ok) {
        throw new Error('Failed to fetch simulation runs');
      }
      return response.json();
    },
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Handle run deletion
  const handleDeleteRun = async (runId: string) => {
    // if (confirm('Are you sure you want to hide this simulation run? You won\'t see it in the dashboard anymore.')) {
    if (true) {
      try {
        const response = await fetch(`/api/checkpoints/${runId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to hide simulation run');
        }
        
        // Refetch the runs after successful hiding
        refetch();
      } catch (error) {
        console.error('Error hiding run:', error);
        alert('Failed to hide simulation run. Please try again.');
      }
    }
  };

  // Open edit modal
  const openEditModal = (run: SimulationRun) => {
    setEditingRun(run);
    setDescription(run.description || '');
    setIsEditModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingRun(null);
  };

  // Save description
  const saveDescription = async () => {
    if (!editingRun) return;
    
    try {
      const response = await fetch(`/api/checkpoints/${editingRun.runId}/description`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update description');
      }
      
      // Close modal and refetch runs
      closeEditModal();
      refetch();
    } catch (error) {
      console.error('Error updating description:', error);
      alert('Failed to update description. Please try again.');
    }
  };

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-4">
          Simulation Runs Dashboard
        </h1>
        <p className="text-center text-gray-600 mb-8">
          View and select from all available simulation runs
        </p>
      </header>

      {isLoading && (
        <div className="flex justify-center">
          <p className="text-lg">Loading simulation runs...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>Error loading simulation runs. Please try again later.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {runs?.map((run: SimulationRun) => (
          <div 
            key={run.runId} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800 truncate">
                  Run ID: {run.runId}
                </h2>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  #{run.id}
                </span>
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <p className="text-gray-600 h-12 overflow-hidden flex-grow">
                  {run.description || 'No description available'}
                </p>
                <button 
                  onClick={() => openEditModal(run)}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                  aria-label="Edit description"
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                    />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <svg 
                  className="w-4 h-4 mr-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{formatDate(run.createdAt)}</span>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Link 
                  href={`/?runId=${run.runId}`}
                  className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
                >
                  View Simulation
                </Link>
                
                <button
                  onClick={() => handleDeleteRun(run.runId)}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
                  aria-label="Delete simulation run"
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {runs?.length === 0 && !isLoading && (
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <p className="text-lg text-gray-600">No simulation runs found.</p>
          <p className="text-gray-500 mt-2">
            Create a new simulation to get started.
          </p>
        </div>
      )}

      {/* Edit Description Modal */}
      {isEditModalOpen && editingRun && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Description</h3>
            <p className="text-sm text-gray-500 mb-2">Run ID: {editingRun.runId}</p>
            
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded mb-4 h-32"
              placeholder="Enter a description for this simulation run"
            />
            
            <div className="flex justify-end gap-2">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={saveDescription}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}