import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "6522dde5-c0bb-45e6-a619-e0733836b899",
          ...formData,
        }),
      }).then((res) => res.json());

      if (res.success) {
        setSuccessMessage("Thank you for contacting us. We will get back to you soon!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        setErrorMessage(res.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setErrorMessage("There was an error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" container mx-auto py-12 px-4">
      <form onSubmit={handleSubmit} className=" prata-regular max-w-lg mx-auto space-y-4">
        <div>
          <label htmlFor="name" className="prata-regular block text-md mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className=" prata-regular w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="email" className=" prata-regular block text-md mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className=" prata-regular w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="message" className="prata-regular block text-md  mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="prata-regular text-md w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your message"
            rows={4}
          />
        </div>

        {errorMessage && (
          <div className="text-red-600">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-600">{successMessage}</div>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-orange-600 text-white rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Form'}
        </button>
      </form>
    </div>
  );
}

export default App;
