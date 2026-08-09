import { parseItems, formatMonth } from '../../utils/cvHelpers'
import './ClassicPreview.css'

// Le modele "Classique" (celui qu'on a construit en premier) : bandeau
// bleu fonce a gauche (photo, contact, competences), contenu principal a
// droite (accroche, experiences, formations en timeline).
function ClassicPreview({ data }) {
  const { personal, skills, experiences, education } = data

  return (
    <div className="cv-preview-root classic-preview">
      <aside className="classic-sidebar">
        {/* Photo/nom/contact regroupes dans un seul bloc : avec
            "justify-content: space-between" sur .classic-sidebar, on veut
            de l'espace entre CE bloc et chaque categorie de competences --
            pas entre la photo et le nom individuellement. */}
        <div className="classic-header-block">
          {personal.photo && (
            <img className="classic-photo" src={personal.photo} alt={personal.name} />
          )}
          <h2 className="classic-name">{personal.name || 'Ton nom'}</h2>

          <div className="classic-contact">
            {personal.email && <p>✉️ {personal.email}</p>}
            {personal.phone && <p>📞 {personal.phone}</p>}
            {personal.age && <p>📅 {personal.age}</p>}
            {personal.location && <p>📍 {personal.location}</p>}
          </div>
        </div>

        {skills.map((cat) => {
          const items = parseItems(cat.items)
          if (!cat.category && items.length === 0) return null

          return (
            <div key={cat.id} className="classic-skill-block">
              <h3>{cat.category || 'Compétences'}</h3>
              <ul>
                {items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )
        })}
      </aside>

      <div className="classic-main">
        <h1 className="classic-headline">{personal.title || 'Ton titre / accroche'}</h1>
        {personal.summary && <p className="classic-summary">{personal.summary}</p>}

        {experiences.length > 0 && (
          <section className="classic-timeline-section">
            <h3>Expériences professionnelles</h3>
            {experiences.map((exp) => (
              <div key={exp.id} className="classic-timeline-item">
                <div className="classic-timeline-dates">
                  {formatMonth(exp.startDate)} — {formatMonth(exp.endDate)}
                </div>
                <div className="classic-timeline-content">
                  <p className="classic-timeline-title">{exp.title || 'Intitulé du poste'}</p>
                  <p className="classic-timeline-subtitle">
                    {exp.company}
                    {exp.company && exp.location && ' — '}
                    {exp.location}
                  </p>
                  {exp.description && <p className="classic-timeline-desc">{exp.description}</p>}
                </div>
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section className="classic-timeline-section">
            <h3>Parcours scolaire</h3>
            {education.map((edu) => (
              <div key={edu.id} className="classic-timeline-item">
                <div className="classic-timeline-dates">
                  {formatMonth(edu.startDate)} — {formatMonth(edu.endDate)}
                </div>
                <div className="classic-timeline-content">
                  <p className="classic-timeline-title">{edu.title || 'Diplôme'}</p>
                  <p className="classic-timeline-subtitle">
                    {edu.school}
                    {edu.school && edu.location && ' — '}
                    {edu.location}
                  </p>
                  {edu.description && <p className="classic-timeline-desc">{edu.description}</p>}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

export default ClassicPreview
