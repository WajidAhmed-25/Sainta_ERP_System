import React from 'react';

import All_Expense from '../Internal Pages/All Expense/index';
import Review from '../Internal Pages/Review/index';
import Submissions from '../Internal Pages/Submissions/index'

const MainContent = ({ selectedPage }) => {
  // Function to render the content based on the selected page
  const renderContent = () => {
    switch (selectedPage) {
      case 'All Expense':
        return (
          <div>
        <All_Expense/>
          </div>
        );
      case 'Review':
        return (
          <div>
         <Review/>
          </div>
        );
      case 'Submissions':
        return (
          <div>
         <Submissions/>
          </div>
        );
      default:
        return (
          <div>
            <h2 className="text-lg font-bold">Welcome</h2>
            <p>Select an option from the sidebar to see its content.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 p-6 mr-4 bg-white rounded-lg shadow-2xl">
      <h1 className="inline-block p-2 text-3xl font-semibold bg-white rounded-md">
      {selectedPage}
      </h1>

      <div className="mt-8 ">{renderContent()}</div>
    </div>
  );
};

export default MainContent;














