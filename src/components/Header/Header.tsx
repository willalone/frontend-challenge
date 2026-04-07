import styles from './Header.module.css';

export type Tab = 'all' | 'favorites';

export interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.tabs} aria-label="Разделы галереи">
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
          onClick={() => onTabChange('all')}
          aria-current={activeTab === 'all' ? 'page' : undefined}
        >
          Все котики
        </button>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'favorites' ? styles.active : ''}`}
          onClick={() => onTabChange('favorites')}
          aria-current={activeTab === 'favorites' ? 'page' : undefined}
        >
          Любимые котики
        </button>
      </nav>
    </header>
  );
}
