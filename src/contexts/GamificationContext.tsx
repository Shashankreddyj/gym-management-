import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

interface XPState {
  total: number;
  level: number;
  xpToNextLevel: number;
  currentLevelXP: number;
}

interface GamificationState {
  xp: XPState;
  coins: number;
  streakFreezes: number;
  quests: DailyQuest[];
  personalRecords: PersonalRecord[];
  referralCount: number;
  addXP: (amount: number, reason: string) => void;
  addCoins: (amount: number) => void;
  useStreakFreeze: () => boolean;
  completeQuest: (questId: string) => void;
  checkPR: (pr: PersonalRecord) => void;
  addReferral: () => void;
  recentMilestone: string | null;
  dismissMilestone: () => void;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  reward: { xp: number; coins: number };
  progress: number;
  target: number;
  completed: boolean;
  icon: string;
}

export interface PersonalRecord {
  id: string;
  title: string;
  value: string;
  date: string;
  type: 'visits' | 'streak' | 'classes' | 'weight' | 'speed';
}

const generateDailyQuests = (): DailyQuest[] => {
  const questPool = [
    { title: 'Early Bird', description: 'Check in before 7:00 AM', icon: '🌅', target: 1, reward: { xp: 30, coins: 10 } },
    { title: 'Class Explorer', description: 'Try a new class type today', icon: '🔄', target: 1, reward: { xp: 25, coins: 8 } },
    { title: 'Social Butterfly', description: 'Bring a friend or refer someone', icon: '👥', target: 1, reward: { xp: 50, coins: 20 } },
    { title: 'Double Session', description: 'Check in twice today', icon: '💪', target: 2, reward: { xp: 40, coins: 15 } },
    { title: 'Streak Builder', description: 'Maintain your check-in streak', icon: '🔥', target: 1, reward: { xp: 20, coins: 5 } },
    { title: 'Plan Completer', description: 'Finish all scheduled workouts today', icon: '📋', target: 1, reward: { xp: 35, coins: 12 } },
    { title: 'Cardio King', description: 'Complete 30+ min of cardio', icon: '🏃', target: 1, reward: { xp: 25, coins: 8 } },
    { title: 'Iron Climber', description: 'Complete 4+ gym sessions this week', icon: '📈', target: 4, reward: { xp: 45, coins: 18 } },
    { title: 'Night Owl', description: 'Check in after 8:00 PM', icon: '🦉', target: 1, reward: { xp: 20, coins: 5 } },
    { title: 'Hydration Hero', description: 'Track 8 glasses of water today', icon: '💧', target: 8, reward: { xp: 15, coins: 5 } },
  ];
  const shuffled = [...questPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map((q, i) => ({
    id: `quest-${Date.now()}-${i}`,
    ...q,
    progress: 0,
    completed: false,
  }));
};

const XP_PER_LEVEL = 100;
const XP_ACTIONS: Record<string, number> = {
  checkin: 10,
  class: 25,
  referral: 100,
  streak_milestone: 50,
  weight_loss: 30,
  challenge_win: 200,
  pr_broken: 75,
  quest_complete: 0,
};

const COIN_ACTIONS: Record<string, number> = {
  checkin: 5,
  class: 10,
  referral: 50,
  streak_milestone: 25,
  challenge_win: 100,
  pr_broken: 40,
  quest_complete: 0,
};

const DefaultGamification: GamificationState = {
  xp: { total: 0, level: 1, xpToNextLevel: 100, currentLevelXP: 0 },
  coins: 0,
  streakFreezes: 0,
  quests: [],
  personalRecords: [],
  referralCount: 0,
  recentMilestone: null,
  addXP: () => {}, addCoins: () => {}, useStreakFreeze: () => false,
  completeQuest: () => {}, checkPR: () => {}, addReferral: () => {},
  dismissMilestone: () => {},
};

const GamificationContext = createContext<GamificationState>(DefaultGamification);

export function GamificationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('ironforge-gamification');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.quests.length === 0 || new Date(parsed.questDate || 0).getDate() !== new Date().getDate()) {
          parsed.quests = generateDailyQuests();
          parsed.questDate = new Date().toISOString();
        }
        return parsed;
      } catch { /* fall through */ }
    }
    return {
      totalXP: 0, level: 1, coins: 145, streakFreezes: 1,
      quests: generateDailyQuests(), questDate: new Date().toISOString(),
      personalRecords: [] as PersonalRecord[],
      referralCount: 2, recentMilestone: null,
    };
  });
  const [recentMilestone, setRecentMilestone] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('ironforge-gamification', JSON.stringify(state));
  }, [state]);

  const addXP = useCallback((amount: number, reason: string) => {
    setState((prev: any) => {
      const newTotal = prev.totalXP + amount;
      const newLevel = Math.floor(newTotal / XP_PER_LEVEL) + 1;
      const oldLevel = prev.level;
      let milestone: string | null = null;
      if (newLevel > oldLevel) {
        milestone = `🎉 Level ${newLevel}! Keep going!`;
        setRecentMilestone(`🎉 Level ${newLevel} Reached!`);
      }
      if (newTotal >= 500 && prev.totalXP < 500) milestone = '🏆 500 XP Milestone!';
      if (newTotal >= 1000 && prev.totalXP < 1000) milestone = '👑 1,000 XP — Elite Status!';
      const currentLevelXP = (newTotal - (newLevel - 1) * XP_PER_LEVEL);
      return {
        ...prev,
        totalXP: newTotal,
        level: newLevel,
      };
    });
    if (recentMilestone) {
      const m = recentMilestone;
      setTimeout(() => { if (recentMilestone === m) setRecentMilestone(null); }, 4000);
    }
  }, [recentMilestone]);

  const addCoins = useCallback((amount: number) => {
    setState((prev: any) => ({ ...prev, coins: prev.coins + amount }));
  }, []);

  const useStreakFreeze = useCallback(() => {
    let used = false;
    setState((prev: any) => {
      if (prev.streakFreezes > 0) { used = true; return { ...prev, streakFreezes: prev.streakFreezes - 1 }; }
      return prev;
    });
    return used;
  }, []);

  const completeQuest = useCallback((questId: string) => {
    setState((prev: any) => {
      const quest = prev.quests.find((q: DailyQuest) => q.id === questId);
      if (!quest || quest.completed) return prev;
      const newQuests = prev.quests.map((q: DailyQuest) =>
        q.id === questId ? { ...q, completed: true } : q
      );
      return { ...prev, quests: newQuests, totalXP: prev.totalXP + quest.reward.xp, coins: prev.coins + quest.reward.coins };
    });
    setRecentMilestone('✅ Quest Complete! +XP & Coins');
  }, []);

  const checkPR = useCallback((pr: PersonalRecord) => {
    setState((prev: any) => {
      const existing = prev.personalRecords.find((r: PersonalRecord) => r.id === pr.id);
      if (!existing || parseFloat(pr.value) > parseFloat(existing.value)) {
        const newRecords = existing
          ? prev.personalRecords.map((r: PersonalRecord) => r.id === pr.id ? pr : r)
          : [...prev.personalRecords, pr];
        setRecentMilestone(`🏆 New PR: ${pr.title}!`);
        return { ...prev, personalRecords: newRecords, totalXP: prev.totalXP + 75, coins: prev.coins + 40 };
      }
      return prev;
    });
  }, []);

  const addReferral = useCallback(() => {
    setState((prev: any) => ({ ...prev, referralCount: prev.referralCount + 1, totalXP: prev.totalXP + 100, coins: prev.coins + 50 }));
  }, []);

  const dismissMilestone = useCallback(() => setRecentMilestone(null), []);

  const xp: XPState = {
    total: state.totalXP,
    level: state.level,
    xpToNextLevel: XP_PER_LEVEL,
    currentLevelXP: state.totalXP - (state.level - 1) * XP_PER_LEVEL,
  };

  return (
    <GamificationContext.Provider value={{
      xp, coins: state.coins, streakFreezes: state.streakFreezes,
      quests: state.quests, personalRecords: state.personalRecords,
      referralCount: state.referralCount,
      addXP, addCoins, useStreakFreeze, completeQuest, checkPR, addReferral,
      recentMilestone, dismissMilestone,
    }}>
      {children}
    </GamificationContext.Provider>
  );
}

export const useGamification = () => useContext(GamificationContext);
