
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Download, Eye } from "lucide-react";

interface FilePreviewProps {
  fileName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const FilePreview = ({ fileName, isOpen, onClose }: FilePreviewProps) => {
  const getFileType = (name: string) => {
    const extension = name.split('.').pop()?.toLowerCase();
    return extension;
  };

  const isImage = (name: string) => {
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    return imageTypes.includes(getFileType(name) || '');
  };

  const isText = (name: string) => {
    const textTypes = ['txt', 'md', 'json', 'js', 'ts', 'tsx', 'jsx', 'css', 'html'];
    return textTypes.includes(getFileType(name) || '');
  };

  const renderPreview = () => {
    if (isImage(fileName)) {
      return (
        <div className="flex items-center justify-center p-4">
          <div className="bg-muted rounded-lg p-8 text-center">
            <Eye className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Image preview would appear here</p>
            <p className="text-xs text-muted-foreground mt-1">{fileName}</p>
          </div>
        </div>
      );
    }

    if (isText(fileName)) {
      return (
        <div className="p-4">
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <p className="text-muted-foreground">Text file preview would appear here</p>
            <p className="text-xs text-muted-foreground mt-2">{fileName}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Eye className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Preview not available</p>
          <p className="text-xs text-muted-foreground">{fileName}</p>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>File Preview</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        {renderPreview()}
      </DialogContent>
    </Dialog>
  );
};
