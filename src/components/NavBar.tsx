import type { TabId } from '../App';

const tabs: { id: TabId; label: string }[] = [
  { id: 'home', label: 'HOME' },
  { id: 'repos', label: 'REPOS' },
  { id: 'about', label: 'ABOUT' },
];

interface NavBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const NavBar = ({ activeTab, onTabChange }: NavBarProps) => (
  <>
    {tabs.map((tab) => (
      <button
        key={tab.id}
        className={activeTab === tab.id ? 'sl-active' : ''}
        onClick={() => onTabChange(tab.id)}
      >
        {tab.label}
      </button>
    ))}
    <a href="https://sdlsr.dpdns.org/git">
      <button>GIT</button>
    </a>
  </>
);

export default NavBar;
