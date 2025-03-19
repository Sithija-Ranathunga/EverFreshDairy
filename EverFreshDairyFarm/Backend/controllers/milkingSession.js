import milkingSession from '../models/milkingSession.js';

// Create a new milking session
export const createmilkingSession = async (req, res) => {
    try {
        const newSession = new milkingSession(req.body);
        await newSession.save();
        res.status(201).json(newSession);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Get all milking Session
export const getmilkingSession = async (req, res) => {
    try{
        const Sessions = await milkingSession.find();
        res.status(200).json(Sessions);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
};

// Get a single milking session by ID
export const getmilkingSessionById = async (req, res) => {
    try {
        const session = await milkingSession.findById(req.params.id);
        if (!session) return res.status(404).json({ message: "Session not found" });
        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update a milking session by ID
export const UpdatemilkingSession = async (req, res) => {
    try {
        const updatedSession = await milkingSession.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSession) return res.status(404).json({ message: "Session not found" });
        res.status(200).json(updatedSession);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a milking session by ID
export const DeletemilkingSession = async (req, res) => {
    try {
        const deletedSession = await milkingSession.findByIdAndDelete(req.params.id);
        if (!deletedSession) return res.status(404).json({ message: "Session not found" });
        res.status(200).json({ message: "Session deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}