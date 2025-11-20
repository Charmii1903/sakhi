import { useState } from 'react';

const NewsletterBox = () => {
    const [message, setMessage] = useState('');
    const backendUrl = 'http://localhost:4000';

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;

        try {
            const response = await fetch(`${backendUrl}/api/newsletter/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                setMessage('Subscription failed. Please try again.');
                return;
            }

            const data = await response.json();
            if (data.success) {
                setMessage('Thank you for subscribing!');
            } else {
                setMessage(data.message || 'Subscription failed.');
            }
        } catch (error) {
            console.error('Error subscribing:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="text-center">
            <p className="text-2xl font-medium text-gray-800">Subscribe now & get 20% off</p>
            <p className="text-gray-400 mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam hic reprehenderit laborum labore
                magnam delectus dolorum voluptate.
            </p>
            <form
                onSubmit={onSubmitHandler}
                className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
            >
                <input
                    name="email"
                    className="w-full sm:flex-1 outline-none"
                    type="email"
                    placeholder="Enter your email"
                    required
                />
                <button type="submit" className="bg-orange-500 text-white text-xs px-10 py-4 transition-transform transform hover:scale-110">
                    SUBSCRIBE
                </button>
            </form>
            {message && <p className="text-green-500 mt-2">{message}</p>}
        </div>
    );
};

export default NewsletterBox;
