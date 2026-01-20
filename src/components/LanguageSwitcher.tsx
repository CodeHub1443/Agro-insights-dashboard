import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Globe size={14} className="text-muted-foreground mr-1" />
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          'px-2 py-1 text-xs font-medium rounded transition-smooth',
          language === 'en'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        )}
      >
        ENG
      </button>
      <button
        onClick={() => setLanguage('ko')}
        className={cn(
          'px-2 py-1 text-xs font-medium rounded transition-smooth',
          language === 'ko'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        )}
      >
        KOR
      </button>
    </div>
  );
};

export default LanguageSwitcher;
