import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface modalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<modalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children
}) => {
 const onChange = (open: boolean) => {
  if(!open){
    onClose();
  }
 };

 return (
  <Dialog open={isOpen} onOpenChange={onChange}>
    <DialogContent className='bg-amber-100'>
      <DialogHeader className='text-cyan-700'>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription className='text-cyan-700 text-muted-foreground'>
          {description}
        </DialogDescription>
      </DialogHeader>
      <div>
        {children}
      </div>
    </DialogContent>
  </Dialog>
 )
}