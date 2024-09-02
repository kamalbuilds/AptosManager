import { ActiveTabStates } from "./sidebar"

export type GlobalContextProviderType = {
  activeTab: ActiveTabStates
  setActiveTab: (activeTab: ActiveTabStates) => void
}

export const InitialValue: GlobalContextProviderType = {
  activeTab: "overview",
  setActiveTab: () => {},
}
