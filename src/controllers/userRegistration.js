const knex = require('../db/knex');
const path = require('path');
const jwt = require('jsonwebtoken');
require("dotenv").config();


// exports.registerUser = async (req, res) => {
//     try {
//         const { first_name, last_name, team_name, mobile_no, otp, team_zone } = req.body;

//         // Validate required fields
//         if (!first_name || !last_name || !team_name || !mobile_no) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'All fields are required',
//             });
//         }

//         // Step 1: Check if the team already exists in `team_details`
//         let team = await knex('team_details')
//             .select('team_id')
//             .where('team_name', team_name)
//             .first();

//         let team_id;
//         if (!team) {
//             // Team does not exist, create a new entry
//             const [newTeamId] = await knex('team_details').insert({
//                 team_name,
//                 first_name,
//                 last_name,
//             });
//             team_id = newTeamId; // Use the last inserted ID for team
//         } else {
//             team_id = team.team_id;
//         }

//         // Step 2: Check if the mobile number is already registered in `user_registration`
//         const isMobileExists = await knex('user_registration')
//             .select('mobile_no')
//             .where('mobile_no', mobile_no)
//             .first();

//         if (isMobileExists) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'The mobile number is already registered. Please use a different number.',
//             });
//         }
//         const isTeamNameExists = await knex('user_registration')
//             .select('team_name')
//             .where('team_name', team_name)
//             .first();
//         if (isTeamNameExists) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'The Team name is already registered. Please use a different team name.',
//             });
//         }
//         // Step 3: Register the user in `user_registration` with the associated team_id
//         const [user_id] = await knex('user_registration').insert({
//             first_name,
//             last_name,
//             team_name, // Added team_name
//             team_id,
//             mobile_no,
//             otp,
//             team_zone
//         });

//         // Step 4: Assign the "player" role to the user in `user_role`
//         const playerRole = await knex('role')
//             .select('role_id')
//             .where('name', 'player')
//             .first();

//         if (playerRole) {
//             await knex('user_role').insert({
//                 user_id, // Use the inserted user's ID
//                 role_id: playerRole.role_id,
//             });
//         }

//         // Success response
//         return res.status(201).json({
//             success: true,
//             message: 'User registered successfully',
//         });
//     } catch (error) {
//         // Handle duplicate entry errors
//         if (error.code === 'ER_DUP_ENTRY') {
//             if (error.message.includes('team_details_team_name_unique')) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'The team name is already registered. Please choose a different name.',
//                 });
//             }
//             if (error.message.includes('user_registration_mobile_no_unique')) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'The mobile number is already registered. Please use a different number.',
//                 });
//             }
//         }

//         // General error fallback
//         console.error(error); // Log for debugging purposes
//         return res.status(500).json({
//             success: false,
//             message: 'An unexpected error occurred. Please try again later.',
//         });
//     }
// };

exports.registerUser = async (req, res) => {
    try {
        const { first_name, last_name, team_name, mobile_no, otp ,team_zone} = req.body;

        // Validate required fields
        if (!first_name || !last_name || !team_name || !mobile_no) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Step 1: Check if the team already exists in `team_details`
        let team = await knex('team_details')
            .select('team_id')
            .where('team_name', team_name)
            .first();

        let team_id;
        if (!team) {
            // Team does not exist, create a new entry
            const [newTeamId] = await knex('team_details').insert({
                team_name,
                first_name,
                last_name,
            });
            team_id = newTeamId; // Use the last inserted ID for team
        } else {
            team_id = team.team_id;
        }

        // Step 2: Check if the mobile number is already registered in `user_registration`
        const isMobileExists = await knex('user_registration')
            .select('mobile_no')
            .where('mobile_no', mobile_no)
            .first();

        if (isMobileExists) {
            return res.status(400).json({
                success: false,
                message: 'The mobile number is already registered. Please use a different number.',
            });
        }
        
        const isTeamNameExists = await knex('user_registration')
            .select('team_name')
            .where('team_name', team_name)
            .first();

        if (isTeamNameExists) {
            return res.status(400).json({
                success: false,
                message: 'The Team name is already registered. Please use a different team name.',
            });
        }

        // Step 3: Register the user in `user_registration` with the associated team_id
        const [user_id] = await knex('user_registration').insert({
            first_name,
            last_name,
            team_name, // Added team_name
            team_id,
            mobile_no,
            otp,
            team_zone
        });

        // Step 4: Assign the "player" role to the user in `user_role`
        const playerRole = await knex('role')
            .select('role_id')
            .where('name', 'player')
            .first();

        if (playerRole) {
            await knex('user_role').insert({
                user_id, // Use the inserted user's ID
                role_id: playerRole.role_id,
            });
        }

        // Generate JWT token after successful registration
        const token = jwt.sign(
            { user_id, role: 'player' }, // Payload, typically contains user info and role
            process.env.JWT_SECRET, // Secret key (use a strong secret key in production)
            { expiresIn: '1h' } // Token expiration time
        );

        // Success response with the token
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token, // Send the JWT token in the response
        });

    } catch (error) {
        // Handle duplicate entry errors
        if (error.code === 'ER_DUP_ENTRY') {
            if (error.message.includes('team_details_team_name_unique')) {
                return res.status(400).json({
                    success: false,
                    message: 'The team name is already registered. Please choose a different name.',
                });
            }
            if (error.message.includes('user_registration_mobile_no_unique')) {
                return res.status(400).json({
                    success: false,
                    message: 'The mobile number is already registered. Please use a different number.',
                });
            }
        }

        // General error fallback
        console.error(error); // Log for debugging purposes
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred. Please try again later.',
        });
    }
};


