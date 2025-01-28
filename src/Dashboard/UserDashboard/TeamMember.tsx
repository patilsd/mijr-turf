export interface TeamMember {
    id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    position: "Captain" | "Allrounder" | "Wicketkeeper" | "Batter" | "Bowler" | "Member";
    gender: "Male" | "Female" | "Other";
    dob: string;
    mobile: string;
    email: string;
    tShirtSize: "XXS (32)" | "XS (34)" | "S (36)" | "M (38)" | "L (40)" | "XL (42)" | "XXL (44)" | "XXXL (46)";
    trackpantSize: "XXS (32)" | "XS (34)" | "S (36)" | "M (38)" | "L (40)" | "XL (42)" | "XXL (44)" | "XXXL (46)";
    isLead: boolean;
  }

  