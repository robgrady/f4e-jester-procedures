# F-4E Jester Procedures Mod - Installation

## Requirements

- DCS World with Heatblur F-4E Phantom II module installed
- Jester AI enabled

## Installation

### Lua Mod (Jester Wheel Integration)

Copy the Lua files to your DCS saved games Jester mods folder:

```
Saved Games/DCS_F4E/jester/mods/
├── A2GProcedures.lua
├── A2AProcedures.lua
├── GeneralProcedures.lua
├── ui/
│   ├── A2GMenu.lua
│   ├── A2AMenu.lua
│   └── GeneralMenu.lua
└── init/
    ├── LaunchA2GProcedures.lua
    ├── LaunchA2AProcedures.lua
    └── LaunchGeneralProcedures.lua
```

**Steps:**

1. Navigate to your DCS saved games folder (typically `C:\Users\<YourName>\Saved Games\DCS_F4E\`)
2. Create the `jester/mods/` directory if it does not exist
3. Create `jester/mods/ui/` and `jester/mods/init/` subdirectories
4. Copy the behavior modules from `lua/` to `jester/mods/`:
   - `A2GProcedures.lua`
   - `A2AProcedures.lua`
   - `GeneralProcedures.lua`
5. Copy the menu modules from `lua/ui/` to `jester/mods/ui/`:
   - `A2GMenu.lua`
   - `A2AMenu.lua`
   - `GeneralMenu.lua`
6. Copy the init loaders from `lua/init/` to `jester/mods/init/`:
   - `LaunchA2GProcedures.lua`
   - `LaunchA2AProcedures.lua`
   - `LaunchGeneralProcedures.lua`

### HTML Overlay (Procedure Cards)

The overlay can be used in two ways:

**Option A: HBUI Virtual Browser (In-Game)**

1. Launch DCS and load into the F-4E cockpit
2. Open the HBUI Virtual Browser
3. Navigate to the local file path of `overlay/index.html`

**Option B: Standalone Browser (Reference/Development)**

1. Open `overlay/index.html` in any web browser (Chrome, Firefox, Edge)
2. Use alongside DCS on a second monitor or tablet

**Option C: UI Mod Installation**

1. Copy the entire `overlay/` folder to your F-4E UI mods directory:
   `<DCS Install>\Mods\aircraft\F-4E\UI\A2GProcedures\`
2. Reload with SHIFT+R in DCS

## Usage

### Jester Wheel

1. Open the Jester Wheel (default: `A` key or right-click)
2. Select one of the three procedure categories:
   - **A2G Procedures** — 12 air-to-ground delivery modes (Dive Toss, CCRP, CCIP, Rockets, etc.)
   - **A2A Procedures** — 5 air-to-air modes (Sparrow Boresight, Sparrow Radar, Sidewinder, Guns A/A, Radar Intercept)
   - **General Procedures** — 3 general procedures (Cold Start, Nav/INS Alignment, Landing & Approach)
3. Select a specific procedure to expand its sub-menu
4. Choose from:
   - **Setup Checklist** - Configuration steps
   - **Attack/Startup/Alignment Procedure** - Step-by-step execution sequence
   - **Settings** - Detailed parameter reference (where applicable)

Jester will acknowledge your selection with "Roger" and display the
procedure text in the wheel info area.

### HTML Overlay

- Click any mode tab at the top to switch between all 20 procedures
- Procedures are organized into three sections: A2G, A2A, and General
- Click checklist items to check/uncheck them as you complete steps
- Use the RESET button to clear all checkmarks
- Arrow keys navigate between available modes

## Generating the PDF Kneeboard

A printable PDF containing all 20 procedures (diagrams, checklists, settings, and notes) can be generated using the included Puppeteer script.

**Requirements:** Node.js 18+

```bash
cd jester-a2g-mod
npm install
node generate-pdf.js
```

This outputs `f4e-procedures.pdf` (Letter format, one procedure per page). You can also open `overlay/print.html` directly in a browser and use Ctrl+P to print.

## Debugging

- Open the in-game Lua console with **RCTRL+L**
- Look for `[A2G Procedures]`, `[A2A Procedures]`, and `[General Procedures]` log entries
- Lua changes reload with **CTRL+R** (mission reload)
- UI changes reload with **SHIFT+R**

## Uninstallation

Delete the following files from `Saved Games/DCS_F4E/jester/mods/`:
- `A2GProcedures.lua`
- `A2AProcedures.lua`
- `GeneralProcedures.lua`
- `ui/A2GMenu.lua`
- `ui/A2AMenu.lua`
- `ui/GeneralMenu.lua`
- `init/LaunchA2GProcedures.lua`
- `init/LaunchA2AProcedures.lua`
- `init/LaunchGeneralProcedures.lua`

## License

This mod is provided for personal use with the DCS F-4E Phantom II module.
Procedure data sourced from the Heatblur F-4E Manual.
