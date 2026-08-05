const paths = {
  soft: 'M0 96 C180 18 330 26 494 94 C690 175 844 160 1012 72 C1177 -14 1308 12 1440 78 L1440 180 L0 180Z',
  wide: 'M0 70 C262 158 430 148 635 70 C834 -6 1015 6 1191 73 C1295 112 1374 112 1440 86 L1440 180 L0 180Z',
  asymmetric: 'M0 112 C155 138 283 115 405 55 C544 -14 688 20 818 86 C982 169 1168 147 1265 79 C1330 34 1385 29 1440 50 L1440 180 L0 180Z',
  footer: 'M0 78 C196 6 356 28 531 91 C720 159 878 139 1040 69 C1197 1 1329 24 1440 71 L1440 180 L0 180Z',
  heroMenu: 'M0 78 C176 22 318 26 474 96 C642 171 755 26 923 54 C1080 80 1184 148 1311 88 C1365 62 1408 55 1440 69 L1440 180 L0 180Z',
};

function SectionWave({
  position = 'top',
  fill = 'currentColor',
  variant = 'soft',
  className = '',
}) {
  return (
    <span
      className={`section-wave section-wave--${position} section-wave--${variant} ${className}`.trim()}
      style={{ color: fill }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 180" preserveAspectRatio="none">
        <path d={paths[variant] || paths.soft} fill="currentColor" stroke="none" />
      </svg>
    </span>
  );
}

export default SectionWave;
