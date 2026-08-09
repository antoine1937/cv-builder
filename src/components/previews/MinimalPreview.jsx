import { parseItems, formatMonth } from '../../utils/cvHelpers'
import './MinimalPreview.css'

// Modele "Minimaliste" : une seule colonne, pas de bandeau colore, tout
// en typographie. Les competences deviennent des etiquettes ("pills")
// disposees en ligne plutot qu'une liste verticale dans une sidebar.
function MinimalPreview({ data }) {
  const { personal, skills, experiences, education } = data

  return (
    <div className="cv-preview-root minimal-preview">
      <header className="minimal-header">
        {personal.photo && (
          <img className="minimal-photo" src={personal.photo} alt={personal.name} />
        )}
        <div>
          <h1 className="minimal-name">{personal.name || 'Ton nom'}</h1>
          <p className="minimal-title">{personal.title || 'Ton titre / accroche'}</p>
          <div className="minimal-contact">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.age && <span>{personal.age}</span>}
            {personal.location && <span>{personal.location}</span>}
          </div>
        </div>
      </header>

      {skills.length > 0 && (
        <section className="minimal-section">
          <h2>Compétences</h2>
          <div className="minimal-tags">
            {skills.flatMap((cat) => parseItems(cat.items)).map((item, i) => (
              <span key={i} className="minimal-tag">{item}</span>
            ))}
          </div>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="minimal-section">
          <h2>Expériences professionnelles</h2>
          {experiences.map((exp) => (
            <div key={exp.id} className="minimal-item">
              <div className="minimal-item-header">
                <p className="minimal-item-title">
                  {exp.title || 'Intitulé du poste'}
                  {exp.company && <span className="minimal-item-company"> · {exp.company}</span>}
                </p>
                <span className="minimal-item-dates">
                  {formatMonth(exp.startDate)} — {formatMonth(exp.endDate)}
                </span>
              </div>
              {exp.location && <p className="minimal-item-location">{exp.location}</p>}
              {exp.description && <p className="minimal-item-desc">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="minimal-section">
          <h2>Parcours scolaire</h2>
          {education.map((edu) => (
            <div key={edu.id} className="minimal-item">
              <div className="minimal-item-header">
                <p className="minimal-item-title">
                  {edu.title || 'Diplôme'}
                  {edu.school && <span className="minimal-item-company"> · {edu.school}</span>}
                </p>
                <span className="minimal-item-dates">
                  {formatMonth(edu.startDate)} — {formatMonth(edu.endDate)}
                </span>
              </div>
              {edu.location && <p className="minimal-item-location">{edu.location}</p>}
              {edu.description && <p className="minimal-item-desc">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

export default MinimalPreview
