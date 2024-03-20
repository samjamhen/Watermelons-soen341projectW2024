const Branch = require("../models/branches");

//create a branch
const createBranch = async(req, res) => {
    const {location, vehicleIDs, phoneNumber, email } = req.body
    try {
        const branch = await Branch.create({location, vehicleIDs, phoneNumber, email})
        if (!branch) {
            return res.status(404).json({error: 'Branch not created'})
        }
        res.status(200).json(branch)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
} 

//get all branches
const getBranches = async (req, res) => {
    try{
        const branches = await Branch.find({}).sort({ createAt: -1 });
        if(!branches){
            return res.status(404).json({error: "No Branches"})
        }
        res.status(200).json(branches);
    } catch (error){
        res.status(500).json({ error: error.message })
    }
}

//get a single branch
const getBranch = async (req, res) => {
    try{
        const branch = await Branch.findById(req.params._id)
        if(!branch){
            return res.status(404).json({error: "Branch Not Found"})
        }
        res.status(200).json(branch)
    } catch (error){
        res.status(500).json({error: error.message})
    }
}

//update a branch
const updateBranch = async (req, res) => {
    const {location, vehicleIDs, phoneNumber, email} = req.body
    const {_id} = req.params
    try {
        const updatedBranch = await Branch.findByIdAndUpdate(_id, {location, vehicleIDs, phoneNumber, email}, { new: true })
        if (!updatedBranch) {
            return res.status(404).json({ error: 'Branch not found' })
        }
        res.status(200).json(updatedBranch)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a branch
const deleteBranch = async (req, res) => {
    const {_id} = req.params;
    try {
        const deletedBranch = await Branch.findByIdAndDelete(_id)
        if (!deletedBranch) {
            return res.status(404).json({error: 'Branch not found'})
        }
        res.status(200).json({ message: 'Branch deleted successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {createBranch, getBranches, getBranch, updateBranch, deleteBranch}