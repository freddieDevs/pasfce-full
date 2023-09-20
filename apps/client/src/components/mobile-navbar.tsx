import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Cluster } from "@/types/types"

interface MobileNavbarProps {
  data: Cluster[] | null;
}
export const MobileNavbar: React.FC<MobileNavbarProps> = ({
  data
}) => {
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Menu size={40}/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 relative right-4">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Sidebar data={data}/>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    
  )
}