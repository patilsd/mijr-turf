
import React, { useState, useEffect } from "react";

interface AddMemberFormProps {
  member?: TeamMember; // Optional prop for editing
  onAddMember: (member: TeamMember) => void;
  onCancel: () => void;
}

export const AddMemberForm: React.FC<AddMemberFormProps> = ({
  member,
  onAddMember,
  onCancel,
}) => {
  const [formData, setFormData] = useState<TeamMember>({
    firstName: member?.first_name || '',
    middleName: member?.middle_name || '',
    lastName: member?.last_name || '',
    position: member?.position || '',
    gender: member?.gender || '',
    dob: member?.dob || '',
    email: member?.email || '',
    mobile: member?.mobile_no || '',
    tShirtSize: member?.t_shirt_size || '',
    trackpantSize: member?.track_pant_size || '',
    passportPhoto: member?.passport_picture || '',
    ageProof: member?.age_proof || '',

  });

  // Pre-fill form data when editing
  useEffect(() => {
    if (member) {
      setFormData(member);
    }
  }, [member]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type. Only JPEG, PNG, and PDF are allowed.");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB. Please select a smaller file.");
        return;
      }

      setFormData((prevData) => ({ ...prevData, [name]: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMember(formData); // Pass updated data to parent component
    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-md bg-white shadow-md max-w-4xl mx-auto mt-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="Enter your First Name"
            className="mt-1 p-2 text-sm block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Middle Name (Optional)
          </label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="Enter your Middle Name"
            className="mt-1 p-2 block w-full text-sm border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="Enter your Last Name"
            className="mt-1 p-2 block w-full text-sm border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full text-sm border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Position</option>
            <option value="Captain">Captain</option>
            <option value="Allrounder">Allrounder</option>
            <option value="Wicketkeeper">Wicketkeeper</option>
            <option value="Batter">Batter</option>
            <option value="Bowler">Bowler</option>
            <option value="Member">Member</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full text-sm border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full text-sm border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile No.
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            maxLength={9}
            pattern="[0-9]{}" // Ensure only 10-digit numbers
            required
            placeholder="1234567890"
            className="mt-1 p-2 block w-full text-sm border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="example@example.com"
            className="mt-1 p-2 block w-full text-sm border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            T-Shirt Size
          </label>
          <select
            name="tShirtSize"
            value={formData.tShirtSize}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full text-sm border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Size</option>
            <option value="XXS">XXS (32)</option>
            <option value="XS">XS (34)</option>
            <option value="S">S (36)</option>
            <option value="M">M (38)</option>
            <option value="L">L (40)</option>
            <option value="XL">XL (42)</option>
            <option value="XXL">XXL (44)</option>
            <option value="XXXL">XXXL (46)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Trackpant Size
          </label>
          <select
            name="trackpantSize"
            value={formData.trackpantSize}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full text-sm border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Size</option>
            <option value="XXS">XXS (32)</option>
            <option value="XS">XS (34)</option>
            <option value="S">S (36)</option>
            <option value="M">M (38)</option>
            <option value="L">L (40)</option>
            <option value="XL">XL (42)</option>
            <option value="XXL">XXL (44)</option>
            <option value="XXXL">XXXL (46)</option>
          </select>
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-700">
          Passport Size Picture (JPEG, PNG, PDF, max 5MB)
        </label>
        <input
          type="file"
          name="passportPhoto"
          accept="image/jpeg, image/png, application/pdf"
          onChange={handleFileChange}
          className="mt-6 p-2 block w-full text-sm border border-gray-300 rounded-md shadow-sm"
        />
        {formData.passportPhoto && (
          <p className="text-xs text-gray-500 mt-1">
            Selected: {formData.passportPhoto.name}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Age Identification Proof (Aadhar Card, Birth Certificate) (JPEG, PNG, PDF, max 5MB)
        </label>
        <input
          type="file"
          name="ageProof"
          accept="image/jpeg, image/png, application/pdf"
          onChange={handleFileChange}
          className="mt-1 p-2 block w-full text-sm border border-gray-300 rounded-md shadow-sm"
        />
        {formData.ageProof && (
          <p className="text-xs text-gray-500 mt-1">
            Selected: {formData.ageProof.name}
          </p>
        )}
      </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md w-full md:w-auto"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md w-full md:w-auto"
        >
          Save
        </button>
      </div>
    </form>
  );
};
