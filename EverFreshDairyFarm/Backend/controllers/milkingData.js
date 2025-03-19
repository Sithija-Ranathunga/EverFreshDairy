import MilkingDatamodel from '../models/MilkingData.js';

//create a new milking record
export const createMilkingData = async (req, res) => {
    try {
        const newmilkingData = new MilkingDatamodel(req.body);
        await newmilkingData.save();
        res.status(201).json(newmilkingData);

    } catch (error) {
        res.status(400).json({ message: error.message });

    }
};

// Get all milking records
export const getMilkingData = async (req, res) => {
    try{
        const milkingRecords = await MilkingDatamodel.find();
        res.status(200).json( milkingRecords);

    } catch (error){
        res.status(500).json({ message: error.message });

    }
};

//Get a single milking record by ID
export const getMilkingDataById = async (req, res) => {
    try{
        const milkingRecord = await MilkingDatamodel.findById(req.params.id);
        if(!milkingRecord) return res.status(404).json({ message: "Record not found" });
        res.status(200).json(milkingRecord);

    } catch  (error) {
        res.status(500).json({ message: error.message });

    }
};

//Update a milking record by ID
export const updateMilkingData = async (req, res) => {
    try {
        const updatemilkingDataRecord = await MilkingDatamodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (! updatemilkingDataRecord) return res.status(404).json({ message: "Record not found" });
        res.status(200).json( updatemilkingDataRecord);

    } catch (error) {
        res.status(400).json({ message: error.message });

    }
};

//Delete a milking record by ID
export const deleteMilkingData = async (req, res) => {
    try {
        const deletemilkingDataRecords = await MilkingDatamodel.findByIdAndDelete(req.params.id);
        if (!deletemilkingDataRecords) return res.status(404).json({ message: "Record not found" });
        res.status(200).json({ message: "Record deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message});
    }

}