exports.getAllCaptain = async (req, res) => {
    try {
        const users = await knex('user_registration')
            .select('user_id', 'first_name', 'last_name', 'team_name', 'is_active');

        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
};
exports.getByTeam = async (req, res) => {
    try {
        const { teamName } = req.params;
        console.log('Team Name:', teamName);

        // Validate if `teamName` exists
        if (!teamName) {
            return res.status(400).json({
                success: false,
                message: 'Team name is required',
            });
        }

        // Fetch the team status from the `user_registration` table based on team_name
        const teamStatus = await knex('user_registration')
            .select('team_status', 'team_zone')
            .where({ team_name: teamName })
            .first();

        if (!teamStatus) {
            return res.status(404).json({
                success: false,
                message: 'Team status not found',
            });
        }

        // Fetch the team members from the `team_details` table based on team_name
        const teamMembers = await knex('team_details')
            .select(
                'team_id',
                'team_name',
                'email',
                'first_name',
                'middle_name',
                'last_name',
                'mobile_no',
                'position',
                'gender',
                'dob',
                't_shirt_size',
                'track_pant_size',
                'passport_picture',
                'age_proof',
                'uuid',
                'created_at',
                'updated_at'
            )
            .where({ team_name: teamName });

        if (teamMembers.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No members found for this team',
            });
        }

        // Respond with the structured data including team_status and team members
        res.status(200).json({
            success: true,
            team_status: teamStatus.team_status,  // team status from user_registration table
            team_zone: teamStatus.team_zone,
            data: teamMembers
        });

    } catch (error) {
        console.error('Error fetching team data:', error);
        res.status(500).json({
            success: false,
            message: 'An unexpected error occurred. Please try again later.',
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updateData = req.body;

        const updated = await knex('user_registration')
            .where('user_id', userId)
            .update({
                ...updateData,
                updated_at: knex.fn.now()
            });

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'User updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const deleted = await knex('team_details')
            .where('team_id', userId)
            .delete();

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
};


exports.getUniqueTeamNames = async (req, res) => {
    try {
        // Fetch all unique team names from the `team_details` table
        const uniqueTeams = await knex('team_details')
            .distinct('team_name')
            .select('team_name');

        // Check if there are no teams
        if (uniqueTeams.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No teams found.',
            });
        }

        // Respond with the unique team names
        res.status(200).json({
            success: true,
            data: uniqueTeams,
        });
    } catch (error) {
        console.error('Error fetching unique team names:', error);
        res.status(500).json({
            success: false,
            message: 'An unexpected error occurred. Please try again later.',
        });
    }
};

