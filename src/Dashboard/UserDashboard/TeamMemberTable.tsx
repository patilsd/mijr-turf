import { useState } from "react";
import { Trash2, Edit } from "lucide-react";

const FileModal: React.FC<{ file: File | null; onClose: () => void }> = ({ file, onClose }) => {
    if (!file) return null;

    const fileUrl = URL.createObjectURL(file);

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 text-lg"
                >
                    X
                </button>
                {file.type.startsWith("image/") ? (
                    <img src={fileUrl} alt={file.name} className="max-w-full max-h-[80vh]" />
                ) : file.type === "application/pdf" ? (
                    <embed src={fileUrl} type="application/pdf" className="w-full h-[80vh]" />
                ) : (
                    <div>File type not supported</div>
                )}
            </div>
        </div>
    );
};

interface TeamTableProps {
    members: TeamMember[];
    onPromote: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void; // Assuming onEdit will be passed for editing member details
}

export const TeamMemberTable: React.FC<TeamTableProps> = ({ members, onPromote, onDelete, onEdit }) => {
    const [modalFile, setModalFile] = useState<File | null>(null);
    // Ensure that the team lead is always at the top

    // console.log(members)
    const sortedMembers = [...members].sort((a, b) => (a.isLead ? -1 : 1));

    return (
        <div className="w-full overflow-x-auto">
  <div className="min-w-[1200px]"> {/* Ensuring wide table for scrolling */}
    <table className="w-full border border-gray-300 divide-y divide-gray-300">
      <thead className="bg-gray-50 sticky top-0">
        <tr>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900 min-w-[80px]">Sr. No</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900 min-w-[180px]">Name</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900 min-w-[150px]">Position</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900 min-w-[120px]">Gender</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900 min-w-[160px]">DOB</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900 min-w-[160px]">Mobile</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900 min-w-[250px]">Email</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900 min-w-[120px]">T-shirt Size</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900 min-w-[120px]">Track Pant Size</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900 min-w-[180px]">Passport</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900 min-w-[180px]">Age Proof</th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900 min-w-[180px]">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {sortedMembers.map((member, index) => (
          <tr key={member.id} className="hover:bg-gray-100">
            <td className="py-4 px-6 text-sm font-medium min-w-[80px]">{index + 1}</td>
            <td className="text-sm text-gray-900 px-6 min-w-[180px] truncate">{member.first_name} {member.middle_name} {member.last_name}</td>
            <td className="text-sm text-gray-900 px-6 min-w-[150px]">{member.position}</td>
            <td className="text-sm text-gray-900 px-6 min-w-[120px]">{member.gender}</td>
            <td className="text-sm text-gray-900 px-6 min-w-[160px]">{member.dob}</td>
            <td className="text-sm text-gray-900 px-6 min-w-[160px]">{member.mobile_no}</td>
            <td className="text-sm text-gray-900 px-6 min-w-[250px] truncate">{member.email}</td>
            <td className="text-sm text-gray-900 px-6 min-w-[120px]">{member.t_shirt_size}</td>
            <td className="text-sm text-gray-900 px-6 min-w-[120px]">{member.track_pant_size}</td>
            <td className="text-sm text-blue-600 cursor-pointer px-6 min-w-[180px]" onClick={() => setModalFile(member.passport_picture)}>
              {member.passport_picture ? member.passport_picture : "No file"}
            </td>
            <td className="text-sm text-blue-600 cursor-pointer px-6 min-w-[180px]" onClick={() => setModalFile(member.age_proof)}>
              {member.age_proof ? member.age_proof : "No file"}
            </td>
            <td className="py-4 px-6 text-left text-sm flex space-x-2 min-w-[180px]">
              <button onClick={() => onPromote(member.id)} className="text-indigo-600 hover:text-indigo-900">
                {member.isLead ? "Demote" : "Promote"}
              </button>
              <button onClick={() => onEdit(member.team_id)} className="text-blue-600 hover:text-blue-900">
                <Edit className="h-5 w-5" />
              </button>
              <button onClick={() => onDelete(member.team_id)} className="text-red-600 hover:text-red-900">
                <Trash2 className="h-5 w-5" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  {modalFile && <FileModal file={modalFile} onClose={() => setModalFile(null)} />}
</div>

    );
};
