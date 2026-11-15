import type { TitlePart } from '@/data/types';
import Chip from '@/components/ui/Chip/Chip';
import RichTitle from '@/components/ui/RichTitle/RichTitle';
import s from './SectionHeading.module.css';

type Props = {
  /** label di atas judul */
  label: string;
  title: TitlePart[];
  /**
   * xl = chip + h2 92px (default)
   * lg = chip + h2 76px (Tools & Skills)
   * sub = label huruf kapital kecil + h3 60px (My Process, Education)
   */
  size?: 'xl' | 'lg' | 'sub';
  lead?: string;
  /** lebar maksimal paragraf lead dalam px (mockup: 560 atau 600) */
  leadWidth?: number;
  id?: string;
  className?: string;
};

/** Judul section yang berada di tengah: chip/label, judul serif dengan bagian italic, lead opsional. */
export default function SectionHeading({ label, title, size = 'xl', lead, leadWidth, id, className }: Props) {
  const Heading = size === 'sub' ? 'h3' : 'h2';
  return (
    <div className={className ? `${s.head} ${className}` : s.head}>
      {size === 'sub' ? <span className={s.subLabel}>{label}</span> : <Chip>{label}</Chip>}
      <Heading id={id} className={s[size]}>
        <RichTitle parts={title} />
      </Heading>
      {lead && (
        <p className={s.lead} style={leadWidth ? { maxWidth: leadWidth } : undefined}>
          {lead}
        </p>
      )}
    </div>
  );
}
