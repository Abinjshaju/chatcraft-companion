import { Button } from "@/components/ui/button";
import { ImageIcon, FileTextIcon, CodeIcon, SparklesIcon } from "lucide-react";

interface EmptyStateViewProps {
  onQuickAction: (action: string) => void;
}

export const EmptyStateView = ({ onQuickAction }: EmptyStateViewProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-semibold mb-8">What can I help with?</h1>
      <div className="max-w-2xl w-full px-4">
        <div className="text-sm text-gray-400 mb-8 text-center">
          Start a conversation and I'll help you with your project
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto px-4">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-32 bg-white/5 hover:bg-white/10 border-white/10"
            onClick={() => onQuickAction('image')}
          >
            <ImageIcon className="h-6 w-6 mb-2" />
            <span>Create Image</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-32 bg-white/5 hover:bg-white/10 border-white/10"
            onClick={() => onQuickAction('summarize')}
          >
            <FileTextIcon className="h-6 w-6 mb-2" />
            <span>Summarize Text</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-32 bg-white/5 hover:bg-white/10 border-white/10"
            onClick={() => onQuickAction('code')}
          >
            <CodeIcon className="h-6 w-6 mb-2" />
            <span>Write Code</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-32 bg-white/5 hover:bg-white/10 border-white/10"
            onClick={() => onQuickAction('assist')}
          >
            <SparklesIcon className="h-6 w-6 mb-2" />
            <span>Get Help</span>
          </Button>
        </div>
      </div>
    </div>
  );
};