--[[
  F-4E Jester General Procedures - Wheel Menu Definitions
  Adds "General Procedures" menu tree to the Jester Wheel
  with sub-items for Cold Start, Nav/INS, and Landing.
]]

-- ============================================================
-- PROCEDURE TEXT DEFINITIONS
-- ============================================================

local function heading(title)
  return title .. "\n" .. string.rep("=", #title)
end

-- ---- COLD START ----
local COLD_START_SETUP = table.concat({
  heading("COLD START SETUP"),
  " 1. [BOTH] Seat Pins ............. REMOVE & STOW",
  " 2. [BOTH] Canopy/Intake Covers .. REMOVED",
  " 3. [PLT]  Generator Switches .... OFF (both)",
  " 4. [PLT]  Throttles ............. OFF",
  " 5. [PLT]  Landing Gear Handle ... IN & DOWN",
  " 6. [PLT]  Battery ............... ON",
  " 7. [PLT]  External Power ........ CONNECT & ON",
  " 8. [PLT]  Master Arm ............ SAFE",
  " 9. [PLT]  Fuel Control Panel .... CHECK",
  "10. [PLT]  Anti-Skid ............. TEST then ON",
  "11. [PLT]  Oxygen ................ CHECK QTY",
  "12. [WSO]  INS Mode Knob ......... STBY",
  "    SOLO: Start alignment early",
  "13. [BOTH] ICS Panel ............. HOT MIC",
  "14. [WSO]  Cabin Press ........... CHECK",
  "15. [PLT]  UHF Radio ............. SET FREQ",
  "16. [WSO]  Nav Computer .......... STBY",
  "    SOLO: Jester Wheel > Nav",
  "17. [PLT]  Flight Controls ....... FREE & CORRECT",
  "18. [PLT]  Engine Master Sw ...... ON (both)",
  "19. [BOTH] Circuit Breakers ...... CHECK ALL IN",
}, "\n")

local COLD_START_PROCEDURE = table.concat({
  heading("COLD START PROCEDURE"),
  " 1. Confirm area clear; fire guard posted",
  " 2. External air source: connect RIGHT engine",
  " 3. External airflow ON; monitor RPM rise",
  " 4. At 10% RPM: PRESS & HOLD R ignition",
  " 5. R throttle: HALF then IDLE (watch EGT)",
  " 6. Release ignition at lightoff",
  " 7. At 45% RPM: stop external airflow",
  " 8. Check R engine:",
  "    EGT 220-420°C | RPM 65±1%",
  "    Oil 12-50 PSI | FF 800-1400 pph",
  " 9. Right generator ON",
  "10. Repeat for LEFT engine (steps 2-8)",
  "11. R Gen cycle OFF/ON; bus tie light OUT",
  "12. Disconnect ext air & power",
  "13. Check hydraulic pressure (L & R)",
  "14. Interior check complete; request taxi",
}, "\n")

-- ---- NAV / INS ALIGNMENT ----
local NAV_INS_SETUP = table.concat({
  heading("NAV / INS ALIGNMENT SETUP"),
  " 1. [WSO] INS Mode Knob ......... OFF→STBY→ALIGN",
  "    SOLO: Jester Wheel > Nav",
  " 2. [WSO] Nav Computer Ctrl ..... STBY",
  " 3. [WSO] Position Update ........ NORMAL",
  " 4. [WSO] Mag Variation .......... SET local",
  " 5. [WSO] Position Counters ...... SET Lat/Long",
  " 6. [WSO] Wind Knobs ............. SET if known",
  " 7. [WSO] TACAN Channel .......... SET per brief",
  "    SOLO: Jester Wheel > Nav > TACAN",
  " 8. [WSO] TACAN Mode ............. T/R or A/A",
  " 9. [PLT] HSI Mode ............... NAV COMP/TACAN",
  "10. [PLT] BDHI Pointers .......... SET",
  "11. [PLT] Heading Reference ...... SYNC compass",
  "12. [WSO] Destination Coords ..... SET per brief",
}, "\n")

local NAV_INS_PROCEDURE = table.concat({
  heading("NAV / INS ALIGNMENT PROCEDURE"),
  " 1. Aircraft must be STATIONARY",
  "    Wings extended (not folded)",
  " 2. INS: OFF → STBY (pause) → ALIGN",
  "    SOLO: Jester Wheel > Nav > INS",
  " 3. HEAT light ON; wait ~110 sec",
  " 4. ALIGN light STEADY = BATH complete",
  "    (5.5 NM/hr CEP, ~75 sec)",
  " 5. Continue waiting for gyrocompass",
  "    (~5 min total for best accuracy)",
  " 6. ALIGN light FLASHING = full align",
  "    (3.0 NM/hr CEP)",
  " 7. Enter destination coordinates",
  "    SOLO: Jester Wheel > Nav > Waypoints",
  " 8. Set TACAN; verify BRG/RNG on HSI",
  " 9. INS: ALIGN → NAV",
  "10. Verify heading/position on HSI/BDHI",
}, "\n")

local NAV_INS_SETTINGS = table.concat({
  heading("INS / TACAN SETTINGS"),
  "ALIGNMENT TIME:",
  "  BATH ........... ~75 sec (5.5 NM/hr)",
  "  Stored HDG ..... ~2 min  (3.0 NM/hr)",
  "  Gyrocompass .... ~5 min  (3.0 NM/hr)",
  "",
  "TACAN:",
  "  Channels 1-126, X or Y band",
  "  T/R for bearing + range",
  "  A/A: offset ±63 channels, same band",
  "",
  "WARNING: Do not move A/C during alignment",
  "WARNING: Do not ALIGN while HEAT light on",
}, "\n")

-- ---- LANDING & APPROACH ----
local LANDING_SETUP = table.concat({
  heading("LANDING & APPROACH SETUP"),
  "1. [PLT]  Master Arm ............. SAFE",
  "2. [PLT]  Ext Stores ............. JETTISON if reqd",
  "3. [PLT]  UHF Radio .............. SET tower freq",
  "4. [WSO]  TACAN / ILS ............ SET for approach",
  "   SOLO: Jester Wheel > Nav",
  "5. [PLT]  Anti-Skid .............. ON",
  "6. [PLT]  Slats/Flaps ............ NORM (for now)",
  "7. [PLT]  Speed Brake ............ As required",
  "8. [PLT]  Cabin Press ............ CHECK",
}, "\n")

local LANDING_PROCEDURE = table.concat({
  heading("LANDING & APPROACH PROCEDURE"),
  " 1. Before-landing checks above 10,000 ft",
  " 2. Raise seat for forward visibility",
  " 3. Enter pattern at 300-350 KIAS",
  " 4. Overhead break at ~1,500 ft AGL",
  " 5. Decelerate on downwind",
  " 6. Gear DOWN; Slats/Flaps OUT & DOWN",
  " 7. Verify: slats out, flaps down (<210 KTS)",
  " 8. CHECK: Gear/Flaps/HYD/Lights/Anti-Skid",
  " 9. Base turn: establish 19.2 AoA (on-speed)",
  "10. Final: 2.5-3° glideslope (~700 fpm)",
  "11. Pitch = AoA; Power = glideslope",
  "12. Cross-check airspeed vs AoA",
  "13. 20-30 ft: ground effect nose-down",
  "14. Touchdown: slight slow; drag chute",
  "15. Aerobrake, nosewheel steering, brakes",
  "",
  "ON-SPEED: 19.2 AoA / ~145 KIAS",
  "GUSTY/XWIND: 17 AoA (faster approach)",
}, "\n")

local LANDING_SETTINGS = table.concat({
  heading("APPROACH SETTINGS"),
  "APPROACH AOA: 19.2 units (on-speed)",
  "  Steady medium pitch tone",
  "  17 units for gusty/crosswind/aft CG",
  "",
  "APPROACH SPEED: ~145 KIAS (config dep)",
  "  Cross-check with AoA reading",
  "  Flaps won't extend above 210 KIAS",
  "",
  "GLIDESLOPE: 2.5° - 3.0°",
  "  ~700 fpm descent rate",
  "  Ground effect reduces sink at 20-30 ft",
}, "\n")

-- ============================================================
-- MENU STRUCTURE
-- ============================================================

local function createModeMenu(name, setupAction, procedureAction, settingsAction)
  local items = {
    Wheel.Item:new({
      name = "Setup Checklist",
      action = setupAction,
      reaction = Wheel.Reaction.CLOSE_REMEMBER,
    }),
    Wheel.Item:new({
      name = "Procedure",
      action = procedureAction,
      reaction = Wheel.Reaction.CLOSE_REMEMBER,
    }),
  }
  if settingsAction then
    items[#items + 1] = Wheel.Item:new({
      name = "System Settings",
      action = settingsAction,
      reaction = Wheel.Reaction.CLOSE_REMEMBER,
    })
  end
  return Wheel.Menu:new({ name = name, items = items })
