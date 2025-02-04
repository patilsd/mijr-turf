import React, { useState, useEffect } from "react";
import { TeamStatsCard } from "./TeamStatsCard";
import { AddMemberForm } from "./AddMemberForm";
import { TeamMemberTable } from "./TeamMemberTable";
import { SearchBar } from "./SearchBar";
import { Modal } from "./Modal"; // Reusable modal component
import { UserPlus, Shield, Trophy, Users, UserCircle2 } from "lucide-react";
import { TeamMember } from "./../../types";
import toast from "react-hot-toast";
import axios from "axios";  // Import axios for API calls
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate(); // Hook to navigate
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamStatus, setTeamStatus] = useState("");
  const [teamZone, setTeamZone] = useState("");
  const [team, setTeam] = useState("");
  const [showAddMember, setShowAddMember] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditMember, setCurrentEditMember] = useState<TeamMember | null>(null);
  const [showLogout, setShowLogout] = useState(false);
  
  const location = useLocation(); // Get current URL location
  const teamName = new URLSearchParams(location.search).get("teamName"); // Extract teamName from query parameters
  console.log("URL TEAM", teamName);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Replace "authToken" with your actual token key
    if (!token) {
      // Redirect to login page if no token is found
      navigate("/login");
    }
  }, [navigate]);
  // ✅ Fetch Team Members by Team Name
  useEffect(() => {
    const fetchTeamData = async () => {
      if (teamName) {
        try {
          const response = await axios.get(`http://localhost:8080/api/teamName/${teamName}`);
          console.log("response", response.data.data[0].team_name);
          if (response.data.success) {
            setTeamMembers(response.data.data); // Assuming response.data.data contains team members
            setTeamStatus(response.data.team_status);
            setTeamZone(response.data.team_zone);
            setTeam(response.data.data[0].team_name);
          } else {
            toast.error("Failed to fetch team members");
          }
        } catch (error) {
          console.error("Error fetching team:", error);
          toast.error("Error loading team data");
        }
      }
    };

    fetchTeamData();
  }, [teamName]); // Re-run when `teamName` changes

  console.log("Team members", teamMembers);
  const isCaptainFilled = teamMembers.some(
    (member) =>
      member.position === "Captain" &&
      member.first_name &&
      member.last_name &&
      member.mobile_no &&
      member.email &&
      member.passport_picture &&
      member.age_proof
  );
  console.log("isCaptainFilled", isCaptainFilled);
 

  const handleAddMember = async (memberData: TeamMember) => {
    console.log("memberdata", memberData);

    // Create FormData to send files and other form data
    const formData = new FormData();
    formData.append('team_id', memberData.team_id);

    formData.append('first_name', memberData.firstName);
    formData.append('middle_name', memberData.middleName);
    formData.append('last_name', memberData.lastName);
    formData.append('position', memberData.position);
    formData.append('gender', memberData.gender);
    formData.append('dob', memberData.dob);
    formData.append('email', memberData.email);
    formData.append('mobile_no', memberData.mobile);
    formData.append('t_shirt_size', memberData.tShirtSize);
    formData.append('track_pant_size', memberData.trackpantSize);

    // Append the files
    if (memberData.passportPhoto) {
      formData.append('passport_picture', memberData.passportPhoto);
    }
    if (memberData.ageProof) {
      formData.append('age_proof', memberData.ageProof);
    }

    try {
      const response = await axios.post(`http://localhost:8080/api/addmember/${teamName}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Ensure the correct content type for file uploads
        },
      });

      console.log(response);

      if (response.data.success) {
        setTeamMembers([...teamMembers, response.data.newMember]); // Append new member from API response
        toast.success("Team member added successfully");
      } else {
        toast.error("Failed to add team member");
      }
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error("Error adding team member");
    }
  };

  // ✅ Delete a Team Member
  const handleDeleteMember = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/delete/${id}`); // Adjust the URL as needed to delete
      if (response.status === 200) {
        setTeamMembers(teamMembers.filter((member) => member.team_id !== id));
        toast.success('Team member removed');
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast.error('Failed to remove team member');
    }
  };

  // ✅ Promote/Demote Team Lead
  const handleToggleRole = (id: string) => {
    setTeamMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, isLead: !member.isLead } : member
      )
    );
    toast.success("Team lead status updated");
  };


  const handleEditMember = (id: number) => {
    console.log("Edit id", typeof (id));
    const memberToEdit = teamMembers.find((member) => member.team_id === id);
    if (memberToEdit) {
      console.log("Member to edit:", memberToEdit); 
      setCurrentEditMember(memberToEdit);  // Set member to edit
      setIsEditModalOpen(true);  // Open the modal for editing
    }
  };



  const handleUpdateMember = async (updatedMember: TeamMember) => {
    console.log("Selected Member", updatedMember);
    if (!currentEditMember || !currentEditMember.team_id) {
      toast.error("Invalid member data");
      return;
    }
 
        console.log("currentEditMember before API call:", currentEditMember);
     // This will log the updated value of currentEditMember
    

    if (!currentEditMember.team_id) {
      toast.error("Team ID is missing for the selected member");
      return;
    }
    console.log("update team id", typeof (currentEditMember.team_id));
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('team_id', updatedMember.team_id);

    formDataToSubmit.append("first_name", updatedMember.firstName);
    formDataToSubmit.append("middle_name", updatedMember.middleName);
    formDataToSubmit.append("last_name", updatedMember.lastName);
    formDataToSubmit.append("mobile_no", updatedMember.mobile);
    formDataToSubmit.append("position", updatedMember.position);
    formDataToSubmit.append("gender", updatedMember.gender);
    formDataToSubmit.append("dob", updatedMember.dob);
    formDataToSubmit.append("email", updatedMember.email);
    formDataToSubmit.append("t_shirt_size", updatedMember.tShirtSize);
    formDataToSubmit.append("track_pant_size", updatedMember.trackpantSize);

    // Log form data for debugging
    console.log("Form data to submit:", formDataToSubmit);

    // Check and append images
    if (updatedMember.passportPhoto instanceof File) {
      formDataToSubmit.append("passport_picture", updatedMember.passportPhoto);
    } else {
      formDataToSubmit.append("passport_picture", updatedMember.passportPhoto || "/assets/sfa_profile.png");
    }

    if (updatedMember.ageProof instanceof File) {
      formDataToSubmit.append("age_proof", updatedMember.ageProof);
    } else {
      formDataToSubmit.append("age_proof", updatedMember.ageProof || "/assets/age.png");
    }

    // Log the form data key-value pairs
    for (let [key, value] of formDataToSubmit.entries()) {
      console.log("key value", key, value);
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/editmember/${currentEditMember.team_id}`,
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );
      console.log("Response from api", response);

      if (response.data.success) {
        // Update the local state
        setTeamMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.team_id === currentEditMember.team_id
              ? { ...member, ...response.data.updatedMember }
              : member
          )
        );
        console.log("Updated team members:", response.data.updatedMember);
        toast.success("Team member updated successfully");
        setIsEditModalOpen(false);
      } else {
        toast.error("Failed to update team member");
      }
    } catch (error) {
      console.error("Error updating team member:", error);
      toast.error("An error occurred while updating team member");
    }
  };



  const filteredMembers = teamMembers.filter((member) =>
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // Toggle the display of logout option
  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  // Handle the logout process
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');

    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <div className="bg-blue-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center flex-wrap py-6">
            <div className="flex items-center mb-4 sm:mb-0">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                MI Junior Turf Cricket
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome</span>
              <div className="flex items-center space-x-2">
                <UserCircle2 className="h-6 w-6 text-gray-400" />
                <button className="font-medium text-gray-900"  onClick={toggleLogout}>{team}</button>
                {showLogout && (
                  <button
                    className="font-medium text-red-600"
                    onClick={handleLogout}>
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <TeamStatsCard
            icon={<Users className="h-6 w-6 text-gray-400" />}
            title="Total Members"
            value={teamMembers.length.toString()}
          />
          <TeamStatsCard
            icon={<Trophy className="h-6 w-6 text-gray-400" />}
            title="Team Status"
            status={teamStatus}
          />
          <TeamStatsCard
            icon={<Shield className="h-6 w-6 text-gray-400" />}
            title="Team Zone"
            value={teamZone}
          />
        </div>

        {/* Team Management Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex flex-wrap justify-between items-center">
              <div className="mb-4 sm:mb-0">
                <h2 className="text-xl font-semibold text-gray-900">
                  Team Management
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your cricket team roster and roles
                </p>
              </div>
              <div className="relative group inline-block">
                <button
                  onClick={() => {
                    if (isCaptainFilled) {
                      setShowAddMember(true);
                    }
                  }}
                  disabled={!isCaptainFilled}
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-sm font-medium w-full sm:w-auto 
      ${isCaptainFilled ? "bg-blue-600 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Add New Member
                </button>

                {!isCaptainFilled && (
                  <span className="absolute -top-10 left-1 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black text-white p-2 rounded shadow-md text-xs whitespace-nowrap">
                    Please fill all your information first using the edit button.
                  </span>
                )}
              </div>

            </div>
          </div>

          {/* Add Member Form */}
          {showAddMember && (
            <AddMemberForm
              onAddMember={handleAddMember}
              onCancel={() => setShowAddMember(false)}
            />
          )}

          {/* Search Bar */}
          {/* <div className="mt-4">
            <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div> */}

          {/* Team Members Table */}
          <div className="mt-6 overflow-x-auto">
            <TeamMemberTable
              members={filteredMembers}
              onPromote={handleToggleRole}
              onDelete={handleDeleteMember}
              onEdit={handleEditMember}
            />
          </div>

          {/* Edit Member Modal */}
          {/* <Modal title="Edit Team Member" isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
            {currentEditMember && (
              <AddMemberForm member={currentEditMember} onAddMember={handleUpdateMember} onCancel={() => setIsEditModalOpen(false)} />
            )}
          </Modal> */}
          <Modal title="Edit Team Member" isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
            {currentEditMember && (
              <AddMemberForm
                member={currentEditMember}  // Pass current member data for editing
                onAddMember={handleUpdateMember}  // Pass function to handle the updated data
                onCancel={() => setIsEditModalOpen(false)}  // Close modal on cancel
              />
            )}
          </Modal>

        </div>
      </div>
    </div>
  );
};

