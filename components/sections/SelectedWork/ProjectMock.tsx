import type { CSSProperties, ReactNode } from 'react';
import type { MockKind } from '@/data/projects';
import s from './SelectedWork.module.css';

// Mockup UI sederhana sebagai pengganti screenshot.
// Kalau punya screenshot asli, isi field `image` di data/projects.ts.

type Tone = 'dark' | 'mid';
const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

function Blk({ tone, style }: { tone?: Tone; style?: CSSProperties }) {
  return <div className={cx(s.blk, tone === 'dark' && s.blkDark, tone === 'mid' && s.blkMid)} style={style} />;
}

function Rows({ n, h = 14 }: { n: number; h?: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <Blk key={i} tone={i % 2 ? undefined : 'mid'} style={{ height: h }} />
      ))}
    </>
  );
}

function Browser({ children }: { children: ReactNode }) {
  return (
    <div className={s.bw}>
      <div className={s.bwBar}><i /><i /><i /></div>
      <div className={s.bwBody}>{children}</div>
    </div>
  );
}

const Lab = ({ children, sub }: { children: ReactNode; sub?: boolean }) => (
  <span className={cx(s.lab, sub && s.labSub)}>{children}</span>
);

export default function ProjectMock({ kind }: { kind: MockKind }) {
  switch (kind) {
    case 'workbench':
      return (
        <Browser>
          <div className={cx(s.side, s.sideDark)}>
            <Lab>WorkBench</Lab>
            <Lab sub>Account Planning</Lab>
            <Lab sub>Customer Tagging</Lab>
            <Lab sub>Approval Monitoring</Lab>
          </div>
          <div className={s.col}>
            <div className={s.row} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Lab>Account Planning</Lab>
              <Blk tone="dark" style={{ width: 54, height: 18, borderRadius: 99 }} />
            </div>
            <Rows n={6} />
          </div>
        </Browser>
      );
    case 'inventory':
      return (
        <Browser>
          <div className={s.col}>
            <Lab>Inventory</Lab>
            <div className={s.row}>
              {(['mid', 'dark', 'mid', 'mid'] as Tone[]).map((t, i) => (
                <Blk key={i} tone={t} style={{ flex: 1, height: 44 }} />
              ))}
            </div>
            <Rows n={5} />
          </div>
        </Browser>
      );
    case 'quiz':
      return (
        <Browser>
          <div className={s.col}>
            <Lab>Quiz</Lab>
            <Lab sub>Question 3 of 10</Lab>
            <div className={s.blk} style={{ height: 6, borderRadius: 9 }}>
              <Blk tone="dark" style={{ width: '30%', height: 6, borderRadius: 9 }} />
            </div>
            <Blk tone="mid" style={{ height: 44 }} />
            <div className={s.row}><Blk style={{ flex: 1, height: 26 }} /><Blk tone="dark" style={{ flex: 1, height: 26 }} /></div>
            <div className={s.row}><Blk style={{ flex: 1, height: 26 }} /><Blk style={{ flex: 1, height: 26 }} /></div>
          </div>
        </Browser>
      );
    case 'mobile':
      return (
        <div className={s.phones}>
          <div className={s.phone}>
            <div className={s.screen}>
              <Lab>Budget</Lab>
              <div className={s.ring} />
              <Blk style={{ height: 22 }} />
              <Blk style={{ height: 22 }} />
              <Blk tone="dark" style={{ height: 20, borderRadius: 99 }} />
            </div>
          </div>
          <div className={s.phone} style={{ transform: 'rotate(6deg)' }}>
            <div className={s.screen}>
              <Lab>Register</Lab>
              <Blk style={{ height: 22 }} />
              <Blk style={{ height: 22 }} />
              <Blk style={{ height: 22 }} />
              <Blk tone="dark" style={{ height: 20, borderRadius: 99 }} />
              <Lab sub>Forgot password?</Lab>
            </div>
          </div>
        </div>
      );
    case 'game':
      return (
        <Browser>
          <div className={cx(s.col, s.gameScreen)}>
            <span className={s.gameTitle}>GARUDA ELEVEN</span>
            <Lab sub>Collect, own, play</Lab>
            <div className={s.row} style={{ width: '76%', marginTop: 6 }}>
              {['#2b2b2e', '#e9e7e2', '#2b2b2e', '#e9e7e2'].map((c, i) => (
                <div key={i} style={{ flex: 1, aspectRatio: '3 / 4', borderRadius: 8, background: c }} />
              ))}
            </div>
          </div>
        </Browser>
      );
    case 'cms':
      return (
        <Browser>
          <div className={cx(s.side, s.sideLight)}>
            <Lab sub>Characters</Lab>
            <Lab sub>Quests</Lab>
            <Lab sub>Items</Lab>
          </div>
          <div className={s.col}>
            <Lab>Character Management</Lab>
            <div className={s.grid4}>
              {Array.from({ length: 8 }, (_, i) => <Blk key={i} tone={i === 2 ? 'dark' : 'mid'} />)}
            </div>
          </div>
        </Browser>
      );
    case 'venue':
      return (
        <Browser>
          <div className={s.col}>
            <Lab>Affitto</Lab>
            <div className={s.row}>
              <Blk style={{ flex: 1, height: 20, borderRadius: 99 }} />
              <Blk tone="dark" style={{ width: '28%', height: 20, borderRadius: 99 }} />
            </div>
            <div className={s.row} style={{ flex: 1 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} className={s.col}>
                  <Blk tone="mid" style={{ flex: 1 }} />
                  <Blk style={{ height: 8, width: '70%' }} />
                  <Blk style={{ height: 8, width: '45%' }} />
                </div>
              ))}
            </div>
          </div>
        </Browser>
      );
    case 'report':
      return (
        <Browser>
          <div className={s.col}>
            <Lab>Our Achievement</Lab>
            <div className={s.row}>
              <Blk tone="dark" style={{ flex: 1, height: 40 }} />
              <Blk tone="mid" style={{ flex: 1, height: 40 }} />
              <Blk tone="mid" style={{ flex: 1, height: 40 }} />
            </div>
            <div className={s.row} style={{ flex: 1, alignItems: 'flex-end' }}>
              {[40, 62, 50, 74, 58, 80, 96, 70, 88, 64, 76].map((h, i) => (
                <Blk key={i} tone={i === 6 ? 'dark' : 'mid'} style={{ flex: 1, height: `${h}%`, borderRadius: 4 }} />
              ))}
            </div>
          </div>
        </Browser>
      );
  }
}
