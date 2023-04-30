import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const mainExportPartnersSchema = new Schema(
  {
    percentage: Number,
    country: String,
    total: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100
    }
  },
  { toJSON: { getters: true } }
);

const mainImportPartnersSchema = new Schema(
  {
    percentage: Number,
    country: String,
    total: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100
    }
  },
  { toJSON: { getters: true } }
);

const PARTNERSSchema = new Schema(
  {
    mainExportPartners: [mainExportPartnersSchema],
    mainImportPartners: [mainImportPartnersSchema]
  },
  { timestamps: true, toJSON: { getters: true } }
);

const PARTNERS = mongoose.model("PARTNERS", PARTNERSSchema);

export default PARTNERS;