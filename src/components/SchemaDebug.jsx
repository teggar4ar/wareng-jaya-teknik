import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SchemaDebug component for rendering schema.org data in a human-readable format
 * Only appears in development mode, never in production
 * 
 * @param {Object} props - Component props
 * @param {Object} props.schema - Schema.org data object
 */
const SchemaDebug = ({ schema }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded shadow"
      >
        {isVisible ? 'Hide Schema' : 'Show Schema'}
      </button>
      
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 overflow-auto p-4">
          <div className="bg-white rounded-lg p-6 max-w-3xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Schema.org Debug</h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(schema, null, 2)}
            </pre>
          </div>
        </div>
      )}
      
      {/* Include the actual schema in the head */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
    </div>
  );
};

export default SchemaDebug;
