import { ClusterModal } from "@/components/modals/cluster-modal"
import { MemberModal } from "@/components/modals/member-modal"

export const ModalProvider = () => {
  return (
   <>
      <MemberModal />
      <ClusterModal />
   </>
  )
}