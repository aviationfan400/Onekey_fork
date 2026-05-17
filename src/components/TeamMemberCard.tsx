import React from 'react';
import { Instagram } from 'lucide-react';
import { TeamMember } from '../store/teamStore';
import { resolveTeamImageSrc } from '../utils/teamImageUrl';

interface TeamMemberCardProps {
  member: TeamMember;
  compact?: boolean;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, compact = false }) => {
  const imageSrc = resolveTeamImageSrc(member.image);

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
        <p className="team-card__role">{member.role}</p>
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
