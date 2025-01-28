// export const mockTeams = Array.from({ length: 50 }, (_, index) => ({
//     id: index + 1,
//     teamName: `Team ${index + 1}`,
//     registrationStatus: Math.random() > 0.5 ? "Pending" : "Approved",
//     teamStatus: "Active",
//     members: [
//       {
//         id: index * 10 + 1,
//         firstName: "John",
//         lastName: "Doe",
//         isTeamLead: true
//       },
//       {
//         id: index * 10 + 2,
//         firstName: "Jane",
//         lastName: "Smith",
//         isTeamLead: false
//       }
//     ]
//   }));

interface Member {
  id: number;
  firstName: string;
  lastName: string;
  isTeamLead: boolean;
}

interface Team {
  id: number;
  teamName: string;
  registrationStatus: "Pending" | "Approved";
  teamStatus: "Active" | "Inactive";
  members: Member[];
}

export const mockTeams: Team[] = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  teamName: `Team ${index + 1}`,
  registrationStatus: Math.random() > 0.5 ? "Pending" : "Approved",
  teamStatus: "Active",
  members: [
    {
      id: index * 10 + 1,
      firstName: "John",
      lastName: "Doe",
      isTeamLead: true
    },
    {
      id: index * 10 + 2,
      firstName: "Jane",
      lastName: "Smith",
      isTeamLead: false
    }
  ]
}));
