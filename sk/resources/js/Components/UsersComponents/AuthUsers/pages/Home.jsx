import React from 'react';
import Swal from 'sweetalert2';



const Home = () => {

    const image = 'img/icons8-star-48.png'; // Adjust the path if necessary

const showAlert = async () => {
    await Swal.fire({
        title: 'You Earned 25 points',
        text: 'for referral bonus',
        imageUrl: 'img/icons8-star-48.png', // Update this path to your star SVG icon
        imageWidth: 100, // Optional: set the width of the icon
        imageHeight: 100, // Optional: set the height of the icon
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