exports.addTeamMember = async (req, res) => {
    try {
        const { teamName } = req.params; // Get team name from params
        console.log('Team Name:', teamName);

        const {
            first_name,
            last_name,
            middle_name,
            mobile_no,
            position,
            gender,
            dob,
            email,
            t_shirt_size,
            track_pant_size
        } = req.body; // Get team member details from request body

        // Retrieve file paths for images from multer
        const passport_picture = req.files?.passport_picture ? req.files.passport_picture[0].path : '/assets/sfa_profile.png';
        const age_proof = req.files?.age_proof ? req.files.age_proof[0].path : '/assets/age.png';

        // Validate required fields
        if (!teamName || !first_name || !last_name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Team name, first name, last name, and email are required.',
            });
        }

        // Check if the team exists
        const teamExists = await knex('team_details')
            .select('team_name')
            .where('team_name', teamName)
            .first();

        if (!teamExists) {
            return res.status(404).json({
                success: false,
                message: 'Team not found.',
            });
        }

        // Check for duplicate email in the same team
        const emailExists = await knex('team_details')
            .select('email')
            .where({ team_name: teamName, email })
            .first();

        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: 'A member with this email already exists in the team.',
            });
        }

        

        // Check if a captain already exists for the team
        const existingCaptain = await knex('team_details')
            .where({ team_name: teamName, position: 'captain' })
            .first();

        if (position === 'captain') {
            if (existingCaptain) {
                // If a captain exists, change the previous captain to "member"
                await knex('team_details')
                    .where({ team_name: teamName, position: 'captain' })
                    .update({ position: 'member' });
            }
        } else {
            // If the user is trying to set someone as a member while no captain exists, throw an error
            const captainCount = await knex('team_details')
                .where({ team_name: teamName, position: 'captain' })
                .count('team_id as count')
                .first();

            if (captainCount.count === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'There must be at least one captain in the team.',
                });
            }
        }

        // Insert new team member
        await knex('team_details').insert({
            team_name: teamName,
            first_name,
            last_name,
            middle_name,
            mobile_no,
            gender,
            dob,
            email,
            position,
            t_shirt_size,
            track_pant_size,
            passport_picture,
            age_proof
        });

        // Fetch the newly added member
        const newMember = await knex('team_details')
            .select('*')
            .where({ team_name: teamName, email })
            .first();

        res.status(201).json({
            success: true,
            message: 'Team member added successfully.',
            newMember: newMember, // Include the new member data in the response
        });
    } catch (error) {
        console.error('Error adding team member:', error);
        res.status(500).json({
            success: false,
            message: 'An unexpected error occurred. Please try again later.',
        });
    }
};