end

-- Build sub-menus for each mode
local coldStartMenu = createModeMenu("Cold Start",       "gen_cold_setup",  "gen_cold_proc",    nil)
local navInsMenu    = createModeMenu("Nav / INS Align",   "gen_nav_setup",   "gen_nav_proc",     "gen_nav_settings")
local landingMenu   = createModeMenu("Landing & Approach","gen_land_setup",  "gen_land_proc",    "gen_land_settings")

-- Main General Procedures menu
local genMenu = Wheel.Menu:new({
  name = "General Procedures",
  items = {
    Wheel.Item:new({ name = "Cold Start",         action = "gen_nav_cold",  menu = coldStartMenu }),
    Wheel.Item:new({ name = "Nav / INS Align",    action = "gen_nav_ins",   menu = navInsMenu }),
    Wheel.Item:new({ name = "Landing & Approach",  action = "gen_nav_land",  menu = landingMenu }),
  }
})

-- Add to main Jester Wheel
Wheel.AddItem(
  Wheel.Item:new({
    name = "General Procedures",
    action = "gen_procedures_root",
    menu = genMenu,
  }),
  {}
)

-- ============================================================
-- EVENT HANDLERS
-- ============================================================

local function registerHandlers(prefix, setupText, procText, settingsText, menuPath)
  ListenTo(prefix .. "_setup", "gen_procedures", function(task)
    task:Roger()
    Wheel.SetMenuInfo(setupText, menuPath)
    Log("[GEN] " .. prefix .. " setup displayed")
  end)

  ListenTo(prefix .. "_proc", "gen_procedures", function(task)
    task:Roger()
    Wheel.SetMenuInfo(procText, menuPath)
    Log("[GEN] " .. prefix .. " procedure displayed")
  end)

  if settingsText then
    ListenTo(prefix .. "_settings", "gen_procedures", function(task)
      task:Roger()
      Wheel.SetMenuInfo(settingsText, menuPath)
      Log("[GEN] " .. prefix .. " settings displayed")
    end)
  end
end

-- Register all mode handlers
registerHandlers("gen_cold", COLD_START_SETUP, COLD_START_PROCEDURE, nil,
  {"General Procedures", "Cold Start"})
registerHandlers("gen_nav",  NAV_INS_SETUP,    NAV_INS_PROCEDURE,    NAV_INS_SETTINGS,
  {"General Procedures", "Nav / INS Align"})
registerHandlers("gen_land", LANDING_SETUP,     LANDING_PROCEDURE,    LANDING_SETTINGS,
  {"General Procedures", "Landing & Approach"})

Log("[General Procedures] v2.0 - 3 mode menus loaded")
