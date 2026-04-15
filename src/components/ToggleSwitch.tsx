interface ToggleSwitchProps {
  isOn: boolean;
  onToggle?: () => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`toggle-switch ${isOn ? 'active' : ''}`}
      aria-pressed={isOn}
    >
      <span className={`toggle-slider ${isOn ? 'active' : ''}`} />
    </button>
  );
};