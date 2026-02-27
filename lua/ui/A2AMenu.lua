--[[
  F-4E Jester A2A Procedures - Wheel Menu Definitions
  Adds "A2A Procedures" menu tree to the Jester Wheel
  with sub-items for all 5 air-to-air modes.
]]

-- ============================================================
-- PROCEDURE TEXT DEFINITIONS
-- ============================================================

local function heading(title)
  return title .. "\n" .. string.rep("=", #title)
end

-- ---- AIM-7 SPARROW ----
local AIM7_SETUP = table.concat({
  heading("AIM-7 SPARROW SETUP"),
  "1. [PLT] Sight Mode ............. A/A",
  "2. [PLT] Weapon Select .......... RADAR",
  "3. [WSO] Radar Mode ............. RDR",
  "   SOLO: Jester Radar menu",
  "4. [WSO] Radar Range ............ 25/50 NM",
  "5. [WSO] Radar Power ............ OPR",
  "6. [WSO] Antenna Elevation ...... Adjust",
  "7. [WSO] Pulse Switch ........... As reqd",
  "8. [WSO] Missile Condition ...... Verify",
  "   SOLO: Jester Weapons menu",
  "9. [PLT] Master Arm ............. ARM",
}, "\n")

local AIM7_ATTACK = table.concat({
  heading("AIM-7 SPARROW ATTACK"),
  " 1. WSO search in RDR mode",
  "    SOLO: Jester searches automatically",
  " 2. WSO detect; call bearing/range/alt",
  "    SOLO: Jester calls out contacts",
  " 3. WSO half-action: angle track",
  "    SOLO: Jester Radar > Lock Target",
  " 4. WSO full-action: range track (lock)",
  "    SOLO: Jester completes lock auto",
  " 5. Verify IFF if ROE requires",
  "    SOLO: Jester IFF > Interrogate",
  " 6. ASE circle appears on ADI",
  " 7. Center steering dot in ASE circle",
  " 8. IN RANGE lamp; verify shoot cues",
  " 9. Pull & HOLD trigger (CW illum)",
  "10. Maintain lock until impact",
  "11. Assess; break or re-engage",
}, "\n")

local AIM7_SETTINGS = table.concat({
  heading("AIM-7 RADAR SETTINGS"),
  "RADAR MODE: RDR (Search w/ Nutation)",
  "  Primary mode for BVR engagement",
  "",
  "RADAR RANGE: 5/10/25/50/100/200 NM",
  "  25 NM typical for initial search",
  "",
  "ANTENNA ELEV: -60 to +60 degrees",
  "  Adjust for target altitude",
}, "\n")

-- ---- AIM-9 SIDEWINDER ----
local AIM9_SETUP = table.concat({
  heading("AIM-9 SIDEWINDER SETUP"),
  "1. [PLT] Sight Mode ............. A/A",
  "2. [PLT] Weapon Select .......... HEAT",
  "3. [PLT] SW Cool ................ ON (3+ min)",
  "4. [WSO] Radar Mode ............. BST or RDR",
  "   SOLO: Jester Radar menu (optional)",
  "5. [WSO] Radar Power ............ OPR",
  "6. [PLT] Master Arm ............. ARM",
}, "\n")

local AIM9_ATTACK = table.concat({
  heading("AIM-9 SIDEWINDER ATTACK"),
  " 1. Maneuver to rear hemisphere",
  " 2. Verify seeker cooled (3+ min)",
  " 3. If radar locked: seeker auto-slaves",
  " 4. If no lock: boresight, pipper on tgt",
  " 5. Uncage seeker (half-action/uncage)",
  " 6. Listen for strong growl tone",
  " 7. Verify target in envelope",
  " 8. Full trigger to launch",
  " 9. Fire-and-forget after launch",
  "10. Assess; maneuver for follow-up",
}, "\n")

-- ---- M61 GUN (A/A) ----
local GUN_SETUP = table.concat({
  heading("M61 VULCAN GUN (A/A) SETUP"),
  "1. [PLT] Sight Mode ............. A/A",
  "2. [PLT] Weapon Select .......... GUN",
  "3. [WSO] Radar Mode ............. BST",
  "   SOLO: Jester Radar > BST mode",
  "4. [WSO] Radar Power ............ OPR",
  "5. [PLT] Gun Rate ............... HIGH (6000)",
  "6. [PLT] Master Arm ............. ARM",
}, "\n")

local GUN_ATTACK = table.concat({
  heading("M61 GUN (A/A) ATTACK"),
  "1. Close to gun range (1500-3000 ft)",
  "2. WSO achieve BST lock for LCOS",
  "   SOLO: Jester Radar > BST Lock",
  "   (or use fixed reticle without lock)",
  "3. LCOS pipper shows computed lead",
  "4. Place LCOS pipper on target",
  "5. Stabilize tracking solution",
  "6. Short bursts (1-2 sec)",
  "7. Observe impacts; adjust aim",
  "8. Break off to avoid collision/debris",
}, "\n")

-- ---- CAGE/CAA ----
local ACM_SETUP = table.concat({
  heading("CAGE / CAA SETUP"),
  "1. [PLT] Sight Mode ............. A/A",
  "2. [PLT] Weapon Select .......... RADAR/HEAT/GUN",
  "3. [WSO] Radar Power ............ OPR",
  "   SOLO: Jester Radar menu",
  "4. [WSO] Radar Mode ............. CAGE or CAA",
  "5. [PLT] Master Arm ............. ARM",
}, "\n")

local ACM_ATTACK = table.concat({
  heading("CAGE / CAA ATTACK"),
  "CAGE MODE:",
  "  1. WSO select CAGE mode",
  "     SOLO: Jester Radar > CAGE",
  "  2. Pilot points nose at target",
  "  3. Radar auto-locks in 7.5-deg cone",
  "",
  "CAA MODE:",
  "  1. WSO select CAA mode",
  "     SOLO: Jester Radar > CAA",
  "  2. Radar scans vertical bar pattern",
  "  3. Auto-locks first target detected",
  "",
  "Both: Lock → STT → Employ weapon",
}, "\n")

local ACM_SETTINGS = table.concat({
  heading("CAGE / CAA SETTINGS"),
  "CAGE: 7.5-deg fixed boresight cone",
  "  Point nose at target; auto-lock",
  "",
  "CAA: Vertical scan +/- 30 degrees",
  "  Auto-locks first target found",
  "",
  "WARNING: CAA locks indiscriminately!",
  "IFF is critical in ACM",
}, "\n")

-- ---- RADAR INTERCEPT ----
local INTCP_SETUP = table.concat({
  heading("RADAR INTERCEPT SETUP"),
  " 1. [WSO] Radar Power ............ OPR",
  "         SOLO: Jester Radar menu",
  " 2. [WSO] Radar Mode ............. RDR",
  " 3. [WSO] Radar Range ............ 50/100 NM",
  " 4. [WSO] Antenna Elevation ...... Adjust",
  " 5. [WSO] Scan Switch ............ WIDE/NARROW",
  " 6. [WSO] Pulse Switch ........... NORM/SHORT",
  " 7. [PLT] Sight Mode ............. A/A",
  " 8. [PLT] Weapon Select .......... RADAR",
  " 9. [WSO] IFF Mode/Code .......... SET per brief",
  "         SOLO: Jester IFF menu",
  "10. [PLT] Master Arm ............. ARM (cleared)",
}, "\n")

local INTCP_ATTACK = table.concat({
  heading("RADAR INTERCEPT PROCEDURE"),
  " 1. Receive GCI/AWACS vectors (BRAA)",
  " 2. Turn to intercept heading/altitude",
  " 3. WSO search with radar in RDR mode",
  "    SOLO: Jester searches automatically",
  " 4. WSO detect contact; call JUDY",
  "    SOLO: Jester calls out contacts",
  " 5. WSO half-action: angle track",
  "    SOLO: Jester Radar > Lock Target",
  " 6. WSO full-action: STT lock",
  "    SOLO: Jester completes lock auto",
  " 7. IFF interrogation (mandatory)",
  "    SOLO: Jester IFF > Interrogate",
  " 8. COMMIT / ABORT decision",
  " 9. Employ AIM-7 at max range",
  "10. Transition AIM-9/GUN as range closes",
  "11. Assess: SPLASH or re-engage",
  "12. Egress or next engagement",
}, "\n")

local INTCP_SETTINGS = table.concat({
  heading("INTERCEPT RADAR SETTINGS"),
  "SCAN: WIDE (120 deg) / NARROW (60 deg)",
  "  WIDE for initial search",
  "  NARROW for known bearing",
  "",
  "PULSE: NORM (max range) / SHORT (close)",
  "  NORM for BVR detection",
  "",
  "ANTENNA ELEV: -60 to +60 degrees",
  "  Sweep if not found at called alt",
}, "\n")

-- ============================================================
-- MENU STRUCTURE
-- ============================================================

local function createModeMenu(name, setupAction, attackAction, settingsAction)
  local items = {
    Wheel.Item:new({
      name = "Setup Checklist",
      action = setupAction,
      reaction = Wheel.Reaction.CLOSE_REMEMBER,
    }),
    Wheel.Item:new({
      name = "Attack Procedure",
      action = attackAction,
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
local aim7Menu    = createModeMenu("AIM-7 Sparrow",  "a2a_aim7_setup",  "a2a_aim7_attack",  "a2a_aim7_settings")
local aim9Menu    = createModeMenu("AIM-9 Sidewinder","a2a_aim9_setup",  "a2a_aim9_attack",  nil)
local gunMenu     = createModeMenu("M61 Vulcan Gun",  "a2a_gun_setup",   "a2a_gun_attack",   nil)
local acmMenu     = createModeMenu("CAGE / CAA",      "a2a_acm_setup",   "a2a_acm_attack",   "a2a_acm_settings")
local intcpMenu   = createModeMenu("Radar Intercept", "a2a_intcp_setup", "a2a_intcp_attack", "a2a_intcp_settings")

-- Missile sub-menu
local missileMenu = Wheel.Menu:new({
  name = "Missile",
  items = {
    Wheel.Item:new({ name = "AIM-7 Sparrow (SARH)",   action = "a2a_nav_aim7",  menu = aim7Menu }),
    Wheel.Item:new({ name = "AIM-9 Sidewinder (IR)",   action = "a2a_nav_aim9",  menu = aim9Menu }),
  }
})

-- Gun sub-menu
local gunSubMenu = Wheel.Menu:new({
  name = "Gun",
  items = {
    Wheel.Item:new({ name = "M61 Vulcan (A/A)", action = "a2a_nav_gun", menu = gunMenu }),
  }
})

-- ACM sub-menu
local acmSubMenu = Wheel.Menu:new({
  name = "ACM",
  items = {
    Wheel.Item:new({ name = "CAGE / CAA",        action = "a2a_nav_acm",   menu = acmMenu }),
    Wheel.Item:new({ name = "Radar Intercept",    action = "a2a_nav_intcp", menu = intcpMenu }),
  }
})

-- Main A2A Procedures menu
local a2aMenu = Wheel.Menu:new({
  name = "A2A Procedures",
  items = {
    Wheel.Item:new({ name = "Missile",  action = "a2a_nav_msl",  menu = missileMenu }),
    Wheel.Item:new({ name = "Gun",      action = "a2a_nav_gun_cat", menu = gunSubMenu }),
    Wheel.Item:new({ name = "ACM",      action = "a2a_nav_acm_cat", menu = acmSubMenu }),
  }
})

-- Add to main Jester Wheel
Wheel.AddItem(
  Wheel.Item:new({
    name = "A2A Procedures",
    action = "a2a_procedures_root",
    menu = a2aMenu,
  }),
  {}
)

-- ============================================================
-- EVENT HANDLERS
-- ============================================================

local function registerHandlers(prefix, setupText, attackText, settingsText, menuPath)
  ListenTo(prefix .. "_setup", "a2a_procedures", function(task)
    task:Roger()
    Wheel.SetMenuInfo(setupText, menuPath)
    Log("[A2A] " .. prefix .. " setup displayed")
  end)

  ListenTo(prefix .. "_attack", "a2a_procedures", function(task)
    task:Roger()
    Wheel.SetMenuInfo(attackText, menuPath)
    Log("[A2A] " .. prefix .. " attack displayed")
  end)

  if settingsText then
    ListenTo(prefix .. "_settings", "a2a_procedures", function(task)
      task:Roger()
      Wheel.SetMenuInfo(settingsText, menuPath)
      Log("[A2A] " .. prefix .. " settings displayed")
    end)
  end
end

-- Register all mode handlers
-- Missile
registerHandlers("a2a_aim7",  AIM7_SETUP,  AIM7_ATTACK,  AIM7_SETTINGS,  {"A2A Procedures", "Missile", "AIM-7 Sparrow (SARH)"})
registerHandlers("a2a_aim9",  AIM9_SETUP,  AIM9_ATTACK,  nil,            {"A2A Procedures", "Missile", "AIM-9 Sidewinder (IR)"})
-- Gun
registerHandlers("a2a_gun",   GUN_SETUP,   GUN_ATTACK,   nil,            {"A2A Procedures", "Gun", "M61 Vulcan (A/A)"})
-- ACM
registerHandlers("a2a_acm",   ACM_SETUP,   ACM_ATTACK,   ACM_SETTINGS,   {"A2A Procedures", "ACM", "CAGE / CAA"})
registerHandlers("a2a_intcp", INTCP_SETUP, INTCP_ATTACK, INTCP_SETTINGS, {"A2A Procedures", "ACM", "Radar Intercept"})

Log("[A2A Procedures] v2.0 - 5 mode menus loaded")
