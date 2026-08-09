import { parseItems, formatMonth } from '../../utils/cvHelpers'
import './ModernPreview.css'

// Modele "Moderne" : bandeau colore horizontal en haut (au lieu d'une
// sidebar verticale), puis un corps en deux colonnes -- competences a
// gauche (en colonne etroite), experiences/formations a droite.
function ModernPreview({ data }) {
  const { personal, skills, experiences, education } = data

  return (
    <div className="cv-preview-root modern-preview">
      <header className="modern-banner">
        {personal.photo && (
          <img className="modern-photo" src={personal.photo} alt={personal.name} />
        )}
        <div>
          <h1 className="modern-name">{personal.name || 'Ton nom'}</h1>
          <p className="modern-title">{personal.title || 'Ton titre / accroche'}</p>
        </div>
      </header>

      <div className="modern-body">
        <aside className="modern-aside">
          <div className="modern-block">
            <h2>Contact</h2>
            <ul className="modern-contact-list">
              {personal.email && <li>{personal.email}</li>}
              {personal.phone && <li>{personal.phone}</li>}
              {personal.age && <li>{personal.age}</li>}
              {personal.location && <li>{personal.location}</li>}
            </ul>
          </div>

          {skills.map((cat) => {
            const items = parseItems(cat.items)
            if (!cat.category && items.length === 0) return null

            return (
              <div key={cat.id} className="modern-block">
                <h2>{cat.category || 'Compétences'}</h2>
                <div className="modern-tags">
                  {items.map((item, i) => (
                    <span key={i} className="modern-tag">{item}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </aside>

        <main className="modern-main">
          {experiences.length > 0 && (
            <section className="modern-section">
              <h2>Expériences professionnelles</h2>
              {experiences.map((exp) => (
                <div key={exp.id} className="modern-item">
                  <span className="modern-dot" />
                  <div>
                    <p className="modern-item-dates">
                      {formatMonth(exp.startDate)} — {formatMonth(exp.endDate)}
                    </p>
                    <p className="modern-item-title">{exp.title || 'Intitulé du poste'}</p>
                    <p className="modern-item-subtitle">
                      {exp.company}
                      {exp.company && exp.location && ' — '}
                      {exp.location}
                    </p>
                    {exp.description && <p className="modern-item-desc">{exp.description}</p>}
                  </div>
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section className="modern-section">
              <h2>Parcours scolaire</h2>
              {education.map((edu) => (
                <div key={edu.id} className="modern-item">
                  <span className="modern-dot" />
                  <div>
                    <p className="modern-item-dates">
                      {formatMonth(edu.startDate)} — {formatMonth(edu.endDate)}
                    </p>
                    <p className="modern-item-title">{edu.title || 'Diplôme'}</p>
                    <p className="modern-item-subtitle">
                      {edu.school}
                      {edu.school && edu.location && ' — '}
                      {edu.location}
                    </p>
                    {edu.description && <p className="modern-item-desc">{edu.description}</p>}
                  </div>
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default ModernPreview
