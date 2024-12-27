import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsAndCondition = () => {
  const navigate = useNavigate();

  const handleAccept = () => {
    navigate('/'); // Redirect to the home page
  };

  return (
    <div className="max-w-4xl p-8 mx-auto mt-8 bg-white shadow-lg rounded-xl">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-green-700">Terms and Conditions</h1>
        <p className="mt-2 text-gray-600">Learn about the terms to enjoy the benefits of SK Connect.</p>
      </header>
      <section className="space-y-8 text-gray-700">
        <div>
          <h2 className="text-2xl font-semibold text-green-600">Welcome to SK Connect</h2>
          <p className="mt-2">
            SK Connect is your gateway to active participation, engagement, and rewards within your community. By using our platform, you agree to the outlined terms and conditions. If you do not accept these terms, you may not access our services.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-green-600">Your Responsibilities</h2>
          <ul className="pl-6 mt-2 space-y-2 list-disc">
            <li>Ensure that all registration details you provide are accurate and up-to-date.</li>
            <li>Safeguard your account information to prevent unauthorized access.</li>
            <li>Utilize SK Connect respectfully and in compliance with the rules and regulations.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-green-600">Our Privacy Promise</h2>
          <p className="mt-2">
            Your trust is our priority. SK Connect is committed to protecting your privacy and personal information. Please read our{' '}
            <a href="/privacy-policy" className="text-green-600 underline hover:text-green-800">
              Privacy Policy
            </a>{' '}
            to understand how we manage and safeguard your data.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-green-600">Limitation of Liability</h2>
          <p className="mt-2">
            While we strive to ensure the best experience, SK Connect is not responsible for any loss, damages, or inconvenience resulting from the use of our platform. You are responsible for your actions while using the services.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-green-600">Updates to the Terms</h2>
          <p className="mt-2">
            As SK Connect evolves, we may update these terms to reflect changes in our services. It is your responsibility to review the terms periodically. Continued use of our platform indicates acceptance of the latest terms.
          </p>
        </div>
        <footer className="text-center">
          <button
            onClick={handleAccept}
            className="px-8 py-3 mt-8 font-bold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            I Accept
          </button>
        </footer>
      </section>
    </div>
  );
};

export default TermsAndCondition;
