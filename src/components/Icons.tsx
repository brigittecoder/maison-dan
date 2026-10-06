import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Chart2,
  CloseCircle,
  Crown1,
  HambergerMenu,
  Instagram,
  Location,
  Maximize4,
  Messages2,
  Play,
  Sms,
  type Icon as IconsaxIcon,
} from 'iconsax-react';

type Props = { name: string; size?: number; className?: string };
const icons: Record<string, IconsaxIcon> = {
  arrow: ArrowRight,
  left: ArrowLeft,
  right: ArrowRight,
  menu: HambergerMenu,
  close: CloseCircle,
  message: Messages2,
  chart: Chart2,
  calendar: Calendar,
  crown: Crown1,
  location: Location,
  play: Play,
  instagram: Instagram,
  mail: Sms,
  expand: Maximize4,
};
export function Icon({ name, size = 20, className }: Props) {
  const Glyph = icons[name] ?? ArrowRight;
  return <Glyph className={className} size={size} color="currentColor" variant="Linear" aria-hidden="true" />;
}
export function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path fill="currentColor" d="M20.3 3.7A11.7 11.7 0 0 0 2 17.8L.5 23.5l5.8-1.5A11.7 11.7 0 0 0 20.3 3.7ZM12 21a9.7 9.7 0 0 1-4.9-1.3l-.4-.2-3.4.9.9-3.3-.2-.4A9.7 9.7 0 1 1 12 21Z" /><path fill="currentColor" d="M17.3 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.3-1.4-.8-.7-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7 0 1.6 1.2 3.1 1.4 3.3.2.2 2.3 3.5 5.6 4.8.8.3 1.4.5 1.9.6.8.3 1.5.2 2 .1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.3-.6-.5Z" /></svg>;
}