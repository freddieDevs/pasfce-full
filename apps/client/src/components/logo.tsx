import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function Logo() {
  return (
    <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center ">
      <Avatar>
        <AvatarImage src="/pasfce.png" alt="PASFCE" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
        <AvatarFallback>PAS</AvatarFallback>
      </Avatar>
    </div>
  )
}
