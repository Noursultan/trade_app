import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const totalSchema = new Schema(
  {
    year: String,
    export: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    import: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    }
  },
  { toJSON: { getters: true } }
);

const EUSchema = new Schema(
  {
    year: String,
    import: {
      type: mongoose.Types.Currency,
      currency: "EUR", 
      get: (v) => v / 100 
    },
  },
  { toJSON: { getters: true } }
)

const byMonthSchema = new Schema(
  {
    month: String,
    export: {
      type: mongoose.Types.Currency,
      currency: "EUR", 
      get: (v) => v / 100 
    }
  },
  { toJSON: { getters: true } }
)

const TRADESchema = new Schema(
  {
    total: [totalSchema],
    EU: [EUSchema],
    byMonth: [byMonthSchema]
  },
  { timestamps: true, toJSON: { getters: true } }
);

const TRADE = mongoose.model("TRADE", TRADESchema);

export default TRADE;
