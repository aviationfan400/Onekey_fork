import React, { useEffect } from 'react';
import { useTeamStore, TeamMember } from '../store/teamStore';
import TeamMemberCard from '../components/TeamMemberCard';
import TeamCarousel from '../components/TeamCarousel';

interface TeamSectionProps {
  title: string;
  description?: string;
  members: TeamMember[];
  sectionKey: TeamMember['section'];
  compact?: boolean;
  grid?: boolean;
}

const TeamSection: React.FC<TeamSectionProps> = ({ title, description, members, sectionKey, compact, grid }) => (
  <section className="team-section">
    <div className="container">
      <header className="team-section__intro">
        <h2 className="team-section__heading">{title}</h2>
        {description && <p className="team-section__desc">{description}</p>}
      </header>

      {grid ? (
        <div className={compact ? 'team-grid team-grid--compact' : 'team-grid'}>
          {members.map((m) => (
            <TeamMemberCard key={m.id} member={m} compact={compact} displaySection={sectionKey} />
          ))}
        </div>
      ) : (
        <TeamCarousel members={members} compact={compact} displaySection={sectionKey} />
      )}
    </div>
  </section>
);

interface SplitSectionProps {
  title: string;
  description: string;
  sectionKey: TeamMember['section'];
  onekeyMembers: TeamMember[];
  vanstringMembers: TeamMember[];
  fitCards?: boolean;
}

const SplitSection: React.FC<SplitSectionProps> = ({ title, description, sectionKey, onekeyMembers, vanstringMembers, fitCards }) => (
  <section className="team-section">
    <div className="container">
      <header className="team-section__intro">
        <h2 className="team-section__heading">{title}</h2>
        <p className="team-section__desc">{description}</p>
      </header>
      <div className={`leadership-split${fitCards ? ' leadership-split--fit' : ''}`}>
        <div className="leadership-split__left" style={{ flex: Math.max(onekeyMembers.length, 1) }}>
          <span className="leadership-split__label">OneKey</span>
          <TeamCarousel members={onekeyMembers} displaySection={sectionKey} />
        </div>
        <div className="leadership-split__divider" />
        <div className="leadership-split__right" style={{ flex: Math.max(vanstringMembers.length, 1) }}>
          <span className="leadership-split__label">Vanstring</span>
          <TeamCarousel members={vanstringMembers} displaySection={sectionKey} />
        </div>
      </div>
    </div>
  </section>
);

const MeetOurTeam: React.FC = () => {
  const { getTeamMembersBySection, getTeamMembersBySectionAndGroup, fetchTeamMembers } = useTeamStore();
  useEffect(() => { fetchTeamMembers(); }, [fetchTeamMembers]);

  return (
    <div className="team-page">
      <header className="team-hero container">
        <h1 className="team-hero__title">Meet the Team</h1>
      </header>

      <SplitSection
        title="Leadership"
        description="Leaders driving our vision"
        sectionKey="leadership"
        onekeyMembers={getTeamMembersBySectionAndGroup('leadership', 'onekey')}
        vanstringMembers={getTeamMembersBySectionAndGroup('leadership', 'vanstring')}
        fitCards
      />

      <SplitSection
        title="Communications"
        description="Managing outreach and community connections"
        sectionKey="communications"
        onekeyMembers={getTeamMembersBySectionAndGroup('communications', 'onekey')}
        vanstringMembers={getTeamMembersBySectionAndGroup('communications', 'vanstring')}
        fitCards
      />

      <TeamSection
        title="Homework Help Coordinators"
        description="Supporting students through tutoring and academic assistance"
        sectionKey="coordinators"
        members={getTeamMembersBySection('coordinators')}
      />

      <TeamSection
        title="Financial Managers"
        description="Managing budgets and finances to keep our organization running"
        sectionKey="finance"
        members={getTeamMembersBySection('finance')}
      />

      <TeamSection
        title="Concertmasters"
        description="Leading Vanstring's performances"
        sectionKey="concertmasters"
        members={getTeamMembersBySection('concertmasters')}
      />

      <TeamSection
        title="Tech & Design"
        description="Building the website, designing logos, and creating the tools that keep OneKey running"
        sectionKey="techdesign"
        members={getTeamMembersBySection('techdesign')}
      />

      <TeamSection
        title="Alumni"
        description="Founding members who continue to inspire our mission"
        sectionKey="alumni"
        members={getTeamMembersBySection('alumni')}
        compact
        grid
      />
    </div>
  );
};

export default MeetOurTeam;
