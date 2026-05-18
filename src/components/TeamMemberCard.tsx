import React from 'react';
import { Instagram } from 'lucide-react';
import { TeamMember } from '../store/teamStore';
import { resolveTeamImageSrc } from '../utils/teamImageUrl';

const SECTION_LABELS: Record<TeamMember['section'], string> = {
  leadership: 'General Manager',
  communications: 'Communications Coordinator',
  coordinators: 'Homework Help Coordinator',
  finance: 'Financial Manager',
  concertmasters: 'Concertmaster',
  techdesign: 'Tech & Design Member',
  alumni: 'Founding Member',
};

const CONCERTMASTER_LABELS: Record<NonNullable<TeamMember['concertmasterType']>, string> = {
  concertmaster: 'Concertmaster',
  associate: 'Associate Concertmaster',
  principal_second: 'Principal Second Violin',
};

interface TeamMemberCardProps {
  member: TeamMember;
  compact?: boolean;
  displaySection?: TeamMember['section'];
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, compact = false, displaySection }) => {
  const imageSrc = resolveTeamImageSrc(member.image);

  const allSections: TeamMember['section'][] = [member.section, ...(member.extraSections ?? [])];
  const alsoIn = displaySection ? allSections.filter(s => s !== displaySection) : [];

  const crossListedConcertmasterType =
    displaySection === 'concertmasters' && member.section !== 'concertmasters'
      ? member.extraSectionsConcertmasterTypes?.['concertmasters']
      : undefined;

  const displayedRole =
    crossListedConcertmasterType
      ? CONCERTMASTER_LABELS[crossListedConcertmasterType]
      : displaySection && displaySection !== member.section
      ? SECTION_LABELS[displaySection]
      : member.concertmasterType
      ? CONCERTMASTER_LABELS[member.concertmasterType]
      : member.role;

  return (
    <article className={`team-card${compact ? ' team-card--compact' : ''}`}>
      <div className="team-card__photo-wrap">
        {imageSrc ? (
          <img src={imageSrc} alt={member.name} className="team-card__photo" loading="lazy" />
        ) : (
          <div className="team-card__photo-fallback">{member.name.charAt(0)}</div>
        )}
      </div>

      <div className="team-card__info">
        <h3 className="team-card__name">{member.name}</h3>
        <p className="team-card__role">{displayedRole}</p>
        {alsoIn.length > 0 && (
          <p className="team-card__also-in">
            Also as: {alsoIn.map(s => SECTION_LABELS[s]).join(', ')}
          </p>
        )}
        {member.school && !compact && <p className="team-card__school">{member.school}</p>}
        {!compact && member.bio && <p className="team-card__bio">{member.bio}</p>}
        {member.instagram && (
          <a
            href={member.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="team-card__ig-btn"
            aria-label={`${member.name} on Instagram`}
          >
            <Instagram size={18} strokeWidth={1.25} aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
};

export default TeamMemberCard;
