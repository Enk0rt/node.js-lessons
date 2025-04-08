import { model, Schema } from "mongoose";
const pizzaSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    diameter: { type: Number, required: true },
}, { timestamps: true, versionKey: false });
export const Pizza = model("pizza", pizzaSchema);
