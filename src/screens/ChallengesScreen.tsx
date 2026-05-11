import { BASE_CHALLENGES, BaseChallenge } from '../data/challenges';
import { ActiveChallenge, currentStreak, expectedSessionDates, isComplete } from '../hooks/useChallenges';
import './ChallengesScreen.css';

interface Props {
  activeChallenges: ActiveChallenge[];
  onBack: () => void;
  onViewActive: (instanceId: string) => void;
  onConfigure: (challenge: BaseChallenge) => void;
}

function getDurationDays(challengeId: string): number {
  return BASE_CHALLENGES.find((c) => c.id === challengeId)?.durationDays ?? 30;
}

export function ChallengesScreen({ activeChallenges, onBack, onViewActive, onConfigure }: Props) {
  const ongoing = activeChallenges.filter((ac) => {
    const days = getDurationDays(ac.challengeId);
    return !isComplete(ac, days);
  });

  return (
    <div className="challenges-screen">
      <div className="challenges-topbar">
        <button className="challenges-back-btn" onClick={onBack} aria-label="Back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <span className="challenges-title">CHALLENGES</span>
      </div>

      <div className="challenges-content">
        {ongoing.length > 0 && (
          <section className="challenges-section">
            <h2 className="challenges-section-title">Active</h2>
            <div className="active-challenge-list">
              {ongoing.map((ac) => {
                const base = BASE_CHALLENGES.find((c) => c.id === ac.challengeId);
                if (!base) return null;
                const sessions = expectedSessionDates(ac, base.durationDays);
                const done = ac.completedDates.length;
                const total = sessions.length;
                const streak = currentStreak(ac, base.durationDays);
                return (
                  <button
                    key={ac.instanceId}
                    className="active-challenge-card"
                    onClick={() => onViewActive(ac.instanceId)}
                  >
                    <div className="active-challenge-info">
                      <span className="active-challenge-name">{base.name}</span>
                      <span className="active-challenge-streak">
                        {streak > 0 ? `${streak} day streak` : `${done} / ${total} done`}
                      </span>
                    </div>
                    <div className="active-challenge-bar">
                      <div
                        className="active-challenge-fill"
                        style={{ width: `${total > 0 ? (done / total) * 100 : 0}%` }}
                      />
                    </div>
                    <svg className="active-challenge-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        <section className="challenges-section">
          <h2 className="challenges-section-title">Start a challenge</h2>
          <div className="base-challenge-list">
            {BASE_CHALLENGES.map((c) => (
              <button
                key={c.id}
                className="base-challenge-card"
                onClick={() => onConfigure(c)}
              >
                <div className="base-challenge-info">
                  <span className="base-challenge-name">{c.name}</span>
                  <span className="base-challenge-desc">{c.description}</span>
                </div>
                <span className="base-challenge-badge">{c.durationDays}d</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
