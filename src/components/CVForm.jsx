import PersonalInfoForm from './PersonalInfoForm'
import SkillsForm from './SkillsForm'
import ExperienceForm from './ExperienceForm'
import EducationForm from './EducationForm'
import CollapsibleSection from './CollapsibleSection'
import './CVForm.css'

// CVForm ne connait pas les details de chaque section (nom, telephone,
// etc.) : il se contente de "brancher" chaque sous-formulaire sur le bon
// morceau de "data", et de renvoyer l'objet complet mis a jour via
// onChange. Chaque sous-formulaire ne voit et ne modifie que SA partie
// des donnees (personal, skills, experiences, education).
//
// Chaque section est repliable (CollapsibleSection) : avec un CV complet
// (plusieurs experiences/formations), tout afficher deplie en meme temps
// forcerait a scroller sans fin. "Informations personnelles" est ouverte
// par defaut (la premiere qu'on remplit), les autres partent fermees.
function CVForm({ data, onChange }) {
  return (
    <div className="cv-form">
      <CollapsibleSection title="Informations personnelles" defaultOpen>
        <PersonalInfoForm
          personal={data.personal}
          onChange={(personal) => onChange({ ...data, personal })}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Compétences">
        <SkillsForm
          skills={data.skills}
          onChange={(skills) => onChange({ ...data, skills })}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Expériences professionnelles">
        <ExperienceForm
          experiences={data.experiences}
          onChange={(experiences) => onChange({ ...data, experiences })}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Formations">
        <EducationForm
          education={data.education}
          onChange={(education) => onChange({ ...data, education })}
        />
      </CollapsibleSection>
    </div>
  )
}

export default CVForm
