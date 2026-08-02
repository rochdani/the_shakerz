function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  return (
    <div className={`section-heading ${align}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}

export default SectionHeading;
