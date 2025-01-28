import { useState, useRef, useEffect } from 'react';
import { mockTeams } from '../mockData';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { UserCircle2, Shield } from 'lucide-react';
import { Users, CheckCircle, XCircle, Clock } from 'lucide-react'; // Add these icons

function AdminDashboard() {
  const [teams, setTeams] = useState(mockTeams);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedTeams, setSelectedTeams] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const teamDetailsRef = useRef(null);
  const teamsPerPage = 10;

  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);
  const totalPages = Math.ceil(teams.length / teamsPerPage);

  // Count totals for cards
  const totalTeams = teams.length;
  const totalApproved = teams.filter((team) => team.registrationStatus === 'Approved').length;
  const totalRejected = teams.filter((team) => team.registrationStatus === 'Rejected').length;
  const totalPending = teams.filter((team) => team.registrationStatus === 'Pending').length;

  useEffect(() => {

    if (selectedTeam && teamDetailsRef.current) {
      teamDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
      setIsHighlighted(true);
      const timer = setTimeout(() => setIsHighlighted(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedTeam]);

  useEffect(() => {
    setSelectedTeams(new Set());
  }, [currentPage]); // Reset selection when page changes
  

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
    setSelectedTeams(new Set([team.id]));
  };

  const handleTeamSelect = (teamId) => {
    const newSelected = new Set(selectedTeams);
    if (newSelected.has(teamId)) {
      newSelected.delete(teamId);
    } else {
      newSelected.add(teamId);
    }
    setSelectedTeams(newSelected);
  };


  const handleApproveTeams = () => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        selectedTeams.has(team.id)
          ? { ...team, registrationStatus: "Approved" }
          : team
      )
    );
    setSelectedTeams(new Set()); // Clear selection after action
  };
  
  const handleRejectTeams = () => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        selectedTeams.has(team.id)
          ? { ...team, registrationStatus: "Rejected" }
          : team
      )
    );
    setSelectedTeams(new Set()); // Clear selection after action
  };
  
  const handleApproveSelectedTeam = () => {
    if (selectedTeam) {
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team.id === selectedTeam.id
            ? { ...team, registrationStatus: "Approved" }
            : team
        )
      );
      setSelectedTeam(null); // Close the modal
    }
  };
  
  const handleRejectSelectedTeam = () => {
    if (selectedTeam) {
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team.id === selectedTeam.id
            ? { ...team, registrationStatus: "Rejected" }
            : team
        )
      );
      setSelectedTeam(null); // Close the modal
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 space-y-7">
      {/* Header */}
      <div className="bg-blue-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">MI Junior Turf Cricket</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome </span>
              <div className="flex items-center space-x-2">
                <UserCircle2 className="h-6 w-6 text-gray-400" />
                <span className="font-medium text-gray-900">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <Users className="h-6 w-6 text-gray-400" />
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Teams</h3>
            <p className="text-lg font-semibold text-gray-900">{totalTeams}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Approved</h3>
            <p className="text-lg font-semibold text-green-600">{totalApproved}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <XCircle className="h-6 w-6 text-red-500" />
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Rejected</h3>
            <p className="text-lg font-semibold text-red-500">{totalRejected}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <Clock className="h-6 w-6 text-yellow-500" />
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Pending</h3>
            <p className="text-lg font-semibold text-yellow-500">{totalPending}</p>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeftIcon />
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
          if (
            page === 1 ||
            page === totalPages ||
            Math.abs(page - currentPage) <= 1
          ) {
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${currentPage === page
                    ? 'bg-blue-500 text-white font-bold'
                    : 'bg-white hover:bg-gray-100'
                  }`}
              >
                {page}
              </button>
            );
          }
          if (
            (page === currentPage - 2 && page !== 1) ||
            (page === currentPage + 2 && page !== totalPages)
          ) {
            return <span key={page}>...</span>;
          }
          return null;
        })}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRightIcon />
        </button>
      </div>



      {/* Teams List */}
      <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex items-center gap-6 mb-4">
          <button
            onClick={handleApproveTeams}
            disabled={selectedTeams.size === 0}
            className={`px-4 py-2 rounded text-white ${selectedTeams.size === 0
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
              }`}
            title={selectedTeams.size === 0 ? 'Please select a team' : ''}
          >
            Approve Selected
          </button>
          <button
            onClick={handleRejectTeams}
            disabled={selectedTeams.size === 0}
            className={`px-4 py-2 rounded text-white ${selectedTeams.size === 0
                ? 'bg-red-400 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600'
              }`}
            title={selectedTeams.size === 0 ? 'Please select a team' : ''}
          >
            Reject Selected
          </button>
        </div>
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="pl-4 text-left">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTeams(new Set(currentTeams.map((t) => t.id)));
                    } else {
                      setSelectedTeams(new Set());
                    }
                  }}
                  checked={currentTeams.every((team) =>
                    selectedTeams.has(team.id)
                  )}
                />
              </th>
              <th className="p-4 border-b text-left">Team Name</th>
              <th className="p-4 border-b text-left">Status</th>
              <th className="p-4 border-b text-left">Members</th>
            </tr>
          </thead>
          <tbody>
            {currentTeams.map((team) => (
              <tr key={team.id} className="hover:bg-gray-50">
                <td className="p-4 border-b">
                  <input
                    type="checkbox"
                    checked={selectedTeams.has(team.id)}
                    onChange={() => handleTeamSelect(team.id)}
                  />
                </td>
                <td className="p-4 border-b">
                  <button
                    className="text-blue-500"
                    onClick={() => handleTeamClick(team)}
                  >
                    {team.teamName}
                  </button>
                </td>
                <td className="p-4 border-b">{team.registrationStatus}</td>
                <td className="p-4 border-b">{team.members.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Team Details Modal */}
{/* Team Details Modal */}
{selectedTeam && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    onClick={() => setSelectedTeam(null)} // Close modal when clicked outside
  >
    <div
      className="bg-white p-6 rounded-lg shadow-md w-3/4 md:w-1/2"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {selectedTeam.teamName}
        </h2>
        <div className="flex gap-4">
          <button
            onClick={handleApproveSelectedTeam}
            // disabled={selectedTeams.size === 0}
            className={`px-4 py-2 rounded text-white ${selectedTeams.size === 0
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
              }`}
            title={selectedTeams.size === 0 ? 'Please select a team' : ''}
          >
            Approve
          </button>
          <button
            onClick={handleRejectSelectedTeam}
            // disabled={selectedTeams.size === 0}
            className={`px-4 py-2 rounded text-white ${selectedTeams.size === 0
                ? 'bg-red-400 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600'
              }`}
            title={selectedTeams.size === 0 ? 'Please select a team' : ''}
          >
            Reject 
          </button>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 border-b text-left">First Name</th>
            <th className="p-4 border-b text-left">Last Name</th>
            <th className="p-4 border-b text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {selectedTeam.members.map((member) => (
            <tr key={member.id} className="hover:bg-gray-50">
              <td className="p-4 border-b">{member.firstName}</td>
              <td className="p-4 border-b">{member.lastName}</td>
              <td className="p-4 border-b">
                {member.isTeamLead ? 'Team Lead' : 'Member'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => setSelectedTeam(null)} // Close modal
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}


export default AdminDashboard;
