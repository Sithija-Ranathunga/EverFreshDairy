import MilkingSessionmodel from "../models/MilkingSession.js";

//create a new milking session 
export const createMilkingSession = async (req, res) => {
    try{
        const newSession = new MilkingSessionmodel(req.body);
        await newSession.save();
        res.status(201).json(newSession);
    }catch (error){
        res.status(500).json({ error: error.message });
    }
};

//Get all milking Session
export const getMilkingSession = async (req, res) => {
    try{
        const sessions = await MilkingSessionmodel.find();
        res.status(200).json(sessions);
    } catch (error){
        res.ststus(500).json({ error: error.message });

    };
};

//Get a single milking session by ID
export const getMilkingSessionById = async (req, res) => {
    try{
        const session = await MilkingSessionmodel.findById(req.params.id);
        if(!session) return res.status(404).json({ message: "Session not found" });
        res.status(200).json(session);
    } catch (error){
        res.status(500).json({ error: error.message});
    }
};

//Update a milking session
export const updateMilkingSession = async (req, res) => {
    try{ 
        const updatesession = await MilkingSessionmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updatesession) return res.status(404).json({ message: "Session not found"});
        res.status(200).json(updatesession);

    }catch (error){
        res.status(500).json({ error: error.message });
    }

};

//Delete a milking session
export const deleteMilkingSession = async (req, res) => {
    try{
        const deletesession = await MilkingSessionmodel.findByIdAndDelete(req.params.id);
        if (!deletesession) return res.status(404).json({ message: "Session not found"});
        res.status(200).json({ message: "Session deleted successfully" });
    } catch (error){
        res.status(500).json({ error: error.message });
    }
};