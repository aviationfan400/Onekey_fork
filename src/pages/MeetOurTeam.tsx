import React from 'react';
import { useTeamStore, TeamMember } from '../store/teamStore';
import TeamMemberCard from '../components/TeamMemberCard';
import TeamCarousel from '../components/TeamCarousel';

interface TeamSectionProps {
  title: string;
  description?: string;
  members: TeamMember[];
  compact?: boolean;
  grid?: boolean; // use flat grid instead of carousel
}

const TeamSection: React.FC<TeamSectionProps> = ({ title, description, members, compact, grid }) => (
  <section className="team-section">
    <div className="container">
      <header className="team-section__intro">
        <h2 className="team-section__heading">{title}</h2>
        {description && <p className="team-section__desc">{description}</p>}
      </header>

      {grid ? (
        <div className={compact ? 'team-grid team-grid--compact' : 'team-grid'}>
          {members.map((m) => (
            <TeamMemberCard key={m.id} member={m} compact={compact} />
          ))}
        </div>
      ) : (
        <TeamCarousel members={members} compact={compact} />
      )}
    </div>
  </section>
);

const MeetOurTeam: React.FC = () => {
  const { getTeamMembersBySection } = useTeamStore();

  return (
    <div className="team-page">
      <header className="team-hero container">
        <h1 className="team-hero__title">text</h1>
        <p className="team-hero__subtitle">text</p>
      </header>

      <TeamSection
        title="Leadership"
        description="Founders driving OneKey's vision"
        members={getTeamMembersBySection('leadership')}
      />

      <TeamSection
        title="Communications"
        description="Managing outreach and community connections"
        members={getTeamMembersBySection('communications')}
      />

      <TeamSection
        title="Homework Help Coordinators"
        description="Supporting students through tutoring and academic assistance"
        members={getTeamMembersBySection('coordinators')}
      />

      <TeamSection
        title="Alumni"
        description="Founding members who continue to inspire our mission"
        members={getTeamMembersBySection('alumni')}
        compact
        grid
      />
    </div>
  );
};

export default MeetOurTeam;
