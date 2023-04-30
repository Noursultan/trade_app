export interface Total {
    id: string;
    _id: string;
    year: string;
    export: number;
    import: number;
  }

  export interface EU {
    id: string;
    _id: string;
    year: string;
    import: number;
    export: number;
  }

  export interface byMonthTypes {
    id: string;
    _id: string;
    month: string;
    export: number;
  }
  
  export interface GetTradeValuesResponse {
    id: string;
    _id: string;
    __v: number;
    total: Array<Total>;
    EU: Array<EU>;
    byMonth: Array<byMonthTypes>;
    createdAt: string;
    updatedAt: string;
  }

  export interface GDPTotal {
    id: string;
    _id: string;
    year: string;
    gdp: number;
  }
  
  export interface GetGDPResponse {
    id: string;
    _id: string;
    __v: number;
    total: Array<GDPTotal>;
    createdAt: string;
    updatedAt: string;
  }

  export interface mainExportPartners {
    id: string;
    _id: string;
    percentage: number;
    country: string;
    total: number;
  }

  export interface mainImportPartners {
    id: string;
    _id: string;
    percentage: number;
    country: string;
    total: number;
  }
  
  export interface GetPartnersResponse {
    id: string;
    _id: string;
    __v: number;
    mainExportPartners: Array<mainExportPartners>;
    mainImportPartners: Array<mainImportPartners>;
    createdAt: string;
    updatedAt: string;
  }