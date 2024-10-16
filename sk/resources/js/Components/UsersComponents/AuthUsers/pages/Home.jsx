import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Home = () => {
  const showAlert = async () => {
    await MySwal.fire({
      title: 'You Earned 25 points',
      text: 'for referral bonus',
      html: `<div style="font-size: 70px; color: gold;">&#9733;</div>`, // Unicode star character
      confirmButtonText: 'Okay',
    });
  };

  const handleClick = () => {
    // Simulate a successful response
    const response = true;
    if (response) {
      showAlert();
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Claim Streak</button>
    </div>
  );
};

export default Home;
