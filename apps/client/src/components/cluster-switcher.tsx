import { useState } from "react";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,  CommandSeparator } from "@/components/ui/command";
import { useNavigate, useParams } from "react-router-dom";
import { Cluster } from "@/types/types";
import { useClusterModal } from "@/hooks/use-cluster";



type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface ClusterSwitcherProps extends PopoverTriggerProps {
  items: Cluster[]; // props frm the sidebar
}
export default function ClusterSwitcher({
  className,
  items = []
}: ClusterSwitcherProps) {
  const clusterModal = useClusterModal();
  const params = useParams();
  const navigate = useNavigate();

 
  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));

  const currentCluster = formattedItems.find((item) => item.value === params.clusterId);
  

  const [open, setOpen] = useState(false);

  const onClusterSelect = (cluster: {value: string, label: string}) => {
    setOpen(false);
    navigate(`/${cluster.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' role="combobox" aria-expanded={open} aria-label="Select a cluster" className={cn("w-[200px] justify-between", className)}>
          <StoreIcon className="mr-2 h-4 w-4 text-cyan-700"/>
          <span className="text-cyan-700">{currentCluster?.label}</span>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Cluster..."/>
            <CommandEmpty>No Cluster Found</CommandEmpty>
            <CommandGroup heading="Clusters">
              {formattedItems. map((cluster) => (
                <CommandItem
                  key={cluster.value}
                  onSelect={() => onClusterSelect(cluster)}
                  className={cn("text-sm text-cyan-700", currentCluster?.value === cluster.value 
                    ? 'opacity-100'
                    : 'opacity-75 text-slate-500'
                  )}
                >
                  <StoreIcon className="mr-2 h-4 w-4 text-cyan-600"/>
                  {cluster.label}
                  <Check 
                    className={cn("ml-auto h-4 w-4  text-cyan-600",
                    currentCluster?.value === cluster.value
                      ? 'opacity-100'
                      : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator/>
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  clusterModal.onOpen()
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5 text-cyan-700"/>
                <span className="text-cyan-700">Create Cluster</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}