import mongoose from 'mongoose';

const InventorySchema  = new mongoose.Schema({
    location:{
        type: String,
        required: true,

    },
    quantity:{
        type: Number,
        required: true,
    },
    supplier:{
        type: String,
        required: true,
    },
    lastUpdate:{
        type: Date,
        required: true,
        
    },
    
});

const Inventory = mongoose.model('Inventory',InventorySchema);
export default Inventory;
