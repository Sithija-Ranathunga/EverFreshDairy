import milkingData from '../models/milkingData.js';

//create a new milking record
export const createmilkingData = async (req, res) => {
    try {
        const newmilkingData = new milkingData(req.body);
        await newmilkingData.save();
        res.status(201).json(newmilkingData);

    } catch (error) {
        res.status(400).json({ message: error.message });

    }
};

// Get all milking records
export const getmilkingData = async (req, res) => {
    try{
        const milkingRecords = await milkingData.find();
        res.status(200).json({ message: error.message});

    } catch (error){
        res.status(500).json({ message: error.message });

    }
};

//Get a single milking record by ID
export const getmilkingDataById = async (req, res) => {
    try{
        const milkingRecord = await milkingData.findById(req.params.id);
        if(!milkingRecord) return res.status(404).json({ message: "Record not found" });
        res.status(200).json(milkingRecord);

    } catch  (error) {
        res.status(500).json({ message: error.message });

    }
};

//Update a milking record by ID
export const updatemilkingData = async (req, res) => {
    try {
        const updatemilkingDataRecord = await milkingData.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (! updatemilkingDataRecord) return res.status(404).json({ message: "Record not found" });
        res.status(200).json( updatemilkingDataRecord);

    } catch (error) {
        res.status(400).json({ message: error.message });

    }
};

//Delete a milking record by ID
export const DeletemilkingData = async (req, res) => {
    try {
        const DeletemilkingDataRecords = await milkingData.findByIdAndDelete(req.params.id);
        if (!DeletemilkingDataRecords) return res.status(404).json({ message: "Record not found" });
        res.status(200).json({ message: "Record deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message});
    }

}

