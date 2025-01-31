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
import { useLocation } from 'react-router-dom'; // Import useLocation

export const DashboardPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamStatus, setTeamStatus] = useState("");
  const [teamZone, setTeamZone] = useState("");
  const [team, setTeam] = useState("");
  const [showAddMember, setShowAddMember] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditMember, setCurrentEditMember] = useState<TeamMember | null>(null);

  const location = useLocation(); // Get current URL location
  const teamName = new URLSearchParams(location.search).get("teamName"); // Extract teamName from query parameters
  console.log("URL TEAM", teamName);
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
  const isCaptainFilled = teamMembers.some(
    (member) =>
      member.position === "Captain" &&
      member.first_name &&
      member.last_name &&
      member.mobile_no &&
      member.email
    // member.passportPhoto &&
    // member.ageProof
  );
  console.log("isCaptainFilled", isCaptainFilled);
  // console.log("captain data", teamMembers.find(member => member.position === "Captain"))

  // ✅ Add a New Team Member (API Call)
  const handleAddMember = async (memberData: TeamMember) => {
    console.log("memberdata", memberData);
    try {
      const response = await axios.post(`http://localhost:8080/api/addmember/${teamName}`, {
        first_name: memberData.firstName,  // matches backend column name
        middle_name: memberData.middleName, // matches backend column name
        last_name: memberData.lastName, // matches backend column name
        position: memberData.position, // matches backend column name
        gender: memberData.gender, // matches backend column name
        dob: memberData.dob, // matches backend column name
        email: memberData.email, // matches backend column name
        mobile_no: memberData.mobile, // matches backend column name (mobile_no in backend)
        t_shirt_size: memberData.tShirtSize, // matches backend column name
        track_pant_size: memberData.trackpantSize, // matches backend column name
        passport_picture: memberData.passportPhoto,
        age_proof: memberData.ageProof
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
    // if (teamMembers.length >= 11) {
    //   toast.error("Cannot add more than 10 members");
    //   return;
    // }

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

  // ✅ Edit Member Modal

  // const handleEditMember = (id: string) => {
  //   console.log("Edit id", id);
  //   const memberToEdit = teamMembers.find((member) => member.team_id === id);
  //   if (memberToEdit) {
  //     setCurrentEditMember(memberToEdit);
  //     setIsEditModalOpen(true);
  //   }
  // };
  const handleEditMember = (id: string) => {
    console.log("Edit id", id);
    const memberToEdit = teamMembers.find((member) => member.team_id === id);
    if (memberToEdit) {
      setCurrentEditMember(memberToEdit);  // Set member to edit
      setIsEditModalOpen(true);  // Open the modal for editing
    }
  };


  const handleUpdateMember = async (updatedMember: TeamMember) => {
    if (!currentEditMember) {
      toast.error("No member selected for update");
      return;
    }

    const updatedMemberData = {
      first_name: updatedMember.firstName,
      middle_name: updatedMember.middleName,
      last_name: updatedMember.lastName,
      mobile_no: updatedMember.mobile,
      position: updatedMember.position,
      gender: updatedMember.gender,
      dob: updatedMember.dob,
      email: updatedMember.email,
      t_shirt_size: updatedMember.tShirtSize,
      track_pant_size: updatedMember.trackpantSize,
      passport_picture: updatedMember.passportPhoto,
      age_proof: updatedMember.ageProof,
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/api/editmember/${currentEditMember.team_id}`,
        updatedMemberData
      );
      console.log("response of updated api", response);
      if (response.data.success) {
        setTeamMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.team_id === currentEditMember.team_id
              ? { ...member, ...updatedMemberData }
              : member
          )
        );

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


  // ✅ Search Filter
  const filteredMembers = teamMembers.filter((member) =>
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <span className="font-medium text-gray-900">{team}</span>
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
          <div className="mt-4">
            <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

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
