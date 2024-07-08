const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { jwtAuthMiddleware,generateToken} = require('../jwt');

//Signup
router.post('/signup', async (req, res) =>{
    try{
        const {username}= req.body
        const {email}= req.body  // Assuming the request body contains the User data

        // Check if there is already an existing username and email.
        const existUser = await User.findOne({username: username});
        const existEmail= await User.findOne({email:email})
        if (existUser) {
            return res.status(400).json({ error: 'Username already exists' });
        } else if (username.length < 4 || username.length > 12) {
            return res.status(400).json({ error: 'Username length should be between 4 to 12 characters.' });
        }
        if (existEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }

    
        // Create a new User document using the Mongoose model
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        });

        // Save the new user to the database
        const response = await newUser.save();
        console.log('data saved');

        const payload = {
            id: response.id
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
      
        res.status(200).json({response: response, token: token,id:response.id});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// Login Route
router.post('/login', async(req, res) => {
    try{
        // Extract aadharCardNumber and password from request body
        const {username, password} = req.body;

        // Check if aadharCardNumber or password is missing
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Find the user by aadharCardNumber
        const user = await User.findOne({username:username});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid Username or Password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({
            token,
            id: user.id, // Include the user id in the response
        });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        const userId = userData.id;
        const user = await User.findById(userId);
        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Extract the id from the token
        const { currentPassword, newPassword } = req.body; // Extract current and new passwords from request body

        // Check if currentPassword and newPassword are present in the request body
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Both currentPassword and newPassword are required' });
        }

        // Find the user by userID
        const user = await User.findById(userId);

        // If user does not exist or password does not match, return error
        if (!user || !(await user.comparePassword(currentPassword))) {
            return res.status(401).json({ error: 'Invalid current password' });
        }

        // Update the user's password
        user.password = newPassword;
        await user.save();

        console.log('password updated');
        res.status(200).json({ message: 'Password updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;