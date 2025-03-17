import  Express  from "express";
import { AddInventoryDetails, GetInventories, deleteInventory, getbyId, updateInventory } from "../controllers/Inventory.js";

const inventoryRouter = Express.Router();

inventoryRouter.post('/',AddInventoryDetails);
inventoryRouter.get('/',GetInventories);
inventoryRouter.get('/:id',getbyId);
inventoryRouter.put('/:id',updateInventory);
inventoryRouter.delete('/:id',deleteInventory);

export default inventoryRouter;