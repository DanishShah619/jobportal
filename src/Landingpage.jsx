import { useNavigate } from "react-router-dom";
import FadingLogoWithArc from "./logo_text";

function Landingpage() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    // Navigate to the signup page
    navigate("/signup");
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto bg-black flex flex-col items-center pt-10 space-y-8">
      {/* Container for the logo and sign-in button */}
      <div className="relative w-full flex justify-center">
        <FadingLogoWithArc />

        {/* Sign In Button */}
        <button
          onClick={handleSignInClick}
          className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
        >
          Sign In
        </button>
      </div>

      {/* Card 1 */}
      <div className="w-full flex justify-center">
        <div
          className="relative max-w-3xl w-full p-9 rounded-2xl shadow-lg transition duration-300 transform hover:brightness-90 z-10"
          style={{ backgroundColor: "#154c79" }}
        >
          <div
            className="absolute -inset-4 blur-2xl rounded-3xl opacity-70 z-[-1] pointer-events-none"
            style={{
              background: "radial-gradient(circle at left, #ff6ec7, transparent 70%)",
            }}
          ></div>

          <div className="text-white text-center space-y-2">
            <h2 className="text-2xl font-semibold">About Us</h2>
            <p className="text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex magni qui perspiciatis sequi nemo? Sed molestiae, quidem soluta ut sint velit quos quisquam dolore, ea saepe cumque suscipit eaque quae.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora expedita accusamus ea nemo ducimus? Doloremque delectus fuga non deserunt vel excepturi asperiores natus quod ex reprehenderit harum iure doloribus aliquam corrupti dignissimos facere nobis sit pariatur, aut accusantium laboriosam beatae distinctio. Impedit eligendi, debitis consectetur, esse maxime nobis cupiditate numquam corporis distinctio, similique saepe.
            </p>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="w-full flex justify-center">
        <div
          className="relative max-w-3xl w-full p-9 rounded-2xl shadow-lg transition duration-300 transform hover:brightness-90 z-10"
          style={{ backgroundColor: "#154c79" }}
        >
          <div
            className="absolute -inset-4 blur-2xl rounded-3xl opacity-70 z-[-1] pointer-events-none"
            style={{
              background: "radial-gradient(circle at left, #ff6ec7, transparent 70%)",
            }}
          ></div>

          <div className="text-white text-center space-y-2">
            <h2 className="text-2xl font-semibold">About Us</h2>
            <p className="text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex magni qui perspiciatis sequi nemo? Sed molestiae, quidem soluta ut sint velit quos quisquam dolore, ea saepe cumque suscipit eaque quae.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora expedita accusamus ea nemo ducimus? Doloremque delectus fuga non deserunt vel excepturi asperiores natus quod ex reprehenderit harum iure doloribus aliquam corrupti dignissimos facere nobis sit pariatur, aut accusantium laboriosam beatae distinctio. Impedit eligendi, debitis consectetur, esse maxime nobis cupiditate numquam corporis distinctio, similique saepe.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white text-center py-6 mt-10">
        <p>&copy; 2025 Your Company Name. All rights reserved.</p>
        <div className="mt-4">
          <a href="/privacy-policy" className="text-blue-400 hover:underline">
            Privacy Policy
          </a>
          <span className="mx-2">|</span>
          <a href="/terms-of-service" className="text-blue-400 hover:underline">
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Landingpage;
