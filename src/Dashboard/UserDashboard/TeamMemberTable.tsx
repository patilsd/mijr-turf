// import { Trash2, Edit } from "lucide-react";

// interface TeamTableProps {
//     members: TeamMember[];
//     onPromote: (id: string) => void;
//     onDelete: (id: string) => void;
//     onEdit: (id: string) => void; // Assuming onEdit will be passed for editing member details
// }

// export const TeamMemberTable: React.FC<TeamTableProps> = ({ members, onPromote, onDelete, onEdit }) => {
//     // Ensure that the team lead is always at the top
//     const sortedMembers = [...members].sort((a, b) => (a.isLead ? -1 : 1)); 

//     return (
//         <table className="w-full divide-y divide-gray-300 border-collapse border">
//             <thead className="bg-gray-50">
//                 <tr>
//                     <th className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 ">Sr. No</th>
//                     <th className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 ">Name</th>
//                     <th className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 ">Position</th>
//                     <th className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 ">Gender</th>
//                     <th className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 ">DOB</th>
//                     <th className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 ">Mobile</th>
//                     <th className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 ">Email</th>
//                     <th className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 ">T-shirt Size</th>
//                     <th className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 ">Trackpant Size</th>
//                     <th className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 ">Action</th>
//                 </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 bg-white">
//                 {sortedMembers.map((member, index) => (
//                     <tr key={member.id}>
//                         <td className="py-4 px-4 text-sm font-medium">{index + 1}</td> {/* Serial Number */}
//                         <td className="text-sm text-gray-900 pl-2">{member.firstName} {member.middleName} {member.lastName}</td>
//                         <td className="text-sm text-gray-900 pl-2">{member.position}</td>
//                         <td className="text-sm text-gray-900 pl-2">{member.gender}</td>
//                         <td className="text-sm text-gray-900 pl-2">{member.dob}</td>
//                         <td className="text-sm text-gray-900 pl-2">{member.mobile}</td>
//                         <td className="text-sm text-gray-900 pl-2">{member.email}</td>
//                         <td className="text-sm text-gray-900 pl-2">{member.tShirtSize}</td>
//                         <td className="text-sm text-gray-900 pl-2">{member.trackpantSize}</td>
//                         <td className="py-4 text-left text-sm pl-2">
//                             <button onClick={() => onPromote(member.id)} className="text-indigo-600 hover:text-indigo-900 mb-2">
//                                 {member.isLead ? 'Demote' : 'Promote'}
//                             </button>
//                             <button onClick={() => onDelete(member.id)} className="ml-4 pr-2 mt-2 text-red-600 hover:text-red-900">
//                                 <Trash2 className="h-5 w-5" />
//                             </button>
//                             <button onClick={() => onEdit(member.id)} className="ml-4 pr-2 mt-2 text-blue-600 hover:text-blue-900">
//                                 <Edit className="h-5 w-5" />
//                             </button>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };


import { Trash2, Edit } from "lucide-react";

interface TeamTableProps {
    members: TeamMember[];
    onPromote: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void; // Assuming onEdit will be passed for editing member details
}

export const TeamMemberTable: React.FC<TeamTableProps> = ({ members, onPromote, onDelete, onEdit }) => {
    // Ensure that the team lead is always at the top
    console.log(members)
    const sortedMembers = [...members].sort((a, b) => (a.isLead ? -1 : 1)); 

    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full divide-y divide-gray-300 border-collapse border">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900">Sr. No</th>
                        <th className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900">Name</th>
                        <th className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900">Position</th>
                        <th className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900">Gender</th>
                        <th className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900">DOB</th>
                        <th className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900">Mobile</th>
                        <th className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900">Email</th>
                        <th className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900">T-shirt Size</th>
                        <th className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900">Trackpant Size</th>
                        <th className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {sortedMembers.map((member, index) => (
                        <tr key={member.id}>
                            <td className="py-4 px-4 text-sm font-medium">{index + 1}</td> {/* Serial Number */}
                            <td className="text-sm text-gray-900 pl-2">
                                {member.first_name} {member.middle_ame} {member.last_name}
                            </td>
                            <td className="text-sm text-gray-900 pl-2">{member.position}</td>
                            <td className="text-sm text-gray-900 pl-2">{member.gender}</td>
                            <td className="text-sm text-gray-900 pl-2">{member.dob}</td>
                            <td className="text-sm text-gray-900 pl-2">{member.mobile}</td>
                            <td className="text-sm text-gray-900 pl-2">{member.email}</td>
                            <td className="text-sm text-gray-900 pl-2">{member.t_shirt_size}</td>
                            <td className="text-sm text-gray-900 pl-2">{member.track_pant_size}</td>
                            <td className="py-4 text-left text-sm pl-2">
                                <button onClick={() => onPromote(member.id)} className="text-indigo-600 hover:text-indigo-900 mb-2">
                                    {member.isLead ? "Demote" : "Promote"}
                                </button>
                                <button onClick={() => onDelete(member.id)} className="ml-4 pr-2 mt-2 text-red-600 hover:text-red-900">
                                    <Trash2 className="h-5 w-5" />
                                </button>
                                <button onClick={() => onEdit(member.id)} className="ml-4 pr-2 mt-2 text-blue-600 hover:text-blue-900">
                                    <Edit className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
