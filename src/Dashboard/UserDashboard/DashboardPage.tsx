import React, { useState, useEffect } from "react";
import { TeamStatsCard } from "./TeamStatsCard";
import { AddMemberForm } from "./AddMemberForm";
import { TeamMemberTable } from "./TeamMemberTable";
import { SearchBar } from "./SearchBar";
import { Modal } from "./Modal"; // Reusable modal component
import { UserPlus, Shield, Trophy, Users, UserCircle2 } from "lucide-react";
import { TeamMember } from "./../../types";
import toast from "react-hot-toast";

export const DashboardPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: "1", firstName: "Rahul", lastName: "David", position: "Captain", isLead: true },
  ]);
  const isCaptainSelected = teamMembers.some((member) => member.position === "Captain");

  const [showAddMember, setShowAddMember] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal visibility
  const [currentEditMember, setCurrentEditMember] = useState<TeamMember | null>(null); // Member being edited

  
  useEffect(() => {
    if (teamMembers.filter((member) => member.isLead).length === 0) {
      setTeamMembers((prev) => {
        const updatedMembers = [...prev];
        updatedMembers[0].isLead = true;
        return updatedMembers;
      });
    }
  }, [teamMembers]);

  const isCaptainFilled = teamMembers.some(
    (member) =>
      member.position === "Captain" &&
      member.firstName &&
      member.lastName &&
      member.mobile &&
      member.email &&
      member.passportPhoto &&
      member.ageProof
  );

  const handleAddMember = (memberData: TeamMember) => {
    if (memberData.position === "Captain" && isCaptainSelected) {
      toast.error("A captain is already selected!");
      return;
    }

    // Check if a member already exists based on First Name and Last Name only (ignoring Middle Name)
    const isMemberExist = teamMembers.some(
      (member) =>
        member.firstName === memberData.firstName &&
        member.lastName === memberData.lastName
    );

    if (isMemberExist) {
      toast.error("User already exists!");
      return;
    }

    if (teamMembers.length >= 10) {
      toast.error("Cannot add more than 10 members");
      return;
    }

    setTeamMembers([
      ...teamMembers,
      { ...memberData, id: Date.now().toString(), isLead: false },
    ]);
    toast.success("Team member added successfully");
  };



  const handleDeleteMember = (id: string) => {
    if (teamMembers.find((m) => m.id === id)?.isLead) {
      toast.error("Cannot delete team lead");
      return;
    }
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
    toast.success("Team member removed");
  };

  const handleToggleRole = (id: string) => {
    const currentLead = teamMembers.find((member) => member.isLead);
    if (currentLead?.id === id) {
      toast.error(
        "You cannot demote the team lead without assigning another lead."
      );
      return;
    }

    const updatedMembers = teamMembers.map((member) =>
      member.id === id
        ? { ...member, isLead: true }
        : { ...member, isLead: false }
    );

    setTeamMembers(updatedMembers);
    toast.success("Team lead changed successfully");
  };

  // Open the modal with the selected member's information
  const handleEditMember = (id: string) => {
    const memberToEdit = teamMembers.find((member) => member.id === id);
    if (memberToEdit) {
      setCurrentEditMember(memberToEdit); // Set current member data
      setIsEditModalOpen(true); // Open the modal
    }
  };
  const handleUpdateMember = (updatedMember: TeamMember) => {
    setTeamMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === updatedMember.id ? updatedMember : member
      )
    );
    setIsEditModalOpen(false); // Close the modal
    toast.success('Member details updated successfully');
  };

  const filteredMembers = teamMembers.filter((member) =>
    `${member.firstName} ${member.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
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
                <span className="font-medium text-gray-900">Roaster</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 mb-8">
          <TeamStatsCard
            icon={<Users className="h-6 w-6 text-gray-400" />}
            title="Total Members"
            value={teamMembers.length.toString()}
          />
          <TeamStatsCard
            icon={<Trophy className="h-6 w-6 text-gray-400" />}
            title="Team Status"
            value=""
            status="Active"
          />
          {/* <TeamStatsCard
            icon={<Shield className="h-6 w-6 text-gray-400" />}
            title="Registration Status"
            value="Pending"
          /> */}
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
                    Please fill in your information using the edit button first.
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
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
          <Modal
            title="Edit Team Member"
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          >
            {currentEditMember && (
              <AddMemberForm
                member={currentEditMember}
                onAddMember={handleUpdateMember}
                onCancel={() => setIsEditModalOpen(false)}
              />
            )}
          </Modal>
        </div>
      </div>
    </div>
  );

};
