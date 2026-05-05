import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { userAPI } from "../services/api";
import Button from "../components/ui/Button";
import LoadingScreen from "../components/common/LoadingScreen";
import { LogOut, User, Mail, Calendar } from "lucide-react";

function Profile() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }

    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const response = await userAPI.getProfile();
        if (response.success) {
          setFormData({
            name: response.user.name,
            email: response.user.email,
          });
        }
      } catch (err) {
        setError(err.message || "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSaving(true);

    if (!formData.name || !formData.email) {
      setError("All fields are required");
      setIsSaving(false);
      return;
    }

    try {
      const response = await userAPI.updateProfile(formData);
      if (response.success) {
        setSuccess("Profile updated successfully!");
        setIsEditing(false);
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      setError("Failed to logout");
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f5f5] to-[#ffffff] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#0a0b0d]">My Profile</h1>
          <p className="mt-2 text-gray-600">Manage your account information</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 rounded-lg bg-green-50 p-4 text-green-600 border border-green-200">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600 border border-red-200">
            {error}
          </div>
        )}

        {/* Profile Card */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#1652f0] to-[#0a3ec3] px-6 py-12 text-white">
            <div className="flex items-center space-x-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <User size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{formData.name}</h2>
                <p className="text-blue-100">{formData.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-6 py-8">
            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#1652f0] focus:outline-none"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#1652f0] focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Form Actions */}
                <div className="flex gap-4 pt-4">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 bg-[#1652f0]"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                {/* Name Display */}
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <User size={20} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-lg font-semibold text-gray-900">{formData.name}</p>
                    </div>
                  </div>
                </div>

                {/* Email Display */}
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <Mail size={20} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="text-lg font-semibold text-gray-900">{formData.email}</p>
                    </div>
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <Calendar size={20} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <Button
                    variant="primary"
                    onClick={() => setIsEditing(true)}
                    className="flex-1 bg-[#1652f0]"
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleLogout}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} />
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Account Security Info */}
        <div className="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm text-yellow-800">
            <strong>Security Tip:</strong> Your password is never displayed. Keep it secure and never share it with anyone.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
