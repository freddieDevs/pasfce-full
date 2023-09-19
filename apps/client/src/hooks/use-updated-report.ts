import { Report } from "@/types/types";
import { create } from "zustand";

interface UpdatedReportState {
  updatedReport: Report | null;
}

interface UpdatedReportStore {
  state: UpdatedReportState;
  setUpdatedReport: (report: Report) => void;
  getUpdatedReport: () => Report | null;
}
/**
 * just store the report data that we have get after updating the report
 * remember to create the provider for this state 
 * has 3 functionalities
 * get state, store the state and set the state
 */

export const useUpdatedReport = create<UpdatedReportStore>((set, get) => ({
  state: { updatedReport: null },
  setUpdatedReport: (report) => set({ state: { updatedReport: report } }),
  getUpdatedReport: () => get().state.updatedReport,
}));