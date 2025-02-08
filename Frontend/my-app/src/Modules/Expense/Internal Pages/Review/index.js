import React, {useState} from 'react'
import LoginForm from './loginForm';
import ReviewSummary from './ReviewPage';

const ReviewMain = () => {

  const [username, setUsername] = useState("");

  return (
    <div className=''>

   {/* <LoginForm/> */}


      {username ? (
        <ReviewSummary username={username} />
      ) : (
        <LoginForm setUsername={setUsername} />
      )}



  </div>
  )
}

export default ReviewMain;