exports.updateTeamStatus = async (req, res) => {
    try {
        const { team_ids, team_status } = req.body;

        // Validate input
        if (!team_ids || !team_status) {
            return res.status(400).json({
                success: false,
                message: 'team_ids and team_status are required.',
            });
        }

        // Validate team_status
        const validStatuses = ['Pending', 'Approve', 'Reject'];
        if (!validStatuses.includes(team_status)) {
            return res.status(400).json({
                success: false,
                message: `Invalid team_status. Allowed values are: ${validStatuses.join(', ')}.`,
            });
        }

        // Check if all team_ids exist
        const users = await knex('user_registration')
            .select('team_id', 'team_status')
            .whereIn('team_id', team_ids);

        if (users.length !== team_ids.length) {
            return res.status(404).json({
                success: false,
                message: 'Some team IDs not found.',
            });
        }

        // Update the team_status for each team
        await knex('user_registration')
            .whereIn('team_id', team_ids)
            .update({ team_status });

        // Return success response
        res.status(200).json({
            success: true,
            message: 'Team status updated successfully for selected teams.',
            data: {
                team_ids,
                new_status: team_status,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An unexpected error occurred. Please try again later.',
        });
    }
};
// exports.verifyOTP = async (req, res) => {
//     try {
//         const { mobile_no, otp } = req.body;

//         // Check if the mobile number exists in the admin table first
//         const admin = await knex('admin')
//             .where({ mobile_no })
//             .first();

//         if (admin) {
//             // If the mobile number exists in the admin table, verify OTP for admin
//             if (admin.otp !== otp) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Invalid OTP for admin'
//                 });
//             }

//             return res.status(202).json({
//                 success: true,
//                 message: 'OTP verified successfully for admin'
//             });
//         }

//         // If the mobile number doesn't exist in the admin table, check in user_registration
//         const isMobileExists = await knex('user_registration')
//             .where({ mobile_no })
//             .first();

//         if (!isMobileExists) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Mobile number is not registered'
//             });
//         }

//         // Verify OTP for user
//         const user = await knex('user_registration')
//             .where({ mobile_no, otp })
//             .first();

//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid OTP for user'
//             });
//         }

//         // Update user status after OTP verification
//         await knex('user_registration')
//             .where('mobile_no', mobile_no)
//             .update({
//                 is_active: true,
//                 updated_at: knex.fn.now()
//             });

//         // Send response with the team_name
//         res.json({
//             success: true,
//             team_name: user.team_name,
//             message: 'OTP verified successfully for user'
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error verifying OTP',
//             error: error.message
//         });
//     }
// };


exports.verifyOTP = async (req, res) => {
    try {
        const { mobile_no, otp } = req.body;

        // Validate request input
        if (!mobile_no || !otp) {
            return res.status(400).json({ success: false, message: "Mobile number and OTP are required" });
        }

        // Check if user is an admin
        const admin = await knex("admin").where({ mobile_no }).first();
        if (admin) {
            if (admin.otp !== otp) {
                return res.status(400).json({ success: false, message: "Invalid OTP for admin" });
            }

            // Generate JWT token for admin
            const token = jwt.sign(
                { userId: admin.id, mobile_no, role: "admin" },
                process.env.JWT_SECRET,
                { expiresIn: "2h" }
            );

            return res.status(202).json({ success: true, message: "OTP verified successfully for admin", token });
        }

        // Check if user exists
        const user = await knex("user_registration").where({ mobile_no }).first();
        if (!user) {
            return res.status(400).json({ success: false, message: "Mobile number is not registered" });
        }

        // Verify OTP for user
        if (user.otp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP for user" });
        }

        // Update user status after OTP verification
        await knex("user_registration").where({ mobile_no }).update({
            is_active: true,
            updated_at: knex.fn.now(),
        });

        // Generate JWT token for user
        const token = jwt.sign(
            { userId: user.user_id, mobile_no, role: "user", team_name: user.team_name },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        return res.json({
            success: true,
            message: "OTP verified successfully for user",
            team_name: user.team_name,
            token,
        });

    } catch (error) {
        console.error("OTP Verification Error:", error);
        return res.status(500).json({ success: false, message: "Error verifying OTP", error: error.message });
    }
};

exports.getAllTeams = async (req, res) => {
    try {
        // Fetch team details from user_registration
        const teams = await knex('user_registration')
            .select(
                'user_registration.team_id',
                knex.raw('TRIM(LOWER(user_registration.team_name)) AS normalized_team_name'),
                'user_registration.team_name',
                'user_registration.team_status'
            );

        if (!teams.length) {
            return res.status(404).json({
                success: false,
                message: 'No teams found.',
            });
        }

        // Get unique team names to find members
        const uniqueTeamNames = [...new Set(teams.map(team => team.team_name))];

        // Fetch members based on team_name from team_details
        const members = await knex('team_details')
            .whereIn('team_name', uniqueTeamNames)
            .select('team_name', 'first_name', 'last_name', 'position');

        // Organizing data into required format with unique teams
        const teamMap = new Map();

        teams.forEach(team => {
            const normalizedName = team.normalized_team_name;

            if (!teamMap.has(normalizedName)) {
                teamMap.set(normalizedName, {
                    team_id: team.team_id,
                    team_name: team.team_name, // Use original name
                    team_status: team.team_status,
                    total_members: 0,
                    members: []
                });
            }

            // Add matching members to the team
            const currentTeam = teamMap.get(normalizedName);
            const teamMembers = members.filter(member => member.team_name === team.team_name);
            currentTeam.members.push(...teamMembers);
            currentTeam.total_members = currentTeam.members.length;
        });

        // Respond with structured team data
        res.status(200).json({
            success: true,
            teams: Array.from(teamMap.values()),
        });

    } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({
            success: false,
            message: 'An unexpected error occurred. Please try again later.',
            error: error.message
        });
    }
};

exports.editTeamMember = async (req, res) => {
    try {
        const { team_id } = req.params; // Get team member ID
        const {
            first_name,
            last_name,
            middle_name,
            mobile_no,
            position,
            gender,
            dob,
            email,
            t_shirt_size,
            track_pant_size
        } = req.body;

        // Fetch the existing member details
        const existingMember = await knex('team_details')
            .select('*')
            .where('team_id', team_id)
            .first();

        if (!existingMember) {
            return res.status(404).json({
                success: false,
                message: 'Team member not found.',
            });
        }

        // Handle file uploads: Keep existing images if none are uploaded
        const passportPicture = req.files?.passport_picture
            ? req.files.passport_picture[0].filename // Store only filename
            : existingMember.passport_picture; // Keep old image

        const ageProof = req.files?.age_proof
            ? req.files.age_proof[0].filename
            : existingMember.age_proof;

        // Prepare the update object
        const updatedMemberData = {
            first_name,
            middle_name: middle_name || existingMember.middle_name,
            last_name,
            mobile_no,
            position,
            gender,
            dob,
            email,
            t_shirt_size,
            track_pant_size,
            passport_picture: passportPicture || '/assets/sfa_profile.png', // Default if null
            age_proof: ageProof || '/assets/age.png', // Default if null
            updated_at: knex.fn.now(),
        };

        // Update the team member information in the database
        await knex('team_details')
            .where('team_id', team_id)
            .update(updatedMemberData);

        // Fetch the updated member data
        const updatedMember = await knex('team_details')
            .select('*')
            .where('team_id', team_id)
            .first();

        res.status(200).json({
            success: true,
            message: 'Team member updated successfully.',
            updatedMember,
        });

    } catch (error) {
        console.error('Error updating team member:', error);
        res.status(500).json({
            success: false,
            message: 'An unexpected error occurred. Please try again later.',
        });
    }
};

