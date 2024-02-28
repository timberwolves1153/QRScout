import { useTheme } from 'next-themes';
import { useState } from 'preact/hooks';
import Colors from '../../../colors'

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [team, setTeam] = useState("1153");
  
  function updateColors() {
    let curtheme = theme;
    if (curtheme === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // dark mode
      curtheme = 'dark'
    }
    if (curtheme === undefined || curtheme === 'system') {
      curtheme = 'light';
    }   
    document.documentElement.style.setProperty(`--color-primary`, Colors[team][curtheme]['primary']);
    document.documentElement.style.setProperty(`--color-secondary`, Colors[team][curtheme]['secondary']);
    document.documentElement.style.setProperty(`--color-background`, Colors[team][curtheme]['background']);
    document.documentElement.style.setProperty(`--color-foreground`, Colors[team][curtheme]['foreground']);
  }

  updateColors();

  return (
    <div className="mx-2 flex flex-col justify-start bg-gray-500 p-2 rounded">
      <div className="rounded-t pb-2 text-left font-bold text-white">Theme</div>
      <select
        className="rounded bg-white px-4 py-2 dark:bg-gray-700 dark:text-white"
        name="Theme"
        id="theme"
        onInput={v => setTheme(v.currentTarget.value)}
        value={theme}
      >
        <option key={'system'} value={'system'}>
          System
        </option>
        <option key={'dark'} value={'dark'}>
          Dark
        </option>
        <option key={'light'} value={'light'}>
          Light
        </option>
      </select>
      <select
        className="rounded bg-white px-4 py-2 dark:bg-gray-700 dark:text-white"
        name="Color"
        id="color"
        onInput={v => {setTeam(v.currentTarget.value); updateColors()}}
        value={team}
      >
        <option key={'1153'} value={'1153'}>
          1153
        </option>
        <option key={'1119'} value={'1119'}>
          1119
        </option>
      </select>
    </div>
  );
}
