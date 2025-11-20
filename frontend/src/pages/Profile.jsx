import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext"; // Adjust the path as per your folder structure
import { toast } from "react-toastify";

const ProfilePage = () => {
    const { backendUrl, userData, getUserData, token, setUserData } = useContext(ShopContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        profilePhoto: "",
    });

    // Update the formData state whenever userData changes
    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name || "",
                email: userData.email || "",
                address: userData.address || "",
                phone: userData.phone || "",
                profilePhoto: userData.profilePhoto || "",
            });
        }
    }, [userData]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    profilePhoto: reader.result, // Base64 Image String
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            
            const response = await fetch(`${backendUrl}/api/user/update-profile`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`, 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // userId: userData._id, 
                    name: formData.name,
                    address: formData.address,
                    phone: formData.phone,
                    profilePhoto: formData.profilePhoto, 
                }),
            });
    
            const data = await response.json();
    
            if (!data.success) {
                throw new Error(data.message || "Failed to update profile");
            }
    
            toast.success("Profile updated successfully!");
            setUserData(data.user);      // ✅ store the full user object
            setFormData({               // ✅ sync form fields to the returned user
              name: data.user.name,
              email: data.user.email,
              address: data.user.address,
              phone: data.user.phone,
              profilePhoto: data.user.profilePhoto
            });
            getUserData();              // optionally re-fetch
            setIsEditing(false);
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error("Error updating profile.");
        }
    };

     // Fetch user data when the component mounts
     useEffect(() => {
        if (token) {
            getUserData();
        }
    });
    
    
    
   

    return (
        <div className="p-6 max-w-3xl mx-auto bg-orange-100 shadow-md rounded-lg">
            <h1 className="text-2xl font-semibold mb-4">Profile : </h1>
            <div className="mb-4">
                <label className="block text-gray-900">Profile Photo</label>
                {formData.profilePhoto && (
                    <img src={formData.profilePhoto} alt="Profile" className="w-20 h-20 rounded-full object-cover mb-2" />
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e)}
                    className="w-full px-4 py-2 border rounded-md"
                />
            </div>

            {!isEditing ? (
                <>
                    <p className="mb-2">
                        <strong>Name:</strong> {formData.name || "N/A"}
                    </p>
                    <p className="mb-2">
                        <strong>Email:</strong> {formData.email || "N/A"}
                    </p>
                    <p className="mb-2">
                        <strong>Address:</strong> {formData.address || "N/A"}
                    </p>
                    <p className="mb-2">
                        <strong>Phone Number:</strong> {formData.phone || "N/A"}
                    </p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                    >
                        Edit Profile
                    </button>
                </>
            ) : (
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <button onClick={handleSave} className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                        Save Profile
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
};

export default ProfilePage;
