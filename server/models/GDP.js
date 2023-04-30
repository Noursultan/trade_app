import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const totalSchema = new Schema(
  {
    year: String,
    gdp: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100
    }
  },
  { toJSON: { getters: true } }
);

const GDPSchema = new Schema(
  {
    total: [totalSchema]
  },
  { timestamps: true, toJSON: { getters: true } }
);

const GDP = mongoose.model("GDP", GDPSchema);

export default GDP;