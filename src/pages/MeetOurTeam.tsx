import React from 'react';
import { useTeamStore, TeamMember } from '../store/teamStore';
import TeamMemberCard from '../components/TeamMemberCard';

interface TeamSectionProps {
  title: string;
  description?: string;
  members: TeamMember[];
  compact?: boolean;
}

const TeamSection: React.FC<TeamSectionProps> = ({ title, description, members, compact }) => (
  <section className="team-section">
    <div className="container">
      <header className="team-section__intro">
        <h2 className="team-section__heading">{title}</h2>
        {description && <p className="team-section__desc">{description}</p>}
      </header>
      <div className={compact ? 'team-grid team-grid--compact' : 'team-grid'}>
        {members.map((member) => (
          <TeamMemberCard key={member.id} member={member} compact={compact} />
        ))}
      </div>
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
      />
    </div>
  );
};

export default MeetOurTeam;
