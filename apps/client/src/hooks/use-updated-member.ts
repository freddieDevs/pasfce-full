import { Member } from "@/types/types";
import { create } from "zustand";

interface UpdatedMemberState {
  updatedMember: Member | null;
}

interface UpdatedMemberStore {
  state: UpdatedMemberState;
  setUpdatedMember: (member: Member) => void;
  getUpdatedMember: () => Member | null;
}

export const useUpdatedMember = create<UpdatedMemberStore> ((set, get) => ({
  state: { updatedMember: null }, // this is the default
  setUpdatedMember: (member) => set({ state: { updatedMember: member } }),
  getUpdatedMember: () => get().state.updatedMember,
}));